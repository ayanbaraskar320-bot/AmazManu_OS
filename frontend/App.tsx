import React, { useState, useEffect } from 'react';
import {
  getCompanies,
  Company,
  getOeeData,
  getProductionTrend,
  getMaintenanceTickets,
  getRawMaterials,
  getFinishedGoods
} from './Api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import SopView from './components/SopView';
import MaintenanceView from './components/MaintenanceView';
import InventoryView from './components/InventoryView';
import OrdersView from './components/OrdersView';
import AnalyticsView from './components/AnalyticsView';
import PredictiveView from './components/PredictiveView';
import CapacityView from './components/CapacityView';
import TrainingView from './components/TrainingView';
import LoginView from './components/LoginView';
import MarketplaceView from './components/MarketplaceView';

import { ThemeProvider } from './contexts/ThemeContext';
import { OeeData, ProductionData, MaintenanceTicket, InventoryItem, TicketStatus } from './types';

export type View = 'dashboard' | 'sops' | 'maintenance' | 'inventory' | 'orders' | 'analytics' | 'predictive' | 'capacity' | 'training' | 'marketplace';
export interface PrefilledTicket {
  machine: string;
  issue: string;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [prefilledTicket, setPrefilledTicket] = useState<PrefilledTicket | null>(null);

  // Lifted state for global data management
  // Lifted state for global data management
  const [oeeData, setOeeData] = useState<OeeData[]>([]);
  const [productionTrend, setProductionTrend] = useState<ProductionData[]>([]);
  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>([]);
  const [rawMaterials, setRawMaterials] = useState<InventoryItem[]>([]);
  const [finishedGoods, setFinishedGoods] = useState<InventoryItem[]>([]);

  const [companiesFromDB, setCompaniesFromDB] = useState<Company[]>([]);
  const [loadingDB, setLoadingDB] = useState(false);

  // Centralized data simulation logic
  // Fetch initial data
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          setLoadingDB(true);
          const [oee, trend, tickets, raw, finished, companies] = await Promise.all([
            getOeeData(),
            getProductionTrend(),
            getMaintenanceTickets(),
            getRawMaterials(),
            getFinishedGoods(),
            getCompanies()
          ]);

