import React from 'react';
import { DashboardIcon, DocumentIcon, WrenchIcon, BoxIcon, TruckIcon, ImageIcon, AnalyticsIcon, TrendingUpIcon, CapacityIcon, BookOpenIcon, CurrencyDollarIcon, LayersIcon } from './icons/IconComponents';
import { View } from '../App';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isNew?: boolean;
}> = ({ icon, label, isActive, onClick, isNew = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-r-full transition-all duration-200 mb-1 ${isActive
      ? 'bg-white text-bc-blue shadow-md translate-x-1'
      : 'text-white/90 hover:bg-white/10 hover:text-white'
      }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
    <span className="ml-3 flex-1 text-left tracking-wide">{label}</span>
    {isNew && <span className="ml-auto text-[10px] uppercase font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded">New</span>}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'marketplace', label: 'Marketplace', icon: <CurrencyDollarIcon />, isNew: true },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, isNew: true },
    { id: 'predictive', label: 'Predictions', icon: <TrendingUpIcon />, isNew: true },
    { id: 'sops', label: 'SOPs', icon: <DocumentIcon /> },
    { id: 'maintenance', label: 'Maintenance', icon: <WrenchIcon /> },
    { id: 'inventory', label: 'Inventory', icon: <BoxIcon /> },
    { id: 'orders', label: 'Supplier Orders', icon: <TruckIcon /> },
    { id: 'capacity', label: 'Capacity', icon: <CapacityIcon />, isNew: true },
    { id: 'training', label: 'Training', icon: <BookOpenIcon />, isNew: true },
  ];

  return (
    <div className="relative flex flex-col flex-shrink-0 w-64 h-full bg-[#0f172a] text-white shadow-xl z-10 border-r border-gray-800">
      <div className="flex flex-col items-center justify-center h-32 bg-[#0f172a] border-b border-gray-800 px-4 pt-4">
        <img src="/assets/amazmanuos-logo-white.png" alt="Amaz-ManuOS" className="h-10 object-contain mb-3" />
        <span className="text-[10px] text-blue-200 uppercase tracking-[0.2em] font-bold">Digital Operations</span>
      </div>
      <nav className="flex-1 px-0 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id as View)}
            isNew={item.isNew}
          />
        ))}
      </nav>
      <div className="p-4 bg-black/20 border-t border-white/10">
        <div className="flex items-center space-x-3 text-white/80">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <p className="text-xs">System Operational</p>
        </div>
        <p className="text-[10px] text-center text-white/40 mt-2">&copy; 2024 Amaz-ManuOS</p>
      </div>
    </div>
  );
};

export default Sidebar;