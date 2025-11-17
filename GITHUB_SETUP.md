# 📦 GitHub Setup Guide

Complete step-by-step guide to push your project to GitHub.

---

## Step 1: Check Git Status

```bash
# Navigate to your project directory
cd C:\Users\singh\Desktop\projects\flipr-task

# Check if git is initialized
git status
```

If you see "not a git repository", initialize it:
```bash
git init
```

---

## Step 2: Verify .gitignore

Your `.gitignore` should already be configured. Verify it includes:
- `.env*` files (important!)
- `node_modules/`
- `.next/`
- `.vercel/`

---

## Step 3: Stage All Files

```bash
# Add all files
git add .

# Verify what will be committed (check that .env.local is NOT listed)
git status
```

**Important**: Make sure `.env.local` is NOT in the list. If it is, check your `.gitignore`.

---

## Step 4: Create Initial Commit

```bash
git commit -m "feat: Complete Flipr assignment - Full-stack Next.js project

- Landing page with hero, projects, clients, contact, and newsletter sections
- Admin panel with CRUD operations for projects and clients
- MongoDB integration with Mongoose
- JWT-based authentication
- Responsive design with custom cursor
- Framer Motion animations
- ShadCN UI components
- Production-ready deployment configuration"
```

---

## Step 5: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name**: `flipr-task` (or your preferred name)
   - **Description**: `Full-stack Next.js project for Flipr Placement Assignment - Landing page with admin panel`
   - **Visibility**: 
     - ✅ **Public** (recommended for portfolio)
     - ⚠️ **Private** (if you want to keep it private)
   - **DO NOT** check:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
4. Click **"Create repository"**

---

## Step 6: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/flipr-task.git

# Verify remote was added
git remote -v
```

**Alternative (SSH):**
```bash
git remote add origin git@github.com:YOUR_USERNAME/flipr-task.git
```

---

## Step 7: Push to GitHub

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

You may be prompted for GitHub credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your GitHub password)
  - Generate one: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Scopes needed: `repo`

---

## Step 8: Verify Push

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/flipr-task`
2. Verify all files are present
3. **CRITICAL**: Check that `.env.local` is NOT visible
4. Verify `README.md` is visible and formatted correctly

---

## Step 9: Update README (Optional)

If you want to add a live demo link later:

1. Go to your repository on GitHub
2. Click the **pencil icon** (✏️) on README.md
3. Update the demo link section
4. Commit the change

---

## ✅ Success!

Your code is now on GitHub and ready for:
- Vercel deployment
- Sharing with Flipr HR team
- Portfolio showcase

**Next Step**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel!

---

## 🔄 Making Updates

After making changes:

```bash
# Stage changes
git add .

# Commit
git commit -m "Your commit message"

# Push
git push origin main
```

---

## 🆘 Troubleshooting

### "Remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add again
git remote add origin https://github.com/YOUR_USERNAME/flipr-task.git
```

### "Permission denied"
- Check your GitHub username is correct
- Use Personal Access Token instead of password
- Verify repository exists and you have access

### ".env.local is visible on GitHub"
```bash
# Remove from git (but keep local file)
git rm --cached .env.local

# Commit the removal
git commit -m "Remove .env.local from repository"

# Push
git push origin main

# Verify .gitignore has .env*
```

---

**Your repository is now ready! 🎉**