          setOeeData(oee);
          setProductionTrend(trend);
          setMaintenanceTickets(tickets);
          setRawMaterials(raw);
          setFinishedGoods(finished);
          setCompaniesFromDB(companies);
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setLoadingDB(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  // Centralized data simulation logic
  useEffect(() => {
    // Only run simulation if authenticated to save resources
    if (!isAuthenticated) return;

    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

    const interval = setInterval(() => {
      // Simulate OEE data fluctuations
      setOeeData(prevData => prevData.map(machine => {
        const newAvailability = clamp(machine.availability + (Math.random() - 0.5) * 2, 80, 98);
        const newPerformance = clamp(machine.performance + (Math.random() - 0.5) * 2, 85, 99);
        const newQuality = clamp(machine.quality + (Math.random() - 0.5) * 1, 95, 100);
        const newOee = Math.round((newAvailability / 100) * (newPerformance / 100) * (newQuality / 100) * 100);
        return { ...machine, availability: parseFloat(newAvailability.toFixed(1)), performance: parseFloat(newPerformance.toFixed(1)), quality: parseFloat(newQuality.toFixed(1)), oee: newOee };
      }));

      // Simulate production trend updates
      setProductionTrend(prevTrend => {
        if (prevTrend.length === 0) return prevTrend;
        const lastDataPoint = prevTrend[prevTrend.length - 1];
        const newProduction = clamp(lastDataPoint.production + (Math.random() - 0.45) * 500, 2000, 8000);
        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const lastDayIndex = dayNames.indexOf(lastDataPoint.day);
        const newDay = dayNames[(lastDayIndex + 1) % 7];
        const newTrend = [...prevTrend.slice(1), { day: newDay, production: Math.round(newProduction) }];
        return newTrend;
      });

      // Simulate maintenance ticket updates
      if (Math.random() > 0.85) { // 15% chance each tick
        setMaintenanceTickets(prevTickets => {
          const mutableTickets = JSON.parse(JSON.stringify(prevTickets));
          const action = Math.random();
          if (action < 0.5 && mutableTickets.some((t: MaintenanceTicket) => t.status === TicketStatus.Open)) {
            const openIndex = mutableTickets.findIndex((t: MaintenanceTicket) => t.status === TicketStatus.Open);
            if (openIndex !== -1) mutableTickets[openIndex].status = TicketStatus.InProgress;
          } else {
            const machines = oeeData.length > 0 ? oeeData.map(m => m.name) : ['Machine A', 'Machine B']; // Fallback if no data
            const randomMachine = machines[Math.floor(Math.random() * machines.length)];
            const issues = ["Hydraulic leak", "Conveyor belt slipping", "Blade alignment off", "Overheating", "Sensor malfunction"];
            const randomIssue = issues[Math.floor(Math.random() * issues.length)];
            const newTicket: MaintenanceTicket = {
              id: `TKT${Date.now().toString().slice(-4)}`, machine: randomMachine, issue: randomIssue,
              reportedBy: "System", status: TicketStatus.Open, date: new Date().toISOString().split('T')[0],
            };
            return [newTicket, ...mutableTickets].slice(0, 5);
          }
          return mutableTickets;
        });
      }

      // Simulate inventory level changes
      setRawMaterials(prevMaterials => {
        const randomIndex = Math.floor(Math.random() * prevMaterials.length);
        return prevMaterials.map((item, index) => {
          if (index === randomIndex) {
            const change = (Math.random() - 0.4) * (item.targetStock * 0.05);
            const newStock = clamp(item.currentStock + change, 0, item.targetStock);
            return { ...item, currentStock: Math.round(newStock) };
          }
          return item;
        });
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, oeeData.length]); // Added oeeData.length to dependency to update machines list if needed, though mostly fine.

  const handleTakeAction = (machine: string, issue: string) => {
    setPrefilledTicket({ machine, issue });
    setActiveView('maintenance');
  };

  const clearPrefilledTicket = () => {
    setPrefilledTicket(null);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView
          oeeData={oeeData}
          setOeeData={setOeeData}
          productionTrend={productionTrend}
          maintenanceTickets={maintenanceTickets}
          rawMaterials={rawMaterials}
          companiesFromDB={companiesFromDB}
          loadingDB={loadingDB}
          onNavigate={setActiveView}
        />;
      case 'sops':
        return <SopView />;
      case 'maintenance':
        return <MaintenanceView
          prefilledTicket={prefilledTicket}
          clearPrefilledTicket={clearPrefilledTicket}
          tickets={maintenanceTickets}
          setTickets={setMaintenanceTickets}
        />;
      case 'inventory':
        return <InventoryView
          rawMaterials={rawMaterials}
          setRawMaterials={setRawMaterials}
          finishedGoods={finishedGoods}
          setFinishedGoods={setFinishedGoods}
        />;
      case 'orders':
        return <OrdersView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'predictive':
        return <PredictiveView onTakeAction={handleTakeAction} />;
      case 'capacity':
        return <CapacityView />;
      case 'training':
        return <TrainingView />;
      case 'marketplace':
        return <MarketplaceView />;
      default:
        return <DashboardView
          oeeData={oeeData}
          setOeeData={setOeeData}
          productionTrend={productionTrend}
          maintenanceTickets={maintenanceTickets}
          rawMaterials={rawMaterials}
          companiesFromDB={companiesFromDB}
          loadingDB={loadingDB}
          onNavigate={setActiveView}
        />;
    }
  };

  const activeAlerts = maintenanceTickets.filter(t => t.status !== TicketStatus.Resolved);
  const lowInventoryItems = rawMaterials.filter(i => (i.currentStock / i.targetStock) < 0.5);

  return (
    <ThemeProvider>
      {!isAuthenticated ? (
        <LoginView onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <div className="flex h-screen bg-[#0f172a] font-sans text-gray-100">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header
              activeView={activeView}
              activeAlerts={activeAlerts}
              lowInventoryItems={lowInventoryItems}
            />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0f172a] p-4 md:p-8">
              {renderView()}
            </main>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
