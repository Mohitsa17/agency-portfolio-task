# ⚡ Quick Fix: Vercel Data Not Showing

## 🔴 Most Common Issue: MongoDB Atlas Network Access

**99% of the time, this is the problem!**

### Fix in 2 Minutes:

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Click "Network Access"** (left sidebar)
3. **Click "Add IP Address"**
4. **Click "Allow Access from Anywhere"** (adds `0.0.0.0/0`)
5. **Click "Confirm"**
6. **Wait 1-2 minutes**
7. **Redeploy on Vercel**

---

## ✅ Verify Environment Variables

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Check these are set:
   - `MONGODB_URI` ✅
   - `JWT_SECRET` ✅
   - `ADMIN_EMAIL` ✅
   - `ADMIN_PASSWORD` ✅
3. **IMPORTANT**: After adding variables, click **"Redeploy"**!

---

## 🧪 Test Your API

Visit these URLs in your browser:

- `https://your-project.vercel.app/api/projects`
- `https://your-project.vercel.app/api/clients`

**Should return:** `{"success": true, "data": [...]}`

**If you get 500 error:** Check Vercel function logs (see below)

---

## 📊 Check Vercel Logs

1. **Vercel Dashboard** → Your Project → **Deployments**
2. Click latest deployment → **"Functions"** tab
3. Click `/api/projects` → **"Logs"** tab
4. Look for error messages

**Common Errors:**
- `IP not whitelisted` → Fix Network Access (above)
- `MONGODB_URI is not defined` → Add environment variable
- `Authentication failed` → Check connection string

---

## 🔄 After Fixing

1. **Redeploy** on Vercel
2. **Clear browser cache** (Ctrl+Shift+R)
3. **Test** the API endpoints
4. **Check** if data appears

---

**That's it! Usually just the Network Access fix solves everything! 🎉**

