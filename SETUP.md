# Quick Setup Guide

## 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
MONGODB_URI=mongodb://localhost:27017/flipr-task
JWT_SECRET=your-secret-key-change-in-production-12345
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## 2. Start MongoDB

Make sure MongoDB is running on your system. If not installed:

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

**For MongoDB Atlas (Cloud):**
- Create a free account
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in `.env.local` with your Atlas connection string

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development Server

```bash
npm run dev
```

## 5. Access Admin Panel

1. Go to: **http://localhost:3000/admin**
   - This will automatically redirect to `/admin/login`

2. Login with:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`

3. After login, you'll be redirected to the dashboard where you can:
   - Manage Projects (Create, Read, Update, Delete)
   - Manage Clients (Create, Read, Update, Delete)
   - View Contact submissions
   - View Newsletter subscribers

## Troubleshooting

### White Screen on /admin
- Make sure `.env.local` file exists
- Restart the dev server after creating/updating `.env.local`
- Check browser console for errors

### Cannot Connect to MongoDB
- Verify MongoDB is running: `mongod` or check MongoDB service
- Check `MONGODB_URI` in `.env.local` is correct
- For Atlas: Make sure your IP is whitelisted

### Login Not Working
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Default credentials: `admin@example.com` / `admin123`
- Check browser console for API errors

## Default Credentials

- **Email:** admin@example.com
- **Password:** admin123

You can change these in `.env.local` file.

