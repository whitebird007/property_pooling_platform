# PropertyPool Migration Guide: Manus OAuth to Custom JWT Authentication

**Author:** Manus AI  
**Version:** 1.0  
**Date:** December 31, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Architecture Changes](#architecture-changes)
4. [Step-by-Step Migration](#step-by-step-migration)
5. [Database Schema Updates](#database-schema-updates)
6. [Server-Side Changes](#server-side-changes)
7. [Client-Side Changes](#client-side-changes)
8. [Environment Variables](#environment-variables)
9. [Testing the Migration](#testing-the-migration)
10. [Deployment on Replit](#deployment-on-replit)
11. [Security Considerations](#security-considerations)
12. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides detailed instructions for migrating the PropertyPool platform from Manus OAuth authentication to a custom JWT (JSON Web Token) authentication system. This migration is necessary for deploying the application on external platforms like Replit, Vercel, or any self-hosted environment where Manus OAuth is not available.

### Current Authentication Flow (Manus OAuth)

The existing system uses Manus OAuth which handles:
- User registration and login via OAuth providers (Google, Microsoft, Apple)
- Session management via cookies
- User profile management through external API

### Target Authentication Flow (Custom JWT)

The new system will implement:
- Email/password registration and login
- JWT token-based session management
- Password hashing with bcrypt
- Optional: Social login via Passport.js

---

## Prerequisites

Before starting the migration, ensure you have:

| Requirement | Description |
|-------------|-------------|
| Node.js 18+ | Runtime environment |
| MySQL Database | PlanetScale, TiDB Cloud, or self-hosted MySQL |
| SMTP Server | For sending verification emails (optional) |
| SSL Certificate | For production HTTPS |

### Required npm Packages

```bash
pnpm add bcryptjs jsonwebtoken nodemailer
pnpm add -D @types/bcryptjs @types/jsonwebtoken @types/nodemailer
```

---

## Architecture Changes

### Files to Modify

| File | Change Type | Description |
|------|-------------|-------------|
| `drizzle/schema.ts` | Modify | Add password field to users table |
| `server/_core/auth.ts` | Create | New authentication utilities |
| `server/_core/context.ts` | Modify | Update session verification |
| `server/routers.ts` | Modify | Add auth procedures (register, login, logout) |
| `client/src/pages/Login.tsx` | Create | New login page |
| `client/src/pages/Register.tsx` | Create | New registration page |
| `client/src/contexts/AuthContext.tsx` | Modify | Update auth state management |

### Files to Remove/Disable

| File | Action |
|------|--------|
| `server/_core/oauth.ts` | Remove or disable |
| OAuth callback routes | Remove |

---

## Step-by-Step Migration

### Step 1: Update Database Schema

Modify `drizzle/schema.ts` to add password authentication fields:

```typescript
// Add to the users table definition
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  openId: varchar("open_id", { length: 255 }).unique(), // Keep for backward compatibility
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }), // NEW: Hashed password
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  loginMethod: mysqlEnum("login_method", ["email", "google", "microsoft", "apple"])
    .default("email")
    .notNull(),
  role: mysqlEnum("role", ["admin", "user"]).default("user").notNull(),
  emailVerified: boolean("email_verified").default(false), // NEW: Email verification
  verificationToken: varchar("verification_token", { length: 255 }), // NEW
  resetPasswordToken: varchar("reset_password_token", { length: 255 }), // NEW
  resetPasswordExpires: timestamp("reset_password_expires"), // NEW
  language: varchar("language", { length: 10 }).default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("last_signed_in"),
});
```

Run the migration:

```bash
pnpm db:push
```

### Step 2: Create Authentication Utilities

Create a new file `server/_core/auth.ts`:

```typescript
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-min-32-chars";
const JWT_EXPIRES_IN = "7d";

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// JWT Token management
export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// User lookup
export async function findUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function findUserById(id: number) {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
}

// Create user
export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const hashedPassword = await hashPassword(data.password);
  const openId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const result = await db.insert(users).values({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    openId,
    loginMethod: "email",
    role: "user",
  });
  
  return result;
}

// Cookie helpers
export function setAuthCookie(res: any, token: string) {
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function clearAuthCookie(res: any) {
  res.clearCookie("auth_token");
}
```

### Step 3: Update Context for JWT Verification

Modify `server/_core/context.ts`:

```typescript
import { verifyToken, findUserById } from "./auth";

export async function createContext({ req, res }: { req: Request; res: Response }) {
  let user = null;
  
  // Get token from cookie or Authorization header
  const token = req.cookies?.auth_token || 
    req.headers.authorization?.replace("Bearer ", "");
  
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      user = await findUserById(payload.userId);
    }
  }
  
  return { req, res, user };
}
```

### Step 4: Add Authentication Routes

Add to `server/routers.ts`:

```typescript
import { z } from "zod";
import {
  hashPassword,
  verifyPassword,
  generateToken,
  findUserByEmail,
  createUser,
  setAuthCookie,
  clearAuthCookie,
} from "./_core/auth";

// Add these procedures to your auth router
auth: router({
  // Register new user
  register: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(8, "Password must be at least 8 characters"),
      name: z.string().min(2, "Name must be at least 2 characters"),
    }))
    .mutation(async ({ input, ctx }) => {
      // Check if user exists
      const existingUser = await findUserByEmail(input.email);
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already registered",
        });
      }
      
      // Create user
      await createUser(input);
      
      // Get the created user
      const user = await findUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }
      
      // Generate token and set cookie
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      
      setAuthCookie(ctx.res, token);
      
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }),

  // Login
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await findUserByEmail(input.email);
      
      if (!user || !user.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }
      
      const isValid = await verifyPassword(input.password, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }
      
      // Update last signed in
      await db.update(users)
        .set({ lastSignedIn: new Date() })
        .where(eq(users.id, user.id));
      
      // Generate token and set cookie
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      
      setAuthCookie(ctx.res, token);
      
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }),

  // Logout
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    clearAuthCookie(ctx.res);
    return { success: true };
  }),

  // Get current user
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user || null;
  }),

  // Forgot password
  forgotPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const user = await findUserByEmail(input.email);
      if (!user) {
        // Don't reveal if email exists
        return { success: true, message: "If email exists, reset link sent" };
      }
      
      // Generate reset token
      const resetToken = crypto.randomUUID();
      const expires = new Date(Date.now() + 3600000); // 1 hour
      
      await db.update(users)
        .set({
          resetPasswordToken: resetToken,
          resetPasswordExpires: expires,
        })
        .where(eq(users.id, user.id));
      
      // TODO: Send email with reset link
      // await sendResetEmail(user.email, resetToken);
      
      return { success: true, message: "If email exists, reset link sent" };
    }),

  // Reset password
  resetPassword: publicProcedure
    .input(z.object({
      token: z.string(),
      password: z.string().min(8),
    }))
    .mutation(async ({ input }) => {
      const user = await db.select()
        .from(users)
        .where(eq(users.resetPasswordToken, input.token))
        .limit(1);
      
      if (!user[0] || !user[0].resetPasswordExpires || 
          user[0].resetPasswordExpires < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid or expired reset token",
        });
      }
      
      const hashedPassword = await hashPassword(input.password);
      
      await db.update(users)
        .set({
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        })
        .where(eq(users.id, user[0].id));
      
      return { success: true };
    }),
}),
```

### Step 5: Create Login Page

Create `client/src/pages/Login.tsx`:

```tsx
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      setLocation("/dashboard");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your PropertyPool account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Step 6: Create Registration Page

Create `client/src/pages/Register.tsx`:

```tsx
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      setLocation("/dashboard");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    registerMutation.mutate({ name, email, password });
  };

  const passwordRequirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(password), text: "One uppercase letter" },
    { met: /[a-z]/.test(password), text: "One lowercase letter" },
    { met: /[0-9]/.test(password), text: "One number" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Start your property investment journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {passwordRequirements.map((req, i) => (
                  <div key={i} className={`flex items-center gap-1 text-xs ${req.met ? "text-green-600" : "text-gray-400"}`}>
                    <Check className={`w-3 h-3 ${req.met ? "opacity-100" : "opacity-30"}`} />
                    {req.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="rounded mt-1"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <span className="text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Step 7: Update App.tsx Routes

Add the new routes to `client/src/App.tsx`:

```tsx
import Login from "./pages/Login";
import Register from "./pages/Register";

// Add these routes
<Route path="/login" component={Login} />
<Route path="/register" component={Register} />
```

---

## Environment Variables

### Required Variables for Custom JWT Auth

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# JWT Authentication
JWT_SECRET=your-super-secret-key-at-least-32-characters-long

# Application
NODE_ENV=development
VITE_APP_TITLE=PropertyPool
VITE_APP_ID=propertypool

# Optional: Email (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Generating a Secure JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

---

## Deployment on Replit

### Step 1: Create `.replit` Configuration

```toml
run = "pnpm install && pnpm db:push && pnpm dev"
entrypoint = "server/index.ts"

[nix]
channel = "stable-24_05"

[env]
NODE_ENV = "production"

[[ports]]
localPort = 3000
externalPort = 80
```

### Step 2: Create `replit.nix`

```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.nodePackages.pnpm
  ];
}
```

### Step 3: Configure Secrets in Replit

In Replit's Secrets tab, add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your MySQL connection string |
| `JWT_SECRET` | Your generated secret key |
| `NODE_ENV` | `production` |

### Step 4: Database Setup

1. Create a free MySQL database on [PlanetScale](https://planetscale.com) or [TiDB Cloud](https://tidbcloud.com)
2. Copy the connection string
3. Add it to Replit Secrets as `DATABASE_URL`

---

## Testing the Migration

### Manual Testing Checklist

| Test Case | Expected Result |
|-----------|-----------------|
| Register new user | Account created, redirected to dashboard |
| Login with valid credentials | Authenticated, redirected to dashboard |
| Login with invalid credentials | Error message displayed |
| Access protected route without auth | Redirected to login |
| Logout | Session cleared, redirected to home |
| Password reset request | Email sent (if configured) |

### Automated Tests

Create `server/auth.custom.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, generateToken, verifyToken } from "./_core/auth";

describe("Custom JWT Authentication", () => {
  it("should hash and verify passwords correctly", async () => {
    const password = "testPassword123";
    const hash = await hashPassword(password);
    
    expect(hash).not.toBe(password);
    expect(await verifyPassword(password, hash)).toBe(true);
    expect(await verifyPassword("wrongPassword", hash)).toBe(false);
  });

  it("should generate and verify JWT tokens", () => {
    const payload = { userId: 1, email: "test@example.com", role: "user" };
    const token = generateToken(payload);
    
    expect(token).toBeTruthy();
    
    const decoded = verifyToken(token);
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
  });

  it("should reject invalid tokens", () => {
    const result = verifyToken("invalid-token");
    expect(result).toBeNull();
  });
});
```

---

## Security Considerations

### Password Security

| Measure | Implementation |
|---------|----------------|
| Hashing Algorithm | bcrypt with cost factor 12 |
| Minimum Length | 8 characters |
| Complexity | Uppercase, lowercase, number recommended |
| Storage | Never store plain text passwords |

### JWT Security

| Measure | Implementation |
|---------|----------------|
| Secret Key | Minimum 256 bits (32 characters) |
| Expiration | 7 days (configurable) |
| Storage | HttpOnly cookies (not localStorage) |
| Transmission | HTTPS only in production |

### Additional Recommendations

1. **Rate Limiting**: Implement rate limiting on login endpoints to prevent brute force attacks
2. **Account Lockout**: Lock accounts after 5 failed login attempts
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly for your domain
5. **Input Validation**: Validate all user inputs with Zod schemas

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid token" errors | Check JWT_SECRET is consistent across restarts |
| "User not found" after login | Verify database connection and user creation |
| Cookies not being set | Check cookie settings (secure, sameSite) |
| CORS errors | Configure CORS middleware properly |

### Debug Mode

Add this to your server for debugging:

```typescript
if (process.env.DEBUG_AUTH === "true") {
  console.log("Auth Debug:", {
    token: token?.substring(0, 20) + "...",
    user: user?.email,
  });
}
```

---

## Summary

This migration guide covers the complete process of replacing Manus OAuth with custom JWT authentication. The key changes involve:

1. Adding password field to the users table
2. Creating authentication utilities for password hashing and JWT management
3. Adding register, login, and logout tRPC procedures
4. Creating new Login and Register pages
5. Updating the context to verify JWT tokens
6. Configuring environment variables for the new auth system

After completing this migration, your PropertyPool application will be fully self-contained and deployable on any platform including Replit, Vercel, Railway, or self-hosted servers.

---

## References

- [JSON Web Tokens (JWT) Introduction](https://jwt.io/introduction)
- [bcrypt.js Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [tRPC Documentation](https://trpc.io/docs)
- [Replit Deployment Guide](https://docs.replit.com/hosting/deployments)
