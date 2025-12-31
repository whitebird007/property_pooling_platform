# PropertyPool Platform - Replit Deployment Guide

This guide explains how to deploy the PropertyPool platform on Replit with custom JWT authentication (replacing Manus OAuth).

## Overview

The PropertyPool platform has been migrated from Manus OAuth to custom JWT authentication, making it fully portable and deployable on any platform including Replit. This guide covers:

1. Setting up the database (PlanetScale MySQL)
2. Configuring environment variables
3. Deploying to Replit
4. Testing the authentication flow

## Prerequisites

- Replit account (https://replit.com)
- PlanetScale account (https://planetscale.com) for MySQL database
- Node.js 18+ (provided by Replit)
- Git (for pushing code)

## Step 1: Set Up PlanetScale Database

### 1.1 Create a PlanetScale Account

1. Go to https://planetscale.com and sign up
2. Create a new organization (or use existing)
3. Click "Create a database"

### 1.2 Create Your Database

1. Name your database: `propertypool`
2. Select region closest to your users
3. Click "Create database"

### 1.3 Get Connection String

1. Click on your database
2. Click "Connect"
3. Select "Node.js" from the dropdown
4. Copy the connection string (looks like: `mysql://user:password@host/database`)
5. Keep this safe - you'll need it for environment variables

### 1.4 Enable SSL (Important for Replit)

1. In PlanetScale dashboard, go to your database settings
2. Scroll to "SSL Certificates"
3. Click "Enable SSL"
4. Download the CA certificate if needed (Replit usually handles this automatically)

## Step 2: Prepare Your Code

The code has already been updated with JWT authentication. Key changes made:

### Backend Changes
- **`server/authRouter.ts`** - JWT auth procedures (register, login, forgot-password, reset-password)
- **`server/_core/auth.ts`** - JWT utilities (token generation, password hashing, validation)
- **`server/_core/jwtSdk.ts`** - JWT-based authentication service
- **`server/_core/context.ts`** - Updated to use JWT SDK instead of Manus OAuth
- **`server/routers.ts`** - Integrated authRouter with all JWT procedures

### Frontend Changes
- **`client/src/pages/Login.tsx`** - Updated to use JWT login via tRPC
- **`client/src/pages/SignUp.tsx`** - Updated to use JWT registration via tRPC
- **`client/src/const.ts`** - Removed Manus OAuth references
- **`shared/const.ts`** - Updated COOKIE_NAME to "auth_token"

### Database Schema
The database schema already includes JWT-ready fields:
- `password` - Hashed password for local authentication
- `loginMethod` - Enum: "email", "google", "microsoft", "apple"
- `emailVerified` - Boolean flag for email verification
- `resetPasswordToken` - For password reset flow
- `resetPasswordExpires` - Expiry time for reset token

## Step 3: Deploy to Replit

### 3.1 Create a Replit Project

1. Go to https://replit.com
2. Click "Create" → "Import from GitHub"
3. Paste your GitHub repository URL
4. Click "Import"
5. Wait for the project to load

### 3.2 Configure Environment Variables

In Replit, click the "Secrets" icon (lock icon) in the left sidebar and add these variables:

```
DATABASE_URL=mysql://user:password@host/database?sslaccept=strict
JWT_SECRET=your-super-secret-key-min-32-characters-long
NODE_ENV=production
```

**Important Notes:**
- Replace the DATABASE_URL with your PlanetScale connection string
- For JWT_SECRET, generate a strong random string (min 32 characters)
- Add `?sslaccept=strict` to your DATABASE_URL for PlanetScale

### 3.3 Create .replit File

Create a `.replit` file in your project root:

```toml
run = "pnpm install && pnpm db:push && pnpm run dev"

[env]
NODE_ENV = "production"

[nix]
channel = "unstable"

[[ports]]
localPort = 3000
expose = true
```

### 3.4 Initialize Database

1. In Replit console, run:
```bash
pnpm install
pnpm db:push
```

This will:
- Install all dependencies
- Create database tables from schema
- Run any pending migrations

### 3.5 Start the Application

1. Click "Run" button in Replit
2. The application will start on port 3000
3. You'll see a URL like: `https://propertypool.replit.dev`

## Step 4: Test Authentication Flow

### 4.1 Test User Registration

1. Go to your Replit URL
2. Click "Get Started" → "Create Account"
3. Fill in:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Password: "TestPassword123!" (must have uppercase, lowercase, number, 8+ chars)
4. Check the terms and privacy checkboxes
5. Click "Create Account"
6. You should be redirected to the dashboard

### 4.2 Test User Login

1. Go to `/login` page
2. Enter your email and password
3. Click "Sign In"
4. You should be redirected to the dashboard

### 4.3 Test Protected Routes

1. Try accessing `/dashboard` without logging in
2. You should be redirected to `/login`
3. Log in and verify you can access protected pages

### 4.4 Test Logout

1. From the dashboard, click your profile menu
2. Click "Logout"
3. You should be redirected to the home page
4. Trying to access `/dashboard` should redirect to `/login`

## Step 5: Database Management

### 5.1 View Database Data

In Replit, you can use the built-in database viewer:

1. Click the "Database" tab in the left sidebar
2. Browse tables and data
3. Execute SQL queries if needed

### 5.2 Make Schema Changes

If you need to update the database schema:

1. Edit `drizzle/schema.ts`
2. Run: `pnpm db:push`
3. This will generate and apply migrations automatically

### 5.3 Backup Your Data

PlanetScale automatically backs up your data, but you can also:

1. Export data from PlanetScale dashboard
2. Download SQL dump for backup
3. Use PlanetScale's built-in backup features

## Step 6: Production Considerations

### 6.1 Security Best Practices

1. **Change JWT_SECRET** - Use a strong, random secret (min 32 characters)
2. **Enable HTTPS** - Replit provides free HTTPS
3. **Set NODE_ENV=production** - Already configured
4. **Use strong passwords** - Enforce password requirements (already implemented)
5. **Enable email verification** - Implement email verification for new users
6. **Rate limiting** - Consider adding rate limiting to auth endpoints

### 6.2 Performance Optimization

1. **Database indexes** - Already optimized in schema
2. **Connection pooling** - PlanetScale provides connection pooling
3. **Caching** - Consider adding Redis for session caching
4. **CDN** - Use Replit's built-in CDN for static assets

### 6.3 Monitoring and Logging

1. **Error tracking** - Consider Sentry for error monitoring
2. **Analytics** - Use Replit's built-in analytics
3. **Logs** - Check Replit console for application logs
4. **Database logs** - Monitor PlanetScale dashboard for slow queries

## Troubleshooting

### Issue: "Database connection failed"

**Solution:**
1. Check DATABASE_URL in Replit Secrets
2. Verify PlanetScale database is running
3. Check if SSL is enabled in PlanetScale
4. Try adding `?sslaccept=strict` to connection string

### Issue: "JWT_SECRET not configured"

**Solution:**
1. Go to Replit Secrets
2. Add JWT_SECRET with a strong random value
3. Restart the application

### Issue: "Tables not created"

**Solution:**
1. Run `pnpm db:push` in Replit console
2. Check for migration errors
3. Verify database connection is working

### Issue: "Login fails with 'Invalid email or password'"

**Solution:**
1. Verify user exists in database
2. Check password is correct
3. Ensure password meets strength requirements
4. Check browser console for detailed error messages

### Issue: "CORS errors in browser"

**Solution:**
1. Ensure tRPC client uses relative URLs (`/api/trpc`)
2. Check that credentials are included in fetch requests
3. Verify backend is serving from same origin

## Advanced Configuration

### Custom Domain

1. In Replit, go to "Tools" → "Domain"
2. Add your custom domain
3. Update DNS records as instructed
4. Update DATABASE_URL if needed for domain-specific configuration

### Email Integration

To enable password reset emails:

1. Set up an email service (SendGrid, Mailgun, etc.)
2. Add email service credentials to Replit Secrets
3. Implement email sending in `server/authRouter.ts` (forgotPassword procedure)
4. Update email templates in your email service

### Two-Factor Authentication

To add 2FA:

1. Install `speakeasy` for TOTP generation
2. Add `twoFactorSecret` and `twoFactorEnabled` fields to users table
3. Implement 2FA procedures in `server/authRouter.ts`
4. Update Login page to handle 2FA challenge

## Deployment Checklist

- [ ] PlanetScale database created and configured
- [ ] DATABASE_URL added to Replit Secrets
- [ ] JWT_SECRET generated and added to Replit Secrets
- [ ] `.replit` file created
- [ ] `pnpm db:push` executed successfully
- [ ] Application starts without errors
- [ ] User registration works
- [ ] User login works
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Logout clears session
- [ ] All tests pass (`pnpm test`)
- [ ] No console errors in browser
- [ ] Database backups configured

## Support and Resources

- **Replit Docs**: https://docs.replit.com
- **PlanetScale Docs**: https://planetscale.com/docs
- **Drizzle ORM Docs**: https://orm.drizzle.team
- **tRPC Docs**: https://trpc.io
- **JWT Best Practices**: https://tools.ietf.org/html/rfc8949

## Next Steps

After successful deployment:

1. **Implement email verification** - Send verification email on signup
2. **Add password reset email** - Send reset link via email
3. **Set up monitoring** - Monitor application health and errors
4. **Configure backups** - Set up automated database backups
5. **Add analytics** - Track user behavior and engagement
6. **Implement payment processing** - Add JazzCash/Easypaisa integration
7. **Set up admin panel** - Configure admin user and permissions

## Migration from Manus OAuth

If you were previously using Manus OAuth:

1. **Existing users** - They will need to create new accounts with email/password
2. **Data migration** - User data is preserved in the database
3. **Sessions** - All existing sessions will be invalidated (users need to log in again)
4. **OAuth endpoints** - `/api/oauth/callback` is no longer needed

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review application logs in Replit console
3. Check PlanetScale dashboard for database issues
4. Review browser console for client-side errors
5. Contact Replit support for platform-specific issues

---

**Last Updated**: December 31, 2025
**Version**: 1.0.0
**Platform**: Replit + PlanetScale
