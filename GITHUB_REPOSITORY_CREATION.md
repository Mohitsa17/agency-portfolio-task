# 📦 How to Create GitHub Repository - Step by Step

**Yes, you MUST create a repository on GitHub FIRST before pushing your code!**

---

## 🎯 Step-by-Step: Create Repository on GitHub

### Step 1: Go to GitHub

1. Open your web browser
2. Go to: **https://github.com**
3. **Sign in** to your GitHub account
   - If you don't have an account, click **"Sign up"** and create one (it's free)

---

### Step 2: Create New Repository

1. After logging in, look at the **top right corner** of the page
2. You'll see a **"+"** icon (plus sign) next to your profile picture
3. Click the **"+"** icon
4. A dropdown menu will appear
5. Click **"New repository"**

**OR**

1. You can also click the **"New"** button (green button) on the left sidebar
2. Or go directly to: **https://github.com/new**

---

### Step 3: Fill Repository Details

You'll see a form. Fill it like this:

#### Repository name
- Type: `flipr-task`
- (Or any name you want, like `flipr-assignment`, `my-flipr-project`, etc.)

#### Description (Optional but recommended)
- Type: `Full-stack Next.js project for Flipr Placement Assignment`

#### Visibility
- Choose: **Public** ✅ (recommended - so Flipr HR can see it)
- OR **Private** (if you want to keep it private)

#### ⚠️ IMPORTANT: DO NOT CHECK THESE BOXES
- ❌ **DO NOT** check "Add a README file" (we already have one)
- ❌ **DO NOT** check "Add .gitignore" (we already have one)
- ❌ **DO NOT** check "Choose a license" (optional, but not needed)

**Leave all checkboxes UNCHECKED!**

---

### Step 4: Create Repository

1. Click the green **"Create repository"** button at the bottom
2. GitHub will create your repository
3. You'll see a page with setup instructions

---

### Step 5: Copy Your Repository URL

After creating, you'll see a page that says:

**"Quick setup — if you've done this kind of thing before"**

You'll see a URL like this:
```
https://github.com/YOUR_USERNAME/flipr-task.git
```

**Copy this URL!** You'll need it in the next step.

**Example:**
- If your username is `john-doe`, the URL will be:
  ```
  https://github.com/john-doe/flipr-task.git
  ```

---

## 🔗 Where to Find Your Repository Later

### Method 1: From Your Profile
1. Go to **https://github.com/YOUR_USERNAME**
2. Click on the **"Repositories"** tab
3. You'll see all your repositories listed
4. Click on `flipr-task` to open it

### Method 2: Direct URL
1. Your repository URL is always:
   ```
   https://github.com/YOUR_USERNAME/flipr-task
   ```
2. Replace `YOUR_USERNAME` with your actual GitHub username
3. Bookmark this URL for easy access!

### Method 3: Search
1. On GitHub homepage, use the search bar
2. Type: `flipr-task`
3. It will show your repository

---

## 📝 Now Connect Your Local Code to GitHub

After creating the repository on GitHub, come back to your terminal and run:

```bash
# Navigate to your project folder (if not already there)
cd C:\Users\singh\Desktop\projects\flipr-task

# Check if git is initialized
git status

# If not initialized, run:
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Flipr Task project"

# Connect to your GitHub repository (REPLACE YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/flipr-task.git

# Verify the connection
git remote -v

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

**Example:**
- If your username is `john-doe`, use:
  ```bash
  git remote add origin https://github.com/john-doe/flipr-task.git
  ```

---

## ✅ Verify Your Code is on GitHub

1. Go to: **https://github.com/YOUR_USERNAME/flipr-task**
2. You should see all your files:
   - `README.md`
   - `package.json`
   - `app/` folder
   - `components/` folder
   - All other files
3. **Make sure `.env.local` is NOT visible** (it should be hidden)

---

## 🆘 Troubleshooting

### "Repository already exists"
- You already created it! Just use the existing repository URL

### "Permission denied"
- Make sure you're logged into GitHub
- Check your username is correct
- You might need to use a Personal Access Token instead of password

### "Remote origin already exists"
```bash
# Remove the existing remote
git remote remove origin

# Add it again with correct URL
git remote add origin https://github.com/YOUR_USERNAME/flipr-task.git
```

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly
- Verify your username is correct

---

## 📍 Quick Reference

**Your Repository URL Format:**
```
https://github.com/YOUR_USERNAME/flipr-task
```

**To find it:**
1. Go to github.com
2. Click your profile picture (top right)
3. Click "Your repositories"
4. Find `flipr-task`

**To access it directly:**
- Replace `YOUR_USERNAME` in the URL above with your actual GitHub username
- Example: `https://github.com/john-doe/flipr-task`

---

## 🎯 Summary

1. ✅ **Create repository on GitHub FIRST** (github.com → New repository)
2. ✅ **Copy the repository URL** (looks like `https://github.com/YOUR_USERNAME/flipr-task.git`)
3. ✅ **Connect local code** using `git remote add origin [URL]`
4. ✅ **Push code** using `git push -u origin main`
5. ✅ **Find it later** at `https://github.com/YOUR_USERNAME/flipr-task`

---

**That's it! Your code will be pushed to the repository you just created! 🚀**

