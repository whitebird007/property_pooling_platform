import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import * as authModule from "./_core/auth";
import * as db from "./db";

describe("JWT Authentication", () => {
  const testUser = {
    email: "test@example.com",
    password: "TestPassword123!",
    name: "Test User",
  };

  beforeAll(async () => {
    // Clean up any existing test user
    const existing = await authModule.findUserByEmail(testUser.email);
    if (existing) {
      console.log("Test user already exists, skipping creation");
    }
  });

  describe("Password Utilities", () => {
    it("should hash a password", async () => {
      const hash = await authModule.hashPassword(testUser.password);
      expect(hash).toBeDefined();
      expect(hash).not.toBe(testUser.password);
      expect(hash.length).toBeGreaterThan(20);
    });

    it("should verify a correct password", async () => {
      const hash = await authModule.hashPassword(testUser.password);
      const isValid = await authModule.verifyPassword(testUser.password, hash);
      expect(isValid).toBe(true);
    });

    it("should reject an incorrect password", async () => {
      const hash = await authModule.hashPassword(testUser.password);
      const isValid = await authModule.verifyPassword("WrongPassword123!", hash);
      expect(isValid).toBe(false);
    });
  });

  describe("JWT Token Generation", () => {
    it("should generate a valid JWT token", () => {
      const token = authModule.generateToken({
        userId: 1,
        email: testUser.email,
        role: "user",
      });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // JWT has 3 parts
    });

    it("should verify a valid token", () => {
      const payload = {
        userId: 1,
        email: testUser.email,
        role: "user",
      };

      const token = authModule.generateToken(payload);
      const decoded = authModule.verifyToken(token);

      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(payload.userId);
      expect(decoded?.email).toBe(payload.email);
      expect(decoded?.role).toBe(payload.role);
    });

    it("should reject an invalid token", () => {
      const decoded = authModule.verifyToken("invalid.token.here");
      expect(decoded).toBeNull();
    });

    it("should decode a token without verification", () => {
      const payload = {
        userId: 1,
        email: testUser.email,
        role: "user",
      };

      const token = authModule.generateToken(payload);
      const decoded = authModule.decodeToken(token);

      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(payload.userId);
    });
  });

  describe("Password Validation", () => {
    it("should accept a strong password", () => {
      const result = authModule.isValidPassword("StrongPass123");
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it("should reject a password that is too short", () => {
      const result = authModule.isValidPassword("Short1!");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Password must be at least 8 characters long");
    });

    it("should reject a password without uppercase", () => {
      const result = authModule.isValidPassword("lowercase123");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Password must contain at least one uppercase letter");
    });

    it("should reject a password without lowercase", () => {
      const result = authModule.isValidPassword("UPPERCASE123");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Password must contain at least one lowercase letter");
    });

    it("should reject a password without numbers", () => {
      const result = authModule.isValidPassword("NoNumbers!");
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Password must contain at least one number");
    });
  });

  describe("Email Validation", () => {
    it("should accept a valid email", () => {
      expect(authModule.isValidEmail("test@example.com")).toBe(true);
      expect(authModule.isValidEmail("user.name+tag@example.co.uk")).toBe(true);
    });

    it("should reject an invalid email", () => {
      expect(authModule.isValidEmail("invalid")).toBe(false);
      expect(authModule.isValidEmail("invalid@")).toBe(false);
      expect(authModule.isValidEmail("@example.com")).toBe(false);
    });
  });

  describe("Random Token Generation", () => {
    it("should generate a random token", () => {
      const token1 = authModule.generateRandomToken();
      const token2 = authModule.generateRandomToken();

      expect(token1).toBeDefined();
      expect(token2).toBeDefined();
      expect(token1).not.toBe(token2);
      expect(token1.length).toBeGreaterThan(20);
    });
  });

  describe("Cookie Management", () => {
    it("should set auth cookie with correct options", () => {
      const mockRes = {
        cookie: vi.fn(),
      };

      authModule.setAuthCookie(mockRes as any, "test-token");

      expect(mockRes.cookie).toHaveBeenCalledWith(
        "auth_token",
        "test-token",
        expect.objectContaining({
          httpOnly: true,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/",
        })
      );
    });

    it("should clear auth cookie", () => {
      const mockRes = {
        clearCookie: vi.fn(),
      };

      authModule.clearAuthCookie(mockRes as any);

      expect(mockRes.clearCookie).toHaveBeenCalledWith(
        "auth_token",
        expect.objectContaining({
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        })
      );
    });
  });

  describe("Token Extraction from Request", () => {
    it("should extract token from cookie", () => {
      const mockReq = {
        cookies: { auth_token: "cookie-token" },
        headers: {},
      };

      const token = authModule.getTokenFromRequest(mockReq);
      expect(token).toBe("cookie-token");
    });

    it("should extract token from Authorization header", () => {
      const mockReq = {
        cookies: {},
        headers: { authorization: "Bearer header-token" },
      };

      const token = authModule.getTokenFromRequest(mockReq);
      expect(token).toBe("header-token");
    });

    it("should prefer cookie over Authorization header", () => {
      const mockReq = {
        cookies: { auth_token: "cookie-token" },
        headers: { authorization: "Bearer header-token" },
      };

      const token = authModule.getTokenFromRequest(mockReq);
      expect(token).toBe("cookie-token");
    });

    it("should return null if no token found", () => {
      const mockReq = {
        cookies: {},
        headers: {},
      };

      const token = authModule.getTokenFromRequest(mockReq);
      expect(token).toBeNull();
    });
  });
});
