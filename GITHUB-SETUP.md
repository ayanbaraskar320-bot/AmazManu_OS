# 📦 Adding AmazManuOS to GitHub

## ✅ Current Status
- [x] Git repository initialized
- [ ] Git user configured
- [ ] Files staged for commit
- [ ] Initial commit created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

---

## 🔧 Step-by-Step Guide

### Step 1: Configure Git (First Time Only)
If you haven't configured Git before, run these commands with YOUR information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@gmail.com"
```

### Step 2: Create a GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name:** `AmazManuOS` (or your preferred name)
   - **Description:** "Digital Operations Dashboard for Manufacturing"
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**
5. **Copy the repository URL** (it will look like: `https://github.com/yourusername/AmazManuOS.git`)

### Step 3: Stage All Files
```bash
git add .
```

This adds all files to the staging area (respecting .gitignore).

### Step 4: Create Initial Commit
```bash
git commit -m "Initial commit: AmazManuOS Digital Operations Dashboard"
```

### Step 5: Add Remote Repository
Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/AmazManuOS.git
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/AmazManuOS.git
```

### Step 6: Rename Branch to Main (if needed)
```bash
git branch -M main
```

### Step 7: Push to GitHub
```bash
git push -u origin main
```

You may be prompted to login to GitHub. Use your GitHub credentials or Personal Access Token.

---

## 🚀 Quick Command Sequence

Once you have your GitHub repository URL, run these commands in order:

```bash
# 1. Configure Git (if not done before)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: AmazManuOS Digital Operations Dashboard"

# 4. Add remote (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/AmazManuOS.git

# 5. Rename branch to main
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

---

## 🔐 GitHub Authentication

### Option 1: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "AmazManuOS Deployment"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use the token as your password

### Option 2: GitHub CLI
```bash
# Install GitHub CLI
winget install --id GitHub.cli

# Login
gh auth login

# Follow the prompts
```

### Option 3: SSH Key
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
```

---

## 📋 Files That Will Be Committed

### Included:
- ✅ Source code (frontend/, backend/)
- ✅ Configuration files (package.json, vite.config.ts, vercel.json)
- ✅ Documentation (README.md, DEPLOYMENT-CHECKLIST.md, etc.)
- ✅ .gitignore, .vercelignore

### Excluded (via .gitignore):
- ❌ node_modules/
- ❌ .env, .env.local
- ❌ dist/
- ❌ *.log files
- ❌ .vercel/

---

## 🔄 Future Updates

After initial setup, to push changes:

```bash
# 1. Check status
git status

# 2. Stage changes
git add .

# 3. Commit changes
git commit -m "Description of changes"

# 4. Push to GitHub
git push
```

---

## 🌿 Branch Management (Optional)

### Create a Development Branch
```bash
# Create and switch to dev branch
git checkout -b dev

# Push dev branch to GitHub
git push -u origin dev
```

### Merge Dev to Main
```bash
# Switch to main
git checkout main

# Merge dev into main
git merge dev

# Push to GitHub
git push
```

---

## 🔗 Connect GitHub to Vercel (Bonus)

After pushing to GitHub, you can connect it to Vercel for automatic deployments:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure build settings (Vercel will auto-detect)
5. Add environment variables
6. Deploy!

**Benefits:**
- Automatic deployments on every push
- Preview deployments for pull requests
- Easy rollbacks

---

## 🐛 Troubleshooting

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/AmazManuOS.git
```

### "Permission denied"
- Check your GitHub credentials
- Use a Personal Access Token instead of password
- Or set up SSH keys

### "Large files detected"
- Check if node_modules/ is being committed
- Ensure .gitignore is properly configured
- Run: `git rm -r --cached node_modules/`

### "Nothing to commit"
- Check if files are staged: `git status`
- Make sure .gitignore isn't excluding everything

---

## 📊 Repository Best Practices

1. **Commit Often:** Small, focused commits are better
2. **Write Clear Messages:** Describe what and why
3. **Use Branches:** Keep main stable, develop in branches
4. **Review Before Pushing:** Check `git status` and `git diff`
5. **Never Commit Secrets:** Keep .env files out of Git

---

## ✨ Next Steps After GitHub Setup

1. ✅ Add repository description and topics on GitHub
2. ✅ Create a detailed README.md with screenshots
3. ✅ Set up GitHub Actions for CI/CD (optional)
4. ✅ Connect to Vercel for automatic deployments
5. ✅ Add collaborators if working in a team

---

**Ready to push to GitHub!** Follow the steps above and your code will be safely stored in your GitHub repository.
