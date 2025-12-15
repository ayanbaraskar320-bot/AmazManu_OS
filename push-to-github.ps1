# Quick GitHub Push Script
# Run these commands one by one

# Step 1: Configure Git (Replace with YOUR information)
Write-Host "Step 1: Configuring Git..." -ForegroundColor Cyan
Write-Host "Please enter your name: " -NoNewline -ForegroundColor Yellow
$userName = Read-Host
Write-Host "Please enter your email: " -NoNewline -ForegroundColor Yellow
$userEmail = Read-Host

git config --global user.name "$userName"
git config --global user.email "$userEmail"
Write-Host "✓ Git configured!" -ForegroundColor Green

# Step 2: Stage all files
Write-Host "`nStep 2: Staging files..." -ForegroundColor Cyan
git add .
Write-Host "✓ Files staged!" -ForegroundColor Green

# Step 3: Show status
Write-Host "`nStep 3: Checking status..." -ForegroundColor Cyan
git status

# Step 4: Create initial commit
Write-Host "`nStep 4: Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: AmazManuOS Digital Operations Dashboard"
Write-Host "✓ Commit created!" -ForegroundColor Green

# Step 5: Get GitHub repository URL
Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host "IMPORTANT: Create a GitHub repository first!" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: AmazManuOS" -ForegroundColor White
Write-Host "3. DO NOT initialize with README" -ForegroundColor Red
Write-Host "4. Click 'Create repository'" -ForegroundColor White
Write-Host "5. Copy the repository URL" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Magenta

Write-Host "Enter your GitHub repository URL: " -NoNewline -ForegroundColor Yellow
Write-Host "(e.g., https://github.com/username/AmazManuOS.git)" -ForegroundColor Gray
$repoUrl = Read-Host

# Step 6: Add remote
Write-Host "`nStep 6: Adding remote repository..." -ForegroundColor Cyan
git remote add origin $repoUrl
Write-Host "✓ Remote added!" -ForegroundColor Green

# Step 7: Rename branch to main
Write-Host "`nStep 7: Renaming branch to main..." -ForegroundColor Cyan
git branch -M main
Write-Host "✓ Branch renamed!" -ForegroundColor Green

# Step 8: Push to GitHub
Write-Host "`nStep 8: Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You may be prompted for GitHub credentials..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✓ SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Visit your repository on GitHub" -ForegroundColor White
Write-Host "2. Add a description and topics" -ForegroundColor White
Write-Host "3. Connect to Vercel for deployment" -ForegroundColor White
