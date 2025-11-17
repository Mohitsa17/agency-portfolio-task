# Admin Panel Login Guide

## How to Access Admin Panel

1. **Navigate to the login page:**
   ```
   http://localhost:3000/admin/login
   ```
   
   Or simply go to:
   ```
   http://localhost:3000/admin
   ```
   (This will automatically redirect to `/admin/login`)

2. **Default Admin Credentials:**

   Make sure you have a `.env.local` file in your project root with:
   ```env
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

   If you don't have a `.env.local` file, create one with the above credentials.

3. **Login:**
   - Email: `admin@example.com`
   - Password: `admin123`

4. **After Login:**
   - You'll be redirected to `/admin/dashboard`
   - You can manage:
     - Projects (CRUD)
     - Clients (CRUD)
     - Contact submissions (View only)
     - Newsletter subscribers (View only)

## Changing Admin Credentials

To change the admin credentials, update your `.env.local` file:

```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

Then restart your development server.

## Environment Variables Required

Make sure your `.env.local` file includes:

```env
MONGODB_URI=mongodb://localhost:27017/flipr-task
JWT_SECRET=your-secret-key-change-in-production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

