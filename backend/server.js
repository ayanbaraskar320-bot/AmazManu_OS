import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection with auto-reconnect
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

console.log('🔄 Connecting to MongoDB...');

// Connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ MongoDB Connected successfully');
    console.log('📊 Database:', mongoose.connection.name);
    seedDatabase(); // Seed data on connection
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// Monitor connection status
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  Mongoose disconnected from MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ Mongoose reconnected to MongoDB');
});


// --- SCHEMAS AND MODELS ---

// Company Schema
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: String,
  employees: Number,
  revenue: Number,
  location: String,
  dataset: {},
  createdAt: { type: Date, default: Date.now }
});
const Company = mongoose.model('Company', companySchema);

// OEE Schema
const oeeSchema = new mongoose.Schema({
  name: String,
  availability: Number,
  performance: Number,
  quality: Number,
  oee: Number
});
const Oee = mongoose.model('Oee', oeeSchema);

// Production Trend Schema
const productionSchema = new mongoose.Schema({
  day: String,
  production: Number
});
const Production = mongoose.model('Production', productionSchema);

// Maintenance Ticket Schema
const maintenanceTicketSchema = new mongoose.Schema({
  id: String,
  machine: String,
  issue: String,
  reportedBy: String,
  status: String,
  date: String
});
const MaintenanceTicket = mongoose.model('MaintenanceTicket', maintenanceTicketSchema);

// Inventory Item Schema
const inventoryItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  currentStock: Number,
  targetStock: Number,
  unit: String,
  type: { type: String, enum: ['raw', 'finished'] } // Added type to distinguish
});
const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);


// --- SEED DATA ---

