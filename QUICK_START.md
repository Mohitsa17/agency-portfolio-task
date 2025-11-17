# ⚡ Quick Start Guide

Get your Flipr Task project up and running in 5 minutes!

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/flipr-task
JWT_SECRET=your-secret-key-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Get connection string
- Update `MONGODB_URI` in `.env.local`

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Browser
- Landing Page: http://localhost:3000
- Admin Panel: http://localhost:3000/admin/login

---

## 🔐 Admin Login

- **URL**: http://localhost:3000/admin/login
- **Email**: `admin@example.com` (from `.env.local`)
- **Password**: `admin123` (from `.env.local`)

---

## 📦 Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables
4. Deploy!

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.**

---

## 🆘 Need Help?

- **Setup Issues**: See [SETUP.md](./SETUP.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Admin Panel**: See [ADMIN_LOGIN.md](./ADMIN_LOGIN.md)

---

**That's it! You're ready to go! 🎉**

