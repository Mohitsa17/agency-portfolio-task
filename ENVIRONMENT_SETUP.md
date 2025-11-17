# 🔐 Environment Variables Setup Guide

Complete guide for setting up environment variables for local development and production.

---

## 📋 Required Variables

| Variable | Description | Required For | Example |
|----------|-------------|--------------|---------|
| `MONGODB_URI` | MongoDB connection string | All environments | `mongodb://localhost:27017/flipr-task` |
| `JWT_SECRET` | Secret key for JWT tokens | All environments | `aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1pQ3` |
| `ADMIN_EMAIL` | Admin login email | All environments | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin login password | All environments | `SecurePassword123!` |

---

## 🏠 Local Development (.env.local)

### Step 1: Create .env.local File

**Windows (PowerShell):**
```powershell
New-Item -Path .env.local -ItemType File
```

**Mac/Linux:**
```bash
touch .env.local
```

### Step 2: Add Variables

Open `.env.local` and add:

```env
# MongoDB Connection
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/flipr-task

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flipr-task?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### Step 3: Verify .gitignore

Make sure `.env.local` is in `.gitignore`:

```gitignore
# env files
.env*
```

**⚠️ CRITICAL: Never commit .env.local to Git!**

---

## ☁️ Production (Vercel)

### Step 1: Access Environment Variables

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Each Variable

For each variable:

1. Click **"Add New"**
2. Enter **Key** (variable name)
3. Enter **Value** (variable value)
4. Select environments:
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**
5. Click **"Save"**

### Step 3: Required Variables

#### MONGODB_URI

**For MongoDB Atlas:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flipr-task?retryWrites=true&w=majority
```

**How to get:**
1. Go to MongoDB Atlas dashboard
2. Click **"Connect"** → **"Connect your application"**
3. Copy connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `flipr-task`

#### JWT_SECRET

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
- https://generate-secret.vercel.app/32

**Example output:**
```
aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1pQ3
```

#### ADMIN_EMAIL

Use a professional email:
```
admin@flipr.com
```

#### ADMIN_PASSWORD

Use a strong password:
```
YourSecurePassword123!
```

**⚠️ Use a different password than your local development!**

---

## 🔒 Security Best Practices

### ✅ DO:

- Use strong, unique values for `JWT_SECRET` in production
- Use a secure password for `ADMIN_PASSWORD`
- Keep `.env.local` in `.gitignore`
- Use MongoDB Atlas for production
- Rotate secrets periodically
- Use different credentials for dev and production

### ❌ DON'T:

- Commit `.env.local` to Git
- Share your production credentials
- Use default/weak passwords
- Use local MongoDB URI on Vercel
- Expose secrets in client-side code
- Use the same JWT_SECRET for multiple projects

---

## 🧪 Testing Environment Variables

### Local Testing

```bash
# Start dev server
npm run dev

# Check if variables are loaded
# Visit http://localhost:3000/admin/login
# Try logging in with ADMIN_EMAIL and ADMIN_PASSWORD
```

### Production Testing

1. Deploy to Vercel
2. Visit your deployment URL
3. Test admin login
4. Check Vercel function logs for errors

### Verify Variables are Set

**In Code (Server-side only):**
```typescript
// This works in API routes
console.log(process.env.MONGODB_URI); // ✅ Works
console.log(process.env.JWT_SECRET); // ✅ Works

// This does NOT work in client components
console.log(process.env.ADMIN_EMAIL); // ❌ Undefined in client
```

**Client-side variables must be prefixed with `NEXT_PUBLIC_`:**
```env
# This is available in client
NEXT_PUBLIC_API_URL=/api
```

---

## 🔄 Updating Variables

### Local

1. Edit `.env.local`
2. Restart dev server (`npm run dev`)

### Production (Vercel)

1. Go to Vercel → Project → Settings → Environment Variables
2. Edit the variable
3. Click **"Save"**
4. **Redeploy** your project (or wait for next deployment)

**Note:** Changes take effect after redeployment.

---

## 🆘 Troubleshooting

### "MONGODB_URI is not defined"

**Solution:**
- Check `.env.local` exists
- Verify variable name is exactly `MONGODB_URI`
- Restart dev server
- Check for typos

### "JWT_SECRET is not defined"

**Solution:**
- Add `JWT_SECRET` to `.env.local`
- Restart dev server
- In Vercel: Add to environment variables and redeploy

### Variables Not Working in Production

**Solution:**
1. Verify variables are set in Vercel
2. Check they're enabled for correct environment
3. Redeploy after adding variables
4. Check Vercel function logs

### MongoDB Connection Fails

**Solution:**
- Verify connection string is correct
- Check MongoDB Atlas IP whitelist
- Verify database user credentials
- Test connection string locally first

---

## 📝 Environment Variables Template

Copy this template for your `.env.local`:

```env
# ============================================
# MongoDB Configuration
# ============================================
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/flipr-task

# OR MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flipr-task?retryWrites=true&w=majority

# ============================================
# JWT Authentication
# ============================================
# Generate with: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# ============================================
# Admin Credentials
# ============================================
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# ============================================
# Optional: Public Variables (Client-side)
# ============================================
# NEXT_PUBLIC_API_URL=/api
```

---

## ✅ Checklist

Before deploying:

- [ ] `.env.local` created locally
- [ ] All variables added to `.env.local`
- [ ] `.env.local` is in `.gitignore`
- [ ] Variables added to Vercel
- [ ] Variables enabled for all environments
- [ ] Strong JWT_SECRET generated
- [ ] Secure ADMIN_PASSWORD set
- [ ] MongoDB connection string tested
- [ ] Local development works
- [ ] Production deployment works

---

**Your environment is now configured! 🎉**

