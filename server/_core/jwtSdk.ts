import type { Request } from "express";
import { ForbiddenError } from "@shared/_core/errors";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import * as authModule from "./auth";
import { COOKIE_NAME } from "@shared/const";
import { parse as parseCookieHeader } from "cookie";

/**
 * JWT-based SDK for authentication without Manus OAuth
 * Replaces the Manus OAuth SDK for Replit deployment
 */
class JWTAuthService {
  private parseCookies(cookieHeader: string | undefined) {
    if (!cookieHeader) {
      return new Map<string, string>();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  /**
   * Authenticate a request using JWT token from cookie or Authorization header
   */
  async authenticateRequest(req: Request): Promise<User> {
    // Get token from cookie or Authorization header
    const token = authModule.getTokenFromRequest(req);

    if (!token) {
      throw ForbiddenError("No authentication token provided");
    }

    // Verify the JWT token
    const payload = authModule.verifyToken(token);
    if (!payload) {
      throw ForbiddenError("Invalid or expired token");
    }

    // Find user in database by ID
    const dbInstance = await db.getDb();
    if (!dbInstance) throw ForbiddenError("Database connection failed");
    
    const { eq } = await import("drizzle-orm");
    const { users } = await import("../../drizzle/schema");
    const result = await dbInstance.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    const user = result[0];
    if (!user) {
      throw ForbiddenError("User not found");
    }

    return user;
  }

  /**
   * Get current user from request (returns null if not authenticated)
   */
  async getCurrentUser(req: Request): Promise<User | null> {
    try {
      return await this.authenticateRequest(req);
    } catch {
      return null;
    }
  }
}

export const jwtSdk = new JWTAuthService();
