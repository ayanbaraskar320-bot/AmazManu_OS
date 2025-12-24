import React, { useState, useEffect, useRef } from 'react';
import { View } from '../App';
// Theme is fixed to dark; no toggle UI required.
import { MaintenanceTicket, InventoryItem, TicketStatus } from '../types';

interface HeaderProps {
    activeView: View;
    activeAlerts: MaintenanceTicket[];
    lowInventoryItems: InventoryItem[];
}

const Header: React.FC<HeaderProps> = ({ activeView, activeAlerts, lowInventoryItems }) => {
    // theme fixed to dark; no local toggle needed
    const [isAlertsOpen, setIsAlertsOpen] = useState(false);
    const alertsRef = useRef<HTMLDivElement>(null);

    const totalAlerts = activeAlerts.length + lowInventoryItems.length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
                setIsAlertsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [alertsRef]);

    const viewTitles: Record<View, string> = {
        dashboard: 'Operations Dashboard',
        sops: 'Standard Operating Procedures',
        maintenance: 'Maintenance Log',
        inventory: 'Inventory Management',
        orders: 'Supplier Orders',
        analytics: 'Advanced Analytics',
        predictive: 'Predictive Insights',
        capacity: 'Capacity Optimization',
        training: 'Training & Support',
        marketplace: 'Capacity Marketplace',
    };

    const title = viewTitles[activeView] || 'Operations Dashboard';

    return (
        <header className="flex items-center justify-between h-20 px-8 bg-[#0f172a] border-b border-gray-800 text-white">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <div className="flex items-center space-x-6">
                <div className="relative" ref={alertsRef}>
                    <button onClick={() => setIsAlertsOpen(prev => !prev)} className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        {totalAlerts > 0 && (
                            <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                                {totalAlerts}
                            </span>
                        )}
                    </button>
                    {isAlertsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 dark:bg-gray-800 dark:border dark:border-gray-700 animate-fade-in">
                            <div className="p-4 font-bold border-b dark:border-gray-700">
                                Notifications ({totalAlerts})
                            </div>
                            <ul className="max-h-80 overflow-y-auto">
                                {activeAlerts.length > 0 && (
                                    <>
                                        <li className="px-4 py-2 text-xs font-bold text-gray-500 uppercase dark:text-gray-400">Maintenance</li>
                                        {activeAlerts.map(ticket => (
                                            <li key={ticket.id} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <p className="text-sm text-gray-800 dark:text-gray-200"><span className="font-semibold text-amber-600 dark:text-amber-400">{ticket.machine}:</span> {ticket.issue}</p>
                                            </li>
                                        ))}
                                    </>
                                )}
                                {lowInventoryItems.length > 0 && (
                                    <>
                                        <li className="px-4 py-2 text-xs font-bold text-gray-500 uppercase dark:text-gray-400">Inventory</li>
                                        {lowInventoryItems.map(item => (
                                            <li key={item.id} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <p className="text-sm text-gray-800 dark:text-gray-200"><span className="font-semibold text-red-600 dark:text-red-400">{item.name}</span> is low ({item.currentStock} / {item.targetStock})</p>
                                            </li>
                                        ))}
                                    </>
                                )}
                                {totalAlerts === 0 && (
                                    <li className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                                        No new notifications
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://picsum.photos/100" alt="User" />
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Operator</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Shift Lead</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;