import { OeeData, ProductionData, Sop, MaintenanceTicket, TicketStatus, InventoryItem, SupplierOrder, OrderStatus, DowntimeReason, EnergyData, SupplierScore, ShiftPerformance, MaintenancePrediction, DemandForecast } from './types';

export const MOCK_OEE_DATA: OeeData[] = [
  { name: 'Plywood Press 1', availability: 92, performance: 95, quality: 99, oee: 86 },
  { name: 'Veneer Lathe A', availability: 85, performance: 91, quality: 98, oee: 76 },
  { name: 'Sawmill Line 3', availability: 95, performance: 88, quality: 97, oee: 81 },
];

export const MOCK_PRODUCTION_TREND: ProductionData[] = [
  { day: 'Mon', production: 4000 },
  { day: 'Tue', production: 3000 },
  { day: 'Wed', production: 5000 },
  { day: 'Thu', production: 4500 },
  { day: 'Fri', production: 6000 },
  { day: 'Sat', production: 5500 },
  { day: 'Sun', production: 7000 },
];

export const MOCK_SOPS: Sop[] = [
  { id: 'SOP001', title: 'Plywood Press Startup Procedure', category: 'Machinery', steps: ['Check hydraulic fluid levels.', 'Ensure safety guards are in place.', 'Power on main control panel.', 'Begin pre-heating sequence.'] },
  { id: 'SOP002', title: 'Emergency Shutdown Protocol', category: 'Safety', steps: ['Hit the nearest E-Stop button.', 'Evacuate the immediate area.', 'Notify shift supervisor.', 'Do not restart until cleared by maintenance.'] },
  { id: 'SOP003', title: 'Veneer Lathe Blade Change', category: 'Maintenance', steps: ['Lockout/Tagout the machine.', 'Release blade tension.', 'Carefully remove old blade.', 'Install new blade and set tension.'] },
];

export const MOCK_MAINTENANCE_TICKETS: MaintenanceTicket[] = [
  { id: 'TKT001', machine: 'Plywood Press 1', issue: 'Hydraulic leak', reportedBy: 'John Doe', status: TicketStatus.InProgress, date: '2024-07-20' },
  { id: 'TKT002', machine: 'Sawmill Line 3', issue: 'Conveyor belt slipping', reportedBy: 'Jane Smith', status: TicketStatus.Open, date: '2024-07-21' },
  { id: 'TKT003', machine: 'Veneer Lathe A', issue: 'Blade alignment off', reportedBy: 'Mike Ross', status: TicketStatus.Resolved, date: '2024-07-19' },
];

export const MOCK_RAW_MATERIALS: InventoryItem[] = [
  { id: 'RAW001', name: 'Pine Logs', currentStock: 850, targetStock: 1000, unit: 'tons' },
  { id: 'RAW002', name: 'Adhesive Resin', currentStock: 300, targetStock: 500, unit: 'gallons' },
  { id: 'RAW003', name: 'Oak Veneer Sheets', currentStock: 1200, targetStock: 2000, unit: 'sheets' },
];

export const MOCK_FINISHED_GOODS: InventoryItem[] = [
  { id: 'FIN001', name: '3/4" Plywood Sheets', currentStock: 4500, targetStock: 5000, unit: 'sheets' },
  { id: 'FIN002', name: 'Laminated Veneer Lumber', currentStock: 1800, targetStock: 2500, unit: 'beams' },
  { id: 'FIN003', name: 'I-Joists', currentStock: 2800, targetStock: 3000, unit: 'units' },
];

export const MOCK_SUPPLIER_ORDERS: SupplierOrder[] = [
  { id: 'ORD001', supplier: 'Forestry Supplies Inc.', items: 'Pine Logs', status: OrderStatus.Shipped, orderDate: '2024-07-15', expectedDate: '2024-07-22' },
  { id: 'ORD002', supplier: 'Chemical Solutions', items: 'Adhesive Resin', status: OrderStatus.Delivered, orderDate: '2024-07-10', expectedDate: '2024-07-18' },
  { id: 'ORD003', supplier: 'Hardwood Co.', items: 'Oak Veneer Sheets', status: OrderStatus.Placed, orderDate: '2024-07-20', expectedDate: '2024-07-28' },
];

// Mock Data for Advanced Analytics
export const MOCK_DOWNTIME_REASONS: DowntimeReason[] = [
  { reason: 'Mechanical Failure', hours: 42 },
  { reason: 'Material Shortage', hours: 25 },
  { reason: 'Operator Error', hours: 15 },
  { reason: 'Changeover', hours: 30 },
  { reason: 'Unplanned Maintenance', hours: 18 },
];

export const MOCK_ENERGY_DATA: EnergyData[] = [
  { name: 'Week 1', 'Plywood Press 1': 400, 'Veneer Lathe A': 240, 'Sawmill Line 3': 350 },
  { name: 'Week 2', 'Plywood Press 1': 420, 'Veneer Lathe A': 230, 'Sawmill Line 3': 360 },
  { name: 'Week 3', 'Plywood Press 1': 380, 'Veneer Lathe A': 250, 'Sawmill Line 3': 340 },
  { name: 'Week 4', 'Plywood Press 1': 410, 'Veneer Lathe A': 260, 'Sawmill Line 3': 370 },
];

export const MOCK_SUPPLIER_SCORES: SupplierScore[] = [
    { supplier: 'Forestry Supplies Inc.', onTimeDelivery: 98, qualityScore: 95, avgLeadTime: 7 },
    { supplier: 'Chemical Solutions', onTimeDelivery: 92, qualityScore: 99, avgLeadTime: 8 },
    { supplier: 'Hardwood Co.', onTimeDelivery: 85, qualityScore: 97, avgLeadTime: 12 },
    { supplier: 'Global Fasteners', onTimeDelivery: 99, qualityScore: 99, avgLeadTime: 5 },
];

export const MOCK_SHIFT_PERFORMANCE: ShiftPerformance[] = [
  { shift: 'Day Shift', oee: 88, unitsProduced: 12000 },
  { shift: 'Night Shift', oee: 82, unitsProduced: 10500 },
  { shift: 'Weekend Shift', oee: 85, unitsProduced: 11000 },
];


// Mock Data for Predictive Insights
export const MOCK_MAINTENANCE_PREDICTIONS: MaintenancePrediction[] = [
    { machine: 'Plywood Press 1', riskScore: 85, predictedFailure: 'Hydraulic Pump', confidence: 'High' },
    { machine: 'Veneer Lathe A', riskScore: 60, predictedFailure: 'Blade Motor Bearing', confidence: 'Medium' },
    { machine: 'Sawmill Line 3', riskScore: 30, predictedFailure: 'Conveyor Belt Wear', confidence: 'Low' },
];

export const MOCK_DEMAND_FORECAST: DemandForecast[] = [
  { month: 'Aug', historical: 28000, forecast: 30000 },
  { month: 'Sep', historical: 31000, forecast: 32000 },
  { month: 'Oct', historical: 35000, forecast: 36000 },
  { month: 'Nov', historical: 32000, forecast: 34000 },
];