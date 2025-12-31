import { publicProcedure, router } from "./_core/trpc";
import { getSessionCookieOptions } from "./_core/cookies";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as authModule from "./_core/auth";

const COOKIE_NAME = "auth_token";

export const authRouter = router({
  me: publicProcedure.query(opts => opts.ctx.user),
  
  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true } as const;
  }),
  
  // JWT Authentication Procedures
  register: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(2),
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, password, name } = input;
      
      // Check if user already exists
      const existingUser = await authModule.findUserByEmail(email);
      if (existingUser) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Email already registered' });
      }
      
      // Validate password strength
      const passwordValidation = authModule.isValidPassword(password);
      if (!passwordValidation.valid) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: passwordValidation.errors.join(', ') });
      }
      
      // Create user
      await authModule.createUser({ email, password, name });
      const user = await authModule.findUserByEmail(email);
      if (!user) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      
      // Generate token
      const token = authModule.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      
      // Set cookie
      authModule.setAuthCookie(ctx.res, token);
      
      return { success: true, user: { id: user.id, email: user.email, name: user.name } };
    }),
  
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      
      // Find user
      const user = await authModule.findUserByEmail(email);
      if (!user || !user.password) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
      }
      
      // Verify password
      const isValid = await authModule.verifyPassword(password, user.password);
      if (!isValid) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
      }
      
      // Update last sign in
      await authModule.updateLastSignIn(user.id);
      
      // Generate token
      const token = authModule.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      
      // Set cookie
      authModule.setAuthCookie(ctx.res, token);
      
      return { success: true, user: { id: user.id, email: user.email, name: user.name } };
    }),
  
  forgotPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const { email } = input;
      
      const user = await authModule.findUserByEmail(email);
      if (!user) {
        // Don't reveal if email exists
        return { success: true, message: 'Check your email for reset link' };
      }
      
      // Generate reset token
      const resetToken = authModule.generateRandomToken();
      const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
      await authModule.setResetToken(user.id, resetToken, expiresAt);
      
      // TODO: Send email with reset link
      console.log(`[Auth] Reset token for ${email}: ${resetToken}`);
      
      return { success: true, message: 'Check your email for reset link' };
    }),
  
  resetPassword: publicProcedure
    .input(z.object({
      token: z.string(),
      newPassword: z.string().min(8),
    }))
    .mutation(async ({ input }) => {
      const { token, newPassword } = input;
      
      const user = await authModule.findUserByResetToken(token);
      if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid or expired reset token' });
      }
      
      // Validate password strength
      const passwordValidation = authModule.isValidPassword(newPassword);
      if (!passwordValidation.valid) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: passwordValidation.errors.join(', ') });
      }
      
      // Update password
      await authModule.updatePassword(user.id, newPassword);
      
      return { success: true, message: 'Password reset successfully' };
    }),
});
