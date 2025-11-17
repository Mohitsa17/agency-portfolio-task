# 🚀 Complete Deployment Guide

This guide will walk you through deploying your Flipr Task project to GitHub and Vercel.

---

## 📋 Table of Contents

1. [GitHub Setup](#1-github-setup)
2. [Vercel Deployment](#2-vercel-deployment)
3. [Environment Variables](#3-environment-variables)
4. [Production Checklist](#4-production-checklist)
5. [Troubleshooting](#5-troubleshooting)

---

## 1️⃣ GitHub Setup

### Step 1: Initialize Git Repository (if not already done)

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

### Step 2: Verify .gitignore

Your `.gitignore` should already be configured. Verify it includes:
- `.env*` files
- `node_modules/`
- `.next/`
- `.vercel/`

### Step 3: Stage All Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

### Step 4: Create Initial Commit

```bash
# Create your first commit
git commit -m "Initial commit: Flipr Task - Full-stack Next.js project with admin panel"

# Or use a more detailed message:
git commit -m "feat: Complete Flipr assignment

- Landing page with hero, projects, clients, contact, and newsletter sections
- Admin panel with CRUD operations for projects and clients
- MongoDB integration with Mongoose
- JWT-based authentication
- Responsive design with custom cursor
- Framer Motion animations
- ShadCN UI components"
```

### Step 5: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository settings:
   - **Name:** `flipr-task` (or your preferred name)
   - **Description:** `Full-stack Next.js project for Flipr Placement Assignment`
   - **Visibility:** Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 6: Connect and Push to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/flipr-task.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/flipr-task.git

# Verify remote was added
git remote -v

# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

### Step 7: Verify Push

- Go to your GitHub repository
- Verify all files are present
- Check that `.env*` files are NOT visible (they should be ignored)

---

## 2️⃣ Vercel Deployment

### Step 1: Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (use GitHub for easy integration)

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Select your `flipr-task` repository
4. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

### Step 4: Environment Variables

**⚠️ CRITICAL: Add these BEFORE deploying!**

Click **"Environment Variables"** and add:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGODB_URI` | Your MongoDB connection string | Production, Preview, Development |
| `JWT_SECRET` | A strong random string (e.g., generate with `openssl rand -base64 32`) | Production, Preview, Development |
| `ADMIN_EMAIL` | Your admin email (e.g., `admin@flipr.com`) | Production, Preview, Development |
| `ADMIN_PASSWORD` | Your secure admin password | Production, Preview, Development |

**How to get MongoDB URI:**

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier M0)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `flipr-task` or your preferred database name
8. Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flipr-task?retryWrites=true&w=majority`

**Option B: Local MongoDB**
- Not recommended for Vercel deployment
- Use MongoDB Atlas for production

**Generate JWT Secret:**
```bash
# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# On Mac/Linux:
openssl rand -base64 32

# Or use an online generator:
# https://generate-secret.vercel.app/32
```

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://flipr-task.vercel.app` (or your custom domain)

### Step 6: Verify Deployment

1. Visit your deployment URL
2. Test the landing page
3. Test admin login at `/admin/login`
4. Check API routes are working

---

## 3️⃣ Environment Variables

### Local Development (.env.local)

Create `.env.local` in your project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/flipr-task
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flipr-task?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Optional: API Base URL (defaults to /api)
# NEXT_PUBLIC_API_URL=/api
```

### Vercel Environment Variables

Add the same variables in Vercel dashboard:
- Go to your project → **Settings** → **Environment Variables**
- Add each variable for **Production**, **Preview**, and **Development** environments

### Important Notes

✅ **DO:**
- Use strong, unique values for `JWT_SECRET` in production
- Use a secure password for `ADMIN_PASSWORD`
- Keep `.env.local` in `.gitignore` (already configured)
- Use MongoDB Atlas for production

❌ **DON'T:**
- Commit `.env.local` to GitHub
- Share your production credentials
- Use default values in production
- Use local MongoDB URI on Vercel

---

## 4️⃣ Production Checklist

### Pre-Deployment

- [ ] All environment variables set in Vercel
- [ ] MongoDB Atlas cluster created and accessible
- [ ] JWT_SECRET is a strong random string
- [ ] Admin credentials are secure
- [ ] `.env.local` is in `.gitignore`
- [ ] No console.log/console.error in production code
- [ ] All API routes tested locally

### Post-Deployment Testing

#### Landing Page
- [ ] Landing page loads correctly
- [ ] Hero section displays properly
- [ ] Projects section fetches and displays data
- [ ] Clients section fetches and displays data
- [ ] Contact form submits successfully
- [ ] Newsletter subscription works
- [ ] Footer displays correctly
- [ ] Custom cursor works
- [ ] Dark mode works
- [ ] Mobile responsive (test on phone/tablet)

#### Admin Panel
- [ ] Can access `/admin/login`
- [ ] Can login with admin credentials
- [ ] Dashboard displays statistics
- [ ] Can create a new project
- [ ] Can edit an existing project
- [ ] Can delete a project
- [ ] Can create a new client
- [ ] Can edit an existing client
- [ ] Can delete a client
- [ ] Can view contact submissions
- [ ] Can view newsletter subscribers
- [ ] Logout works correctly

#### Performance
- [ ] Lighthouse score > 90
- [ ] Page loads in < 3 seconds
- [ ] Images are optimized
- [ ] No console errors
- [ ] No hydration warnings

#### SEO
- [ ] Meta tags are present
- [ ] Open Graph tags work
- [ ] Twitter cards work
- [ ] Page title is correct

---

## 5️⃣ Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
- Check all imports are correct
- Verify `package.json` has all dependencies
- Run `npm install` locally to verify

**Error: "MongoDB connection failed"**
- Verify `MONGODB_URI` is set correctly in Vercel
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for all IPs)
- Verify database user has correct permissions

**Error: "JWT_SECRET is not defined"**
- Add `JWT_SECRET` to Vercel environment variables
- Redeploy after adding variables

### API Routes Not Working

**401 Unauthorized**
- Check JWT token is being sent in Authorization header
- Verify `JWT_SECRET` matches between login and verification
- Check token hasn't expired

**500 Internal Server Error**
- Check Vercel function logs
- Verify MongoDB connection
- Check environment variables are set

### Database Issues

**"Client not found" / "Project not found"**
- Verify MongoDB connection is working
- Check ObjectId format is correct
- Verify data exists in database

### Performance Issues

**Slow page load**
- Enable Vercel Edge Network
- Optimize images
- Check bundle size
- Use Vercel Analytics

---

## 📝 Additional Notes

### Custom Domain (Optional)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### Monitoring

- Enable Vercel Analytics for performance monitoring
- Set up error tracking (optional)
- Monitor API route usage

### Updates

To update your deployment:
```bash
git add .
git commit -m "Your update message"
git push origin main
```
Vercel will automatically redeploy!

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Live landing page
- ✅ Working admin panel
- ✅ MongoDB database
- ✅ API routes
- ✅ Production-ready application

**Your deployment URL:** `https://your-project.vercel.app`

**Admin Panel:** `https://your-project.vercel.app/admin/login`

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas connection
3. Verify all environment variables
4. Review this guide again

Good luck with your deployment! 🚀

