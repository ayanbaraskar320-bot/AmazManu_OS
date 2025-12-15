# Amaz-ManuOS Operations Dashboard

A modern, full-stack manufacturing operations dashboard with real-time monitoring, analytics, and MongoDB integration.

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- **Location**: `/frontend`
- **Port**: `5173` (Vite dev server)
- **Tech Stack**: React 19, TypeScript, Recharts, Vite
- **Features**:
  - Real-time OEE (Overall Equipment Effectiveness) monitoring
  - Production trend analytics
  - Maintenance ticket management
  - Inventory tracking (raw materials & finished goods)
  - Company dataset management
  - Capacity marketplace
  - Predictive maintenance
  - Image editor
  - Training modules
  - SOPs (Standard Operating Procedures)

### Backend (Node.js + Express + MongoDB)
- **Location**: `/backend`
- **Port**: `4000` (API server)
- **Tech Stack**: Node.js, Express, MongoDB, Mongoose
- **Database**: MongoDB (cloud or local)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Atlas account or local installation)
- npm or yarn

### Installation

1. **Clone and Install Dependencies**
```bash
npm install
```

2. **Configure MongoDB**

Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=4000
```

For MongoDB Atlas:
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Replace `<password>` with your database password
- Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dashboard?retryWrites=true&w=majority`

### Running the Application

#### Development Mode (Recommended)
Run both frontend and backend together:
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:4000`
- Frontend on `http://localhost:5173`

#### Run Separately

**Backend only:**
```bash
npm run backend
```

**Frontend only:**
```bash
npm run frontend
```

### Production Build

Build the frontend for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 📊 API Endpoints

### Health & Info
- `GET /api/health` - Server health check
- `GET /api` - API documentation

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get specific company
- `POST /api/companies` - Add new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company
- `POST /api/companies/import` - Bulk import companies

### Operations Data
- `GET /api/oee` - Get OEE data
- `GET /api/production` - Get production trends
- `GET /api/maintenance` - Get maintenance tickets
- `GET /api/inventory/raw` - Get raw materials inventory
- `GET /api/inventory/finished` - Get finished goods inventory

## 🗂️ Project Structure

```
Management dashboard ayan/
├── backend/
│   ├── server.js           # Express server & MongoDB setup
│   ├── config/             # Configuration files
│   ├── models/             # Mongoose models
│   └── routes/             # API routes
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Reusable UI components
│   │   │   ├── charts/    # Chart components
│   │   │   └── icons/     # Icon components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Entry point
│   │   ├── Api.ts         # API client
│   │   ├── types.ts       # TypeScript types
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── vite.config.ts     # Vite configuration
│   └── tsconfig.json      # TypeScript configuration
├── package.json           # Dependencies & scripts
├── .env                   # Environment variables (create this)
└── README.md             # This file
```

## 🎨 Features

### Dashboard View
- **Plant OEE Monitoring**: Real-time overall equipment effectiveness tracking
- **Production Metrics**: Weekly production trends with interactive charts
- **Live Production Flow**: Visual representation of manufacturing stages
- **Company Dataset Management**: Import and manage company data from MongoDB
- **Active Alerts**: Real-time maintenance ticket notifications
- **Inventory Alerts**: Low stock warnings

### Component Views
1. **Analytics** - Deep dive into operational metrics
2. **Predictive Maintenance** - AI-powered maintenance predictions
3. **Capacity Planning** - Resource optimization
4. **Marketplace** - Capacity trading platform
5. **Training** - Employee training modules
6. **SOPs** - Standard operating procedures
7. **Image Editor** - Visual documentation tools
8. **Inventory Management** - Stock level tracking
9. **Orders** - Order management system
10. **Maintenance** - Ticket management system
11. **UI/UX System** - Component library & style guide

## 📦 Data Import

### Import Company Dataset

You can import company data via:

1. **JSON File Upload** (in Dashboard)
   - Navigate to Dashboard
   - Use the "Import Company Dataset" section
   - Upload a JSON file with company data

2. **API Endpoint**
```bash
curl -X POST http://localhost:4000/api/companies/import \
  -H "Content-Type: application/json" \
  -d '{
    "companies": [
      {
        "name": "Example Corp",
        "industry": "Manufacturing",
        "employees": 500,
        "revenue": 10000000
      }
    ]
  }'
```

3. **Sample Data**
Use the included `sample-data.json` file as a reference for data structure.

## 🔧 Configuration

### Frontend Configuration
Edit `frontend/vite.config.ts` to change:
- Port number
- Proxy settings
- Build options

### Backend Configuration
Edit `backend/server.js` to change:
- Port number
- CORS settings
- MongoDB connection options

### Environment Variables
Create `.env` file with:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=4000
NODE_ENV=development
```

## 🛠️ Development

### Adding New Components
1. Create component in `frontend/components/`
2. Import in `App.tsx`
3. Add route in the view switcher

### Adding New API Endpoints
1. Define route in `backend/server.js`
2. Create corresponding API function in `frontend/Api.ts`
3. Use in components

## 📝 Database Schema

### Company
```javascript
{
  name: String,
  industry: String,
  employees: Number,
  revenue: Number,
  location: String,
  dataset: Object,
  createdAt: Date
}
```

### OEE
```javascript
{
  name: String,
  availability: Number,
  performance: Number,
  quality: Number,
  oee: Number
}
```

### Production
```javascript
{
  day: String,
  production: Number
}
```

### Maintenance Ticket
```javascript
{
  id: String,
  machine: String,
  issue: String,
  reportedBy: String,
  status: String,
  date: String
}
```

### Inventory Item
```javascript
{
  id: String,
  name: String,
  currentStock: Number,
  targetStock: Number,
  unit: String,
  type: String // 'raw' or 'finished'
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your connection string in `.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

### Frontend Not Loading
- Check if Vite dev server is running on port 5173
- Clear browser cache
- Check console for errors

### API Errors
- Verify backend is running on port 4000
- Check MongoDB connection status
- Review server logs for errors

## 📄 License

ISC

## 👥 Contributing

This is a private project for Amaz-ManuOS operations management.

## 🔗 Resources

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
