export interface OeeData {
  name: string;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
}

export interface ProductionData {
  day: string;
  production: number;
}

export interface Sop {
  id: string;
  title: string;
  category: string;
  steps: string[];
}

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export interface MaintenanceTicket {
  id: string;
  machine: string;
  issue: string;
  reportedBy: string;
  status: TicketStatus;
  date: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  targetStock: number;
  unit: string;
}

export enum OrderStatus {
  Placed = 'Placed',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export interface SupplierOrder {
  id: string;
  supplier: string;
  items: string;
  status: OrderStatus;
  orderDate: string;
  expectedDate: string;
}

// Advanced Analytics Types
export interface DowntimeReason {
  reason: string;
  hours: number;
}

export interface EnergyData {
  name: string;
  'Plywood Press 1': number;
  'Veneer Lathe A': number;
  'Sawmill Line 3': number;
}

export interface SupplierScore {
  supplier: string;
  onTimeDelivery: number;
  qualityScore: number;
  avgLeadTime: number; // in days
}

export interface ShiftPerformance {
  shift: string;
  oee: number;
  unitsProduced: number;
}

// Predictive Insights Types
export interface MaintenancePrediction {
  machine: string;
  riskScore: number; // percentage
  predictedFailure: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface DemandForecast {
  month: string;
  historical: number;
  forecast: number;
}
