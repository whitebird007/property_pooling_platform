import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import type { Response } from "express";

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || "propertypool-jwt-secret-change-in-production-min-32-chars";
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 12;

// ==================== PASSWORD UTILITIES ====================

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a plain text password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ==================== JWT UTILITIES ====================

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.log("[Auth] Token verification failed:", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

/**
 * Decode a JWT token without verification (for debugging)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}

// ==================== USER LOOKUP ====================

/**
 * Find a user by email address
 */
export async function findUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

/**
 * Find a user by ID
 */
export async function findUserById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
}

/**
 * Find a user by reset password token
 */
export async function findUserByResetToken(token: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(users).where(eq(users.resetPasswordToken, token)).limit(1);
  return result[0] || null;
}

// ==================== USER CREATION ====================

/**
 * Create a new user with email/password authentication
 */
export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const hashedPassword = await hashPassword(data.password);
  
  // Generate a unique openId for backward compatibility
  const openId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  
  const result = await db.insert(users).values({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    openId,
    loginMethod: "email",
    role: "user",
    emailVerified: false,
  });
  
  return result;
}

/**
 * Update user's last sign in time
 */
export async function updateLastSignIn(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users)
    .set({ lastSignedIn: new Date() })
    .where(eq(users.id, userId));
}

/**
 * Update user's password
 */
export async function updatePassword(userId: number, newPassword: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const hashedPassword = await hashPassword(newPassword);
  await db.update(users)
    .set({ 
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    })
    .where(eq(users.id, userId));
}

/**
 * Set password reset token for a user
 */
export async function setResetToken(userId: number, token: string, expiresAt: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(users)
    .set({
      resetPasswordToken: token,
      resetPasswordExpires: expiresAt,
    })
    .where(eq(users.id, userId));
}

/**
 * Clear password reset token
 */
export async function clearResetToken(userId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(users)
    .set({
      resetPasswordToken: null,
      resetPasswordExpires: null,
    })
    .where(eq(users.id, userId));
}

/**
 * Verify user's email
 */
export async function verifyUserEmail(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(users)
    .set({
      emailVerified: true,
      verificationToken: null,
    })
    .where(eq(users.id, userId));
}

// ==================== COOKIE MANAGEMENT ====================

/**
 * Set authentication cookie with JWT token
 */
export function setAuthCookie(res: Response, token: string) {
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: "/",
  });
}

/**
 * Clear authentication cookie
 */
export function clearAuthCookie(res: Response) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Get token from request (cookie or Authorization header)
 */
export function getTokenFromRequest(req: any): string | null {
  // First check cookie
  const cookieToken = req.cookies?.auth_token;
  if (cookieToken) {
    return cookieToken;
  }
  
  // Then check Authorization header
  const authHeader = req.headers?.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  
  return null;
}

// ==================== VALIDATION HELPERS ====================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a random token for password reset or email verification
 */
export function generateRandomToken(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
}
