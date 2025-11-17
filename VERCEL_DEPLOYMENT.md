# 🚀 Vercel Deployment Guide

Complete guide to deploy your Flipr Task project on Vercel.

---

## Prerequisites

- ✅ Project pushed to GitHub
- ✅ MongoDB Atlas account (or MongoDB database)
- ✅ Vercel account (free tier works)

---

## Step 1: Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. **Recommended**: Sign up with GitHub for easy integration

---

## Step 2: Import Project

1. After logging in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find and click **"Import"** next to `flipr-task` (or your repo name)

---

## Step 3: Configure Project

### Framework Preset
- **Framework Preset**: Next.js (should be auto-detected)
- If not detected, select **"Next.js"** manually

### Project Settings
- **Root Directory**: `./` (default - leave as is)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Environment Variables

**⚠️ CRITICAL: Add these BEFORE clicking Deploy!**

Click **"Environment Variables"** and add each variable:

#### 1. MONGODB_URI

**For MongoDB Atlas (Recommended):**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Create a new project (or use existing)
4. Click **"Build a Database"** → Choose **FREE (M0)**
5. Choose a cloud provider and region (closest to you)
6. Click **"Create"**
7. Create database user:
   - Username: `flipr-admin` (or your choice)
   - Password: Generate secure password (save it!)
   - Click **"Create Database User"**
8. Network Access:
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - Click **"Confirm"**
9. Get connection string:
   - Click **"Connect"** → **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `flipr-task`
   - Example: `mongodb+srv://flipr-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/flipr-task?retryWrites=true&w=majority`

**Add to Vercel:**
- **Key**: `MONGODB_URI`
- **Value**: Your connection string
- **Environment**: Select all (Production, Preview, Development)

#### 2. JWT_SECRET

Generate a strong random string:

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Online Generator:**
- Visit: https://generate-secret.vercel.app/32

**Add to Vercel:**
- **Key**: `JWT_SECRET`
- **Value**: Generated string (e.g., `aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1pQ3`)
- **Environment**: Select all

#### 3. ADMIN_EMAIL

**Add to Vercel:**
- **Key**: `ADMIN_EMAIL`
- **Value**: `admin@flipr.com` (or your preferred email)
- **Environment**: Select all

#### 4. ADMIN_PASSWORD

**Add to Vercel:**
- **Key**: `ADMIN_PASSWORD`
- **Value**: `YourSecurePassword123!` (use a strong password)
- **Environment**: Select all

---

## Step 4: Deploy

1. After adding all environment variables, click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Watch the build logs for any errors

---

## Step 5: Verify Deployment

### Check Build Logs

If build fails, check:
- ✅ All environment variables are set
- ✅ MongoDB connection string is correct
- ✅ No syntax errors in code

### Test Your Deployment

1. **Landing Page**: Visit `https://your-project.vercel.app`
2. **Admin Login**: Visit `https://your-project.vercel.app/admin/login`
   - Use credentials you set in `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. **API Test**: Visit `https://your-project.vercel.app/api/projects`
   - Should return JSON (may be empty array if no data)

---

## Step 6: Post-Deployment Setup

### Add Sample Data

1. Login to admin panel
2. Create a few projects
3. Create a few clients
4. Test contact form and newsletter on landing page

### Verify Everything Works

- [ ] Landing page loads
- [ ] Projects section shows data
- [ ] Clients section shows data
- [ ] Contact form submits
- [ ] Newsletter subscribes
- [ ] Admin login works
- [ ] Can create/edit/delete projects
- [ ] Can create/edit/delete clients

---

## Common Issues & Solutions

### Build Fails: "Module not found"

**Solution:**
- Check `package.json` has all dependencies
- Verify imports are correct
- Run `npm install` locally to test

### Build Fails: "MongoDB connection error"

**Solution:**
- Verify `MONGODB_URI` is set correctly
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify database user password is correct
- Test connection string locally first

### Build Fails: "JWT_SECRET is undefined"

**Solution:**
- Add `JWT_SECRET` to environment variables
- Redeploy after adding

### API Returns 500 Error

**Solution:**
1. Go to Vercel Dashboard → Your Project → **"Functions"** tab
2. Check function logs for errors
3. Verify MongoDB connection
4. Check environment variables are set

### "Client not found" Error

**Solution:**
- Verify MongoDB connection is working
- Check data exists in database
- Verify ObjectId format in API calls

---

## Updating Your Deployment

After making changes:

```bash
# Make your changes
git add .
git commit -m "Update: Your changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Start a new build
3. Deploy the update
4. Update your live site

---

## Custom Domain (Optional)

1. Go to Vercel → Your Project → **"Settings"** → **"Domains"**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 24 hours)

---

## Monitoring & Analytics

### Enable Vercel Analytics

1. Go to Project → **"Analytics"** tab
2. Enable Web Analytics (free tier available)
3. Monitor performance and user behavior

### View Logs

1. Go to Project → **"Deployments"** tab
2. Click on a deployment
3. View **"Function Logs"** for API route debugging

---

## Production Checklist

Before sharing with Flipr HR:

- [ ] All environment variables set
- [ ] MongoDB Atlas cluster running
- [ ] Landing page works correctly
- [ ] Admin panel accessible
- [ ] Can login to admin
- [ ] CRUD operations work
- [ ] Contact form works
- [ ] Newsletter subscription works
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance is good (Lighthouse > 90)

---

## Your Live URLs

After deployment, you'll have:

- **Landing Page**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin/login`
- **API Base**: `https://your-project.vercel.app/api`

**Save these URLs for your README and submission!**

---

## 🎉 Success!

Your project is now live on Vercel! 

**Next Steps:**
1. Test everything thoroughly
2. Add sample data via admin panel
3. Update README.md with live demo link
4. Share with Flipr HR team

---

## 📞 Need Help?

- Check Vercel documentation: https://vercel.com/docs
- Check MongoDB Atlas docs: https://docs.atlas.mongodb.com
- Review deployment logs in Vercel dashboard

**Good luck! 🚀**