const seedDatabase = async () => {
  try {
    const oeeCount = await Oee.countDocuments();
    if (oeeCount === 0) {
      console.log('🌱 Seeding OEE Data...');
      await Oee.insertMany([
        { name: 'Plywood Press 1', availability: 92, performance: 95, quality: 99, oee: 86 },
        { name: 'Veneer Lathe A', availability: 85, performance: 91, quality: 98, oee: 76 },
        { name: 'Sawmill Line 3', availability: 95, performance: 88, quality: 97, oee: 81 },
      ]);
    }

    const prodCount = await Production.countDocuments();
    if (prodCount === 0) {
      console.log('🌱 Seeding Production Data...');
      await Production.insertMany([
        { day: 'Mon', production: 4000 },
        { day: 'Tue', production: 3000 },
        { day: 'Wed', production: 5000 },
        { day: 'Thu', production: 4500 },
        { day: 'Fri', production: 6000 },
        { day: 'Sat', production: 5500 },
        { day: 'Sun', production: 7000 },
      ]);
    }

    const ticketCount = await MaintenanceTicket.countDocuments();
    if (ticketCount === 0) {
      console.log('🌱 Seeding Maintenance Tickets...');
      await MaintenanceTicket.insertMany([
        { id: 'TKT001', machine: 'Plywood Press 1', issue: 'Hydraulic leak', reportedBy: 'John Doe', status: 'In Progress', date: '2024-07-20' },
        { id: 'TKT002', machine: 'Sawmill Line 3', issue: 'Conveyor belt slipping', reportedBy: 'Jane Smith', status: 'Open', date: '2024-07-21' },
        { id: 'TKT003', machine: 'Veneer Lathe A', issue: 'Blade alignment off', reportedBy: 'Mike Ross', status: 'Resolved', date: '2024-07-19' },
      ]);
    }

    const inventoryCount = await InventoryItem.countDocuments();
    if (inventoryCount === 0) {
      console.log('🌱 Seeding Inventory Data...');
      await InventoryItem.insertMany([
        { id: 'RAW001', name: 'Pine Logs', currentStock: 850, targetStock: 1000, unit: 'tons', type: 'raw' },
        { id: 'RAW002', name: 'Adhesive Resin', currentStock: 300, targetStock: 500, unit: 'gallons', type: 'raw' },
        { id: 'RAW003', name: 'Oak Veneer Sheets', currentStock: 1200, targetStock: 2000, unit: 'sheets', type: 'raw' },
        { id: 'FIN001', name: '3/4" Plywood Sheets', currentStock: 4500, targetStock: 5000, unit: 'sheets', type: 'finished' },
        { id: 'FIN002', name: 'Laminated Veneer Lumber', currentStock: 1800, targetStock: 2500, unit: 'beams', type: 'finished' },
        { id: 'FIN003', name: 'I-Joists', currentStock: 2800, targetStock: 3000, unit: 'units', type: 'finished' },
      ]);
    }
    console.log('✅ Database seeding check complete');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};


// --- API ROUTES ---

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// --- OEE Routes ---
app.get('/api/oee', async (req, res) => {
  try {
    const data = await Oee.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Production Routes ---
app.get('/api/production', async (req, res) => {
  try {
    const data = await Production.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Maintenance Routes ---
app.get('/api/maintenance', async (req, res) => {
  try {
    const data = await MaintenanceTicket.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Inventory Routes ---
app.get('/api/inventory/raw', async (req, res) => {
  try {
    const data = await InventoryItem.find({ type: 'raw' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/inventory/finished', async (req, res) => {
  try {
    const data = await InventoryItem.find({ type: 'finished' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- Company Routes (Existing) ---

// Get all companies
app.get('/api/companies', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected', companies: [] });
    }
    const companies = await Company.find().lean();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + error.message, companies: [] });
  }
});

// Get specific company by ID
app.get('/api/companies/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(404).json({ error: 'Company not found' });
  }
});

// Add new company
app.post('/api/companies', async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update company data
app.put('/api/companies/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) return res.status(404).json({ error: 'Company not found' });
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete company
app.delete('/api/companies/:id', async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ error: 'Company not found' });
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import dataset endpoint
app.post('/api/companies/import', async (req, res) => {
  try {
    const { companies } = req.body;
    if (!companies || !Array.isArray(companies)) {
      return res.status(400).json({ error: 'Invalid data format. Expected { companies: [...] }' });
    }
    const imported = await Company.insertMany(companies);
    res.status(201).json({ message: `${imported.length} companies imported successfully`, data: imported });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Import ALL data endpoint
app.post('/api/import-all', async (req, res) => {
  try {
    const { companies, oee, production, maintenance, inventory } = req.body;

    // Clear existing data (optional: add a query param ?clear=true to enable this)
    // For now, we will append/upsert or just insert. Let's clear for a fresh start as implied by "fill data".
    await Promise.all([
      Company.deleteMany({}),
      Oee.deleteMany({}),
      Production.deleteMany({}),
      MaintenanceTicket.deleteMany({}),
      InventoryItem.deleteMany({})
    ]);

    const results = {};

    if (companies && Array.isArray(companies)) {
      results.companies = await Company.insertMany(companies);
    }

    if (oee && Array.isArray(oee)) {
      results.oee = await Oee.insertMany(oee);
    }

    if (production && Array.isArray(production)) {
      results.production = await Production.insertMany(production);
    }

    if (maintenance && Array.isArray(maintenance)) {
      results.maintenance = await MaintenanceTicket.insertMany(maintenance);
    }

    if (inventory) {
      const rawItems = inventory.raw?.map(i => ({ ...i, type: 'raw' })) || [];
      const finishedItems = inventory.finished?.map(i => ({ ...i, type: 'finished' })) || [];
      const allInventory = [...rawItems, ...finishedItems];
      if (allInventory.length > 0) {
        results.inventory = await InventoryItem.insertMany(allInventory);
      }
    }

    res.status(201).json({
      message: 'Full system data imported successfully',
      counts: {
        companies: results.companies?.length || 0,
        oee: results.oee?.length || 0,
        production: results.production?.length || 0,
        maintenance: results.maintenance?.length || 0,
        inventory: results.inventory?.length || 0
      }
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Serve static files from the frontend dist folder (for production)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API documentation route
app.get('/api', (req, res) => {
  res.json({
    message: 'Amaz-ManuOS Operations Dashboard API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      companies: '/api/companies',
      oee: '/api/oee',
      production: '/api/production',
      maintenance: '/api/maintenance',
      inventory: {
        raw: '/api/inventory/raw',
        finished: '/api/inventory/finished'
      }
    },
    frontend: 'http://localhost:5173 (Vite dev server)',
    backend: `http://localhost:${PORT}`,
    note: 'Run "npm run dev" to start both backend and frontend'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Backend Server: http://localhost:${PORT}`);
  console.log(`🎨 Frontend (Vite): http://localhost:5173`);
  console.log(`🔌 API Endpoints: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`� Companies API: http://localhost:${PORT}/api/companies`);
  console.log(`⚙️  OEE Data: http://localhost:${PORT}/api/oee`);
  console.log(`📦 Inventory: http://localhost:${PORT}/api/inventory/raw`);
  console.log(`${'='.repeat(60)}\n`);
  console.log(`💡 Tip: Run "npm run dev" to start both servers together`);
  console.log(`📝 MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⏳ Connecting...'}\n`);
});
