@echo off
echo ========================================
echo AmazManuOS - GitHub Push Helper
echo ========================================
echo.

echo Step 1: Please create your GitHub repository first
echo   1. Go to the browser window that opened
echo   2. Fill in: Repository name = AmazManuOS
echo   3. DO NOT check "Add README" or other options
echo   4. Click "Create repository"
echo.

set /p REPO_URL="Step 2: Enter your GitHub repository URL (e.g., https://github.com/username/AmazManuOS.git): "

echo.
echo Step 3: Adding remote repository...
git remote add origin %REPO_URL%

if %errorlevel% neq 0 (
    echo.
    echo Remote already exists. Removing and re-adding...
    git remote remove origin
    git remote add origin %REPO_URL%
)

echo.
echo Step 4: Pushing to GitHub...
echo You may be prompted for GitHub credentials.
echo Use a Personal Access Token as password!
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Your code is now on GitHub!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Visit your repository on GitHub
    echo 2. Deploy to Vercel: vercel --prod
    echo.
) else (
    echo.
    echo ========================================
    echo Push failed. Please check the error above.
    echo ========================================
    echo.
    echo Common solutions:
    echo 1. Use a Personal Access Token as password
    echo 2. Check your repository URL is correct
    echo 3. Ensure you have push permissions
    echo.
)

pause
