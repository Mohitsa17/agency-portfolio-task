# 📝 Deployment Commands Reference

Quick reference for all deployment-related commands.

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 📦 Git Commands

### Initial Setup
```bash
# Initialize git (if not already done)
git init

# Check status
git status

# Stage all files
git add .

# Create commit
git commit -m "Your commit message"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/flipr-task.git

# Verify remote
git remote -v

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Making Updates
```bash
# Stage changes
git add .

# Commit
git commit -m "Update: Description of changes"

# Push
git push origin main
```

### Troubleshooting
```bash
# Remove remote (if wrong)
git remote remove origin

# Check branches
git branch

# View commit history
git log --oneline
```

---

## 🔐 Environment Variables

### Generate JWT Secret

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

### Create .env.local
```bash
# Windows (PowerShell)
New-Item -Path .env.local -ItemType File

# Mac/Linux
touch .env.local
```

Then add:
```env
MONGODB_URI=mongodb://localhost:27017/flipr-task
JWT_SECRET=your-generated-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

---

## 🗄️ MongoDB Commands

### Local MongoDB
```bash
# Start MongoDB (if installed locally)
mongod

# Connect to MongoDB shell
mongosh

# List databases
show dbs

# Use database
use flipr-task

# Show collections
show collections

# View documents
db.projects.find()
db.clients.find()
db.contacts.find()
db.newsletters.find()
```

### MongoDB Atlas
```bash
# No local commands needed
# Use MongoDB Atlas web interface
# Get connection string from Atlas dashboard
```

---

## 🚀 Vercel Commands (Optional)

### Install Vercel CLI
```bash
npm i -g vercel
```

### Deploy via CLI
```bash
# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs
```

**Note:** Using Vercel dashboard is recommended for first deployment.

---

## 🧪 Testing Commands

### Test API Routes Locally
```bash
# Start dev server first
npm run dev

# Then test endpoints:
# GET /api/projects
curl http://localhost:3000/api/projects

# GET /api/clients
curl http://localhost:3000/api/clients

# POST /api/contact
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@example.com","phone":"1234567890","city":"Test City"}'

# POST /api/newsletter
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Admin Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## 📊 Build & Production

### Build Check
```bash
# Build project
npm run build

# Check for errors
# Should complete without errors

# Start production server
npm start

# Test production build
# Visit http://localhost:3000
```

### Check Bundle Size
```bash
# After build, check .next/analyze (if configured)
# Or use:
npm run build -- --analyze
```

---

## 🔍 Debugging Commands

### Check Environment Variables
```bash
# Windows (PowerShell)
Get-Content .env.local

# Mac/Linux
cat .env.local
```

### Check Node Version
```bash
node --version
# Should be 18+
```

### Check npm Version
```bash
npm --version
```

### Clear Next.js Cache
```bash
# Remove .next folder
rm -rf .next

# Or on Windows
rmdir /s .next

# Then rebuild
npm run build
```

---

## 📝 Useful Commands Summary

```bash
# Full setup from scratch
npm install
# Create .env.local
npm run dev

# Deploy workflow
git add .
git commit -m "Update"
git push origin main
# Vercel auto-deploys

# Check everything
npm run build
npm run lint
git status
```

---

**Save this file for quick reference! 📌**

