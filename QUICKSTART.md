# 🚀 Quick Start Guide

## Step 1: Configure MongoDB

1. **Get MongoDB Connection String**
   - Option A: Use MongoDB Atlas (Cloud - Recommended)
     - Go to https://www.mongodb.com/cloud/atlas
     - Create a free account
     - Create a new cluster (M0 Free tier)
     - Click "Connect" → "Connect your application"
     - Copy the connection string
   
   - Option B: Use Local MongoDB
     - Install MongoDB locally
     - Use connection string: `mongodb://localhost:27017/amazmanuos-dashboard`

2. **Create .env file**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

3. **Edit .env file**
   - Open `.env` in your editor
   - Replace `MONGODB_URI` with your connection string
   - Replace `<password>` with your actual database password

   Example:
   ```env
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/amazmanuos-dashboard?retryWrites=true&w=majority
   PORT=4000
   NODE_ENV=development
   ```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Run the Application

### Option A: Run Both Servers Together (Recommended)
```bash
npm run dev
```

This will start:
- **Backend API** on http://localhost:4000
- **Frontend** on http://localhost:5173

### Option B: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run frontend
```

## Step 4: Access the Dashboard

Open your browser and go to:
```
http://localhost:5173
```

## Step 5: Import Sample Data (Optional)

1. Navigate to the Dashboard view
2. Scroll to "Companies Dataset from MongoDB" section
3. Click "Choose File" under "Import Company Dataset"
4. Select `sample-data.json` from the project root
5. The data will be imported to MongoDB

## Troubleshooting

### MongoDB Connection Failed
- ✅ Check your `.env` file has the correct `MONGODB_URI`
- ✅ Verify your IP address is whitelisted in MongoDB Atlas
- ✅ Ensure your database password is correct (no special characters issues)
- ✅ Check if MongoDB service is running (for local installations)

### Frontend Not Loading
- ✅ Make sure port 5173 is not in use
- ✅ Check if Vite dev server started successfully
- ✅ Clear browser cache and reload

### Backend API Errors
- ✅ Verify port 4000 is available
- ✅ Check backend console for error messages
- ✅ Ensure all dependencies are installed (`npm install`)

### Port Already in Use
```bash
# Windows - Kill process on port 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## Next Steps

1. **Explore the Dashboard**
   - View real-time OEE metrics
   - Check production trends
   - Monitor maintenance tickets
   - Track inventory levels

2. **Add Your Data**
   - Import company datasets
   - Add custom OEE machines
   - Create maintenance tickets
   - Update inventory

3. **Customize**
   - Modify components in `/frontend/components`
   - Add new API endpoints in `/backend/server.js`
   - Adjust styling in `/frontend/index.css`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both backend and frontend together |
| `npm run backend` | Run only the backend server |
| `npm run frontend` | Run only the frontend dev server |
| `npm start` | Run backend in production mode |
| `npm run build` | Build frontend for production |

## Default Credentials

The application starts with sample data:
- **OEE Machines**: 3 pre-configured machines
- **Production Data**: 7 days of sample data
- **Maintenance Tickets**: 3 sample tickets
- **Inventory Items**: 6 sample items (3 raw, 3 finished)

## Support

For issues or questions:
1. Check the main README.md for detailed documentation
2. Review the troubleshooting section above
3. Check browser console for frontend errors
4. Check terminal/console for backend errors

---

**Happy Manufacturing! 🏭**
