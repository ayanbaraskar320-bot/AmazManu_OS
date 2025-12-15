# Deploying AmazManuOS to Vercel

## Prerequisites
1. A [Vercel account](https://vercel.com/signup) (free tier works fine)
2. [Vercel CLI](https://vercel.com/docs/cli) installed globally
3. MongoDB Atlas connection string
4. (Optional) Gemini API key for AI features

## Step-by-Step Deployment Guide

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Set Up Environment Variables
Before deploying, you need to configure your environment variables in Vercel:

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to your project on Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 4000
   - `NODE_ENV`: production
   - `GEMINI_API_KEY`: Your Gemini API key (optional)

#### Option B: Via CLI
```bash
vercel env add MONGODB_URI
vercel env add PORT
vercel env add NODE_ENV
vercel env add GEMINI_API_KEY
```

### 4. Deploy to Vercel

#### First Time Deployment
```bash
vercel
```

This will:
- Ask you to link to an existing project or create a new one
- Set up the project configuration
- Deploy to a preview URL

#### Production Deployment
```bash
vercel --prod
```

### 5. Verify Deployment
After deployment, Vercel will provide you with:
- **Preview URL**: For testing (e.g., `amazmanuos-xyz.vercel.app`)
- **Production URL**: Your live site (e.g., `amazmanuos.vercel.app`)

## Project Structure for Vercel
```
AmazManuOS/
├── backend/
│   ├── server.js          # Express backend (serverless function)
│   ├── models/
│   ├── routes/
│   └── config/
├── frontend/              # React frontend source
│   ├── components/
│   ├── App.tsx
│   └── index.html
├── dist/                  # Built frontend (auto-generated)
├── vercel.json           # Vercel configuration
├── package.json
└── vite.config.ts

```

## Important Notes

### Backend API Routes
- All API routes are prefixed with `/api`
- Example: `https://your-site.vercel.app/api/companies`
- The backend runs as serverless functions on Vercel

### Environment Variables
- Never commit `.env` files to Git
- Always use Vercel's environment variable system
- Variables are encrypted and secure

### MongoDB Connection
- Use MongoDB Atlas (cloud-hosted)
- Whitelist Vercel's IP addresses or use `0.0.0.0/0` (all IPs)
- Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database`

### Custom Domain (Optional)
1. Go to your project settings on Vercel
2. Navigate to Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify `vite.config.ts` is correctly configured
- Check build logs in Vercel dashboard

### API Not Working
- Verify environment variables are set correctly
- Check MongoDB connection string
- Review serverless function logs in Vercel

### Frontend Not Loading
- Ensure `dist` folder is being generated
- Check `vercel.json` routing configuration
- Verify `index.html` exists in dist folder

## Continuous Deployment
Once connected to Git:
1. Push to your repository
2. Vercel automatically deploys
3. Preview deployments for pull requests
4. Production deployment on main branch

## Useful Commands
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove [deployment-url]
```

## Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
