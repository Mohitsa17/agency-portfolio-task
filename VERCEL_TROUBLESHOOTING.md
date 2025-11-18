# 🔧 Vercel Deployment Troubleshooting Guide

## Issue: Data Not Showing / API Not Working on Vercel

If your data is not showing on Vercel but works locally, follow these steps:

---

## ✅ Step 1: Verify Environment Variables in Vercel

### Check All Variables Are Set:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Verify these variables are set for **ALL environments** (Production, Preview, Development):
   - ✅ `MONGODB_URI`
   - ✅ `JWT_SECRET`
   - ✅ `ADMIN_EMAIL`
   - ✅ `ADMIN_PASSWORD`

3. **Important**: After adding/updating variables, you MUST **Redeploy**:
   - Go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**

---

## ✅ Step 2: Check MongoDB Atlas Network Access

### The Most Common Issue!

**MongoDB Atlas blocks connections by default.** You must whitelist Vercel's IP addresses.

### Fix:

1. Go to **MongoDB Atlas Dashboard**
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ **Security Note**: This allows all IPs. For production, consider whitelisting specific Vercel IPs.
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to propagate

### Alternative: Whitelist Specific Vercel IPs

Vercel uses dynamic IPs, so `0.0.0.0/0` is recommended for simplicity.

---

## ✅ Step 3: Verify MongoDB Connection String

### Check Your Connection String Format:

**Correct Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

**Common Issues:**
- ❌ Missing `<password>` replacement
- ❌ Wrong database name
- ❌ Missing `?retryWrites=true&w=majority`
- ❌ Extra spaces or special characters

### Test Connection String:

1. Copy your `MONGODB_URI` from Vercel
2. Test it locally in `.env.local`
3. If it works locally but not on Vercel → Check Network Access (Step 2)

---

## ✅ Step 4: Check Vercel Function Logs

### View Real-Time Logs:

1. Go to **Vercel Dashboard** → Your Project → **Deployments**
2. Click on the latest deployment
3. Click **"Functions"** tab
4. Click on a function (e.g., `/api/projects`)
5. View **"Logs"** tab

### What to Look For:

- ❌ `MongoServerError: IP not whitelisted` → Fix Network Access (Step 2)
- ❌ `MongooseError: connection timeout` → Check connection string
- ❌ `MONGODB_URI is not defined` → Add environment variable
- ❌ `Authentication failed` → Check username/password in connection string

---

## ✅ Step 5: Test API Endpoints Directly

### Test in Browser:

1. Visit: `https://your-project.vercel.app/api/projects`
2. Should return JSON: `{"success": true, "data": [...]}`

### If You Get Errors:

**500 Internal Server Error:**
- Check Vercel function logs (Step 4)
- Verify MongoDB connection
- Check environment variables

**401 Unauthorized:**
- This is normal for POST requests without auth
- Test GET endpoints first (they don't require auth)

**404 Not Found:**
- Check API route file exists
- Verify deployment completed successfully

---

## ✅ Step 6: Check Browser Console

### Open Developer Tools:

1. Press `F12` or `Right-click → Inspect`
2. Go to **Console** tab
3. Look for errors when page loads

### Common Errors:

- `Failed to fetch` → API endpoint not reachable
- `Network Error` → CORS issue or API down
- `401 Unauthorized` → Auth token issue (for admin routes)

---

## ✅ Step 7: Verify Database User Permissions

### Check MongoDB Atlas Database User:

1. Go to **MongoDB Atlas** → **Database Access**
2. Find your database user
3. Verify **Database User Privileges**:
   - Should be **"Atlas admin"** or **"Read and write to any database"**
4. If wrong, edit user and update permissions

---

## ✅ Step 8: Test Admin Panel

### Check Admin Login:

1. Visit: `https://your-project.vercel.app/admin/login`
2. Login with credentials from Vercel environment variables
3. Try creating a project/client
4. Check for error messages

### If Creation Fails:

- Check browser console for errors
- Check Vercel function logs
- Verify JWT_SECRET is set correctly
- Verify ADMIN_EMAIL and ADMIN_PASSWORD match

---

## 🔍 Quick Diagnostic Checklist

Run through this checklist:

- [ ] All environment variables set in Vercel
- [ ] Variables enabled for Production, Preview, Development
- [ ] Redeployed after adding variables
- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0`
- [ ] Connection string is correct (tested locally)
- [ ] Database user has correct permissions
- [ ] Vercel function logs show no errors
- [ ] API endpoint `/api/projects` returns data
- [ ] Browser console shows no errors
- [ ] Admin login works

---

## 🆘 Still Not Working?

### Debug Steps:

1. **Add Temporary Logging** (remove after debugging):

```typescript
// In app/api/projects/route.ts
export async function GET(request: NextRequest) {
  try {
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log('Projects found:', projects.length);
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error: any) {
    console.error('Full error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects',
        message: error?.message,
        stack: error?.stack
      },
      { status: 500 }
    );
  }
}
```

2. **Check Vercel Logs** after adding logging
3. **Compare** local vs Vercel behavior
4. **Test** with a simple API endpoint first

---

## 📝 Common Solutions

### Solution 1: Network Access Issue
**Symptom**: 500 error, "IP not whitelisted"  
**Fix**: Add `0.0.0.0/0` to MongoDB Atlas Network Access

### Solution 2: Environment Variable Not Set
**Symptom**: 500 error, "MONGODB_URI is not defined"  
**Fix**: Add variable in Vercel and redeploy

### Solution 3: Wrong Connection String
**Symptom**: Connection timeout  
**Fix**: Verify connection string format and credentials

### Solution 4: Database User Permissions
**Symptom**: Authentication failed  
**Fix**: Check database user has "Atlas admin" privileges

---

## ✅ After Fixing

1. **Redeploy** on Vercel
2. **Clear browser cache** (Ctrl+Shift+R)
3. **Test** all endpoints
4. **Verify** data appears on landing page
5. **Test** admin panel CRUD operations

---

**Need more help? Check Vercel function logs for specific error messages!**

