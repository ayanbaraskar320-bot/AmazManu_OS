# 🚀 AmazManuOS Vercel Deployment Checklist

## ✅ Pre-Deployment Setup (Completed)
- [x] Vercel CLI installed (v50.0.1)
- [x] `vercel.json` configuration created
- [x] `.vercelignore` file created
- [x] `.gitignore` updated with dist/ and .vercel/
- [x] Build script configured in package.json

## 📋 Deployment Steps

### 1. Login to Vercel (In Progress)
```bash
vercel login
```
**Status:** A browser window should open for authentication
- Choose your preferred login method (GitHub, GitLab, Bitbucket, or Email)
- Complete the authentication in your browser
- Return to terminal once authenticated

### 2. Configure Environment Variables
Before deploying, you need to set up your environment variables. You have two options:

#### Option A: Set via CLI (During first deployment)
Vercel will prompt you to add environment variables during deployment.

#### Option B: Set via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Find your project (after first deployment)
3. Go to Settings → Environment Variables
4. Add these variables:
   ```
   MONGODB_URI = your_mongodb_connection_string
   PORT = 4000
   NODE_ENV = production
   GEMINI_API_KEY = your_gemini_api_key (optional)
   ```

### 3. Deploy to Vercel
```bash
# First deployment (preview)
vercel

# Or deploy directly to production
vercel --prod
```

### 4. Answer Deployment Questions
When running `vercel` for the first time, you'll be asked:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time)
- **Project name?** → amazmanuos (or your preferred name)
- **Directory with code?** → ./ (current directory)
- **Override settings?** → No

## 🔧 Post-Deployment Configuration

### MongoDB Atlas Setup
1. Go to MongoDB Atlas (https://cloud.mongodb.com)
2. Navigate to Network Access
3. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - Or add Vercel's specific IP ranges
4. This allows Vercel's serverless functions to connect to your database

### Verify Deployment
After deployment, Vercel will provide URLs:
- **Preview URL:** `https://amazmanuos-xyz123.vercel.app`
- **Production URL:** `https://amazmanuos.vercel.app`

Test these endpoints:
- Frontend: `https://your-url.vercel.app`
- API: `https://your-url.vercel.app/api/companies`

## 🎯 Quick Commands Reference

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Open project in browser
vercel open

# Link to existing project
vercel link

# Pull environment variables
vercel env pull
```

## 🐛 Troubleshooting

### Build Fails
- Run `npm run build` locally first to test
- Check all dependencies are in package.json
- Review build logs in Vercel dashboard

### API Returns 500 Error
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check serverless function logs in Vercel

### Frontend Shows Blank Page
- Check browser console for errors
- Verify dist folder was created during build
- Check routing in vercel.json

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has correct permissions

## 📱 Continuous Deployment (Optional)

### Connect to Git Repository
1. Push your code to GitHub/GitLab/Bitbucket
2. In Vercel dashboard, import your repository
3. Vercel will automatically deploy on every push

### Benefits:
- Automatic deployments on git push
- Preview deployments for pull requests
- Rollback to previous deployments easily

## 🎨 Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

## 📊 Monitoring
- View analytics in Vercel dashboard
- Monitor serverless function execution
- Track deployment history
- Review error logs

## ✨ Next Steps After Deployment
1. Test all features on the deployed site
2. Set up custom domain (optional)
3. Configure continuous deployment with Git
4. Monitor performance and errors
5. Set up alerts for downtime

---

**Current Status:** Ready to deploy! Complete the Vercel login and run `vercel --prod`
