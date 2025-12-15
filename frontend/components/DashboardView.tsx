import React, { useState } from 'react';
import Card from './ui/Card';
import OeeGaugeChart from './charts/OeeGaugeChart';
import ProductionTrendChart from './charts/ProductionTrendChart';
import { OeeData, TicketStatus, ProductionData, MaintenanceTicket, InventoryItem } from '../types';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { PencilIcon, DownloadIcon, TrendingUpIcon, BoxIcon, WrenchIcon, TruckIcon, TreeIcon, FlameIcon, LayersIcon, SawIcon, GlobeIcon } from './icons/IconComponents';
import { exportToCsv } from '../utils/exportUtils';

interface DashboardViewProps {
    oeeData: OeeData[];
    setOeeData: React.Dispatch<React.SetStateAction<OeeData[]>>;
    productionTrend: ProductionData[];
    maintenanceTickets: MaintenanceTicket[];
    rawMaterials: InventoryItem[];
    companiesFromDB: any[];
    loadingDB: boolean;
    onNavigate: (view: any) => void;
}

const SummaryCard: React.FC<{ title: string; value: string | number; subtext?: string; icon: React.ReactNode; color: string; trend?: 'up' | 'down' | 'neutral' }> = ({ title, value, subtext, icon, color, trend }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-l-4 transition-transform hover:-translate-y-1 duration-300 flex flex-col justify-between`} style={{ borderColor: color }}>
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-full bg-opacity-10`} style={{ backgroundColor: `${color}20`, color: color }}>
                {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-800' : trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '•'}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">{title}</p>
            {subtext && <p className="text-xs font-medium text-gray-400 mt-2">{subtext}</p>}
        </div>
    </div>
);

const PlantFloorNode: React.FC<{
    title: string;
    icon: React.ReactNode;
    status: 'good' | 'warning' | 'critical';
    metric: string;
    subMetric?: string;
    isLast?: boolean;
}> = ({ title, icon, status, metric, subMetric, isLast }) => {
    const statusColors = {
        good: 'bg-green-500 shadow-green-200 dark:shadow-none',
        warning: 'bg-yellow-500 shadow-yellow-200 dark:shadow-none',
        critical: 'bg-red-500 shadow-red-200 dark:shadow-none',
    };

    const lineColors = {
        good: 'bg-green-500',
        warning: 'bg-yellow-500',
        critical: 'bg-red-500',
    };

    return (
        <div className="flex items-center relative flex-1 min-w-[140px]">
            <div className="flex flex-col items-center z-10 w-full group cursor-pointer">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 transform group-hover:scale-110 ${statusColors[status]}`}>
                    {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8" })}
                </div>
                <div className="mt-3 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{metric}</p>
                    {subMetric && <p className="text-[10px] text-gray-500 dark:text-gray-400">{subMetric}</p>}
                </div>
                <div className={`absolute -top-1 right-1/2 translate-x-1/2 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${statusColors[status]}`}></div>
            </div>
            {!isLast && (
                <div className="hidden md:block flex-1 h-1 bg-gray-200 dark:bg-gray-700 mx-2 relative overflow-hidden rounded-full">
                    <div className={`absolute inset-y-0 left-0 w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-300/50 to-transparent dark:via-gray-600/50`}></div>
                </div>
            )}
            {/* Mobile Connector */}
            {!isLast && (
                <div className="md:hidden absolute left-1/2 top-16 bottom-[-40px] w-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
            )}
        </div>
    );
};

const DashboardView: React.FC<DashboardViewProps> = ({ oeeData, setOeeData, productionTrend, maintenanceTickets, rawMaterials, companiesFromDB, loadingDB, onNavigate }) => {
    const [isOeeModalOpen, setIsOeeModalOpen] = useState(false);
    const [currentMachine, setCurrentMachine] = useState<OeeData | null>(null);
    const [newOeeMetrics, setNewOeeMetrics] = useState({ availability: 0, performance: 0, quality: 0 });

    const activeAlerts = maintenanceTickets.filter(t => t.status !== TicketStatus.Resolved);
    const lowInventoryItems = rawMaterials.filter(i => (i.currentStock / i.targetStock) < 0.5);

    // Calculate Summary Stats
    const avgOee = oeeData.length > 0 ? Math.round(oeeData.reduce((acc, curr) => acc + curr.oee, 0) / oeeData.length) : 0;
    const totalProduction = productionTrend.reduce((acc, curr) => acc + curr.production, 0);
    const activeIssuesCount = activeAlerts.length;

    // Calculate simple trend
    const lastProd = productionTrend[productionTrend.length - 1]?.production || 0;
    const prevProd = productionTrend[productionTrend.length - 2]?.production || 0;
    const prodTrend = lastProd > prevProd ? 'up' : 'down';

    // Plant Map Data Extraction
    const getMachineOee = (name: string) => oeeData.find(d => d.name.includes(name))?.oee || 0;
    const getMachineStatus = (oee: number) => oee >= 85 ? 'good' : oee >= 75 ? 'warning' : 'critical';

    const logYardStock = rawMaterials.length > 0 ? rawMaterials[0].currentStock : 0;
    const logYardTarget = rawMaterials.length > 0 ? rawMaterials[0].targetStock : 1;
    const logYardStatus = (logYardStock / logYardTarget) > 0.2 ? 'good' : 'critical';
    const latheOee = getMachineOee('Veneer Lathe');
    const pressOee = getMachineOee('Plywood Press');
    const sawOee = getMachineOee('Sawmill');

    const openOeeModal = (machine: OeeData) => {
        setCurrentMachine(machine);
        setNewOeeMetrics({
            availability: machine.availability,
            performance: machine.performance,
            quality: machine.quality,
        });
        setIsOeeModalOpen(true);
    };

    const handleOeeMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = Math.max(0, Math.min(100, Number(value)));
        setNewOeeMetrics(prev => ({ ...prev, [name]: numValue }));
    };

    const handleOeeUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMachine) return;

        const { availability, performance, quality } = newOeeMetrics;
        const newOeeScore = Math.round((availability / 100) * (performance / 100) * (quality / 100) * 100);

        setOeeData(prevData => prevData.map(machine =>
            machine.name === currentMachine.name
                ? { ...machine, availability, performance, quality, oee: newOeeScore }
                : machine
        ));

        setIsOeeModalOpen(false);
        setCurrentMachine(null);
    };

    const handleExportOee = () => {
        exportToCsv(oeeData, `oee_data_${new Date().toISOString().split('T')[0]}.csv`);
    };

    return (
        <>
            <div className="space-y-8 animate-fade-in pb-12">
                {/* Summary Stats Row - Updated to match image (2 large cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Plant OEE Card */}
                    <div className="bg-[#1e293b] rounded-xl p-6 relative overflow-hidden border border-gray-700 shadow-lg h-48 flex flex-col justify-between group">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-l-xl"></div>
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-full bg-gray-800 text-green-500">
                                <TrendingUpIcon className="w-6 h-6" />
                            </div>
                            <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-white mb-1">{avgOee}%</h3>
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">PLANT OEE</p>
                            <p className="text-xs text-gray-500 mt-1">Target: 85%</p>
                        </div>
                    </div>

                    {/* Production Card */}
                    <div className="bg-[#1e293b] rounded-xl p-6 relative overflow-hidden border border-gray-700 shadow-lg h-48 flex flex-col justify-between group">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-xl"></div>
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-full bg-gray-800 text-blue-500">
                                <BoxIcon className="w-6 h-6" />
                            </div>
                            <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-white mb-1">{totalProduction.toLocaleString()}</h3>
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">PRODUCTION</p>
                            <p className="text-xs text-gray-500 mt-1">Weekly Units</p>
                        </div>
                    </div>
                </div>

                {/* Plant Floor Visualization Map - Updated to match image (3 cards) */}
                <div className="bg-[#1e293b] rounded-xl border border-gray-700 shadow-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-8">Live Production Flow</h3>
                    <div className="flex flex-col md:flex-row justify-around items-center gap-8">
                        {/* Log Yard - Green */}
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-900/20 transition-transform transform group-hover:scale-110 relative">
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#1e293b] rounded-full border-2 border-green-500"></div>
                                <TreeIcon className="w-10 h-10" />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">LOG YARD</p>
                                <p className="text-lg font-bold text-white">950 tons</p>
                                <p className="text-xs text-gray-500">Input Stock</p>
                            </div>
                        </div>

                        {/* Peeling - Yellow */}
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-yellow-500 flex items-center justify-center text-white shadow-lg shadow-yellow-900/20 transition-transform transform group-hover:scale-110 relative">
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#1e293b] rounded-full border-2 border-yellow-500"></div>
                                <BoxIcon className="w-10 h-10" />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">PEELING</p>
                                <p className="text-lg font-bold text-white">75% OEE</p>
                                <p className="text-xs text-gray-500">Veneer Lathe</p>
                            </div>
                        </div>

                        {/* Drying - Red */}
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-900/20 transition-transform transform group-hover:scale-110 relative">
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#1e293b] rounded-full border-2 border-red-500"></div>
                                <FlameIcon className="w-10 h-10" />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">DRYING</p>
                                <p className="text-lg font-bold text-white">Active</p>
                                <p className="text-xs text-gray-500">Kiln 2</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Companies Dataset Section */}
                <Card title="Companies Dataset from MongoDB">
                    <div className="p-6">
                        {/* Import Section */}
                        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <h4 className="text-sm font-bold text-white mb-3">📁 Import Full System Data</h4>
                            <input
                                type="file"
                                accept=".json"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onload = async (event) => {
                                        try {
                                            const content = event.target?.result as string;
                                            const jsonData = JSON.parse(content);

                                            // Check if it's a full system export or just companies
                                            if (jsonData.companies && jsonData.oee) {
                                                // It's likely a full system export
                                                const { importAllData } = await import('../Api');
                                                const result = await importAllData(jsonData);
                                                alert(`Success! Imported: \nCompanies: ${result.counts.companies}\nOEE: ${result.counts.oee}\nProduction: ${result.counts.production}\nTickets: ${result.counts.maintenance}\nInventory: ${result.counts.inventory}`);
                                            } else {
                                                // Fallback for just companies array or object
                                                const companies = Array.isArray(jsonData) ? jsonData : (jsonData.companies || [jsonData]);
                                                const { importCompanies } = await import('../Api');
                                                const result = await importCompanies(companies);
                                                alert(`Success! ${result.count} companies imported.`);
                                            }

                                            window.location.reload();
                                        } catch (error) {
                                            console.error('Import error:', error);
                                            alert('Error importing dataset: ' + (error as Error).message);
                                        }
                                    };
                                    reader.readAsText(file);
                                }}
                                className="block w-full text-sm text-gray-400
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-bc-green file:text-white
                                    hover:file:bg-emerald-700 cursor-pointer"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Upload <code>sample-data.json</code> to populate Companies, OEE, Production, Maintenance, and Inventory data.
                            </p>
                        </div>

                        {/* Manual Add Form */}
                        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <h4 className="text-sm font-bold text-white mb-3">➕ Add Single Company</h4>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const company = {
                                    name: formData.get('name') as string,
                                    industry: formData.get('industry') as string,
                                    employees: parseInt(formData.get('employees') as string),
                                    revenue: parseFloat(formData.get('revenue') as string)
                                };

                                try {
                                    const { addCompany } = await import('../Api');
                                    await addCompany(company);
                                    alert('Company added successfully!');
                                    e.currentTarget.reset();
                                    window.location.reload(); // Temporary solution
                                } catch (error) {
                                    console.error('Add error:', error);
                                    alert('Error adding company: ' + (error as Error).message);
                                }
                            }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Company Name"
                                    required
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-bc-green"
                                />
                                <input
                                    type="text"
                                    name="industry"
                                    placeholder="Industry"
                                    required
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-bc-green"
                                />
                                <input
                                    type="number"
                                    name="employees"
                                    placeholder="Employees"
                                    required
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-bc-green"
                                />
                                <input
                                    type="number"
                                    name="revenue"
                                    placeholder="Revenue"
                                    required
                                    step="0.01"
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-bc-green"
                                />
                                <Button type="submit" className="md:col-span-2">Add Company</Button>
                            </form>
                        </div>

                        {/* Companies List */}
                        {loadingDB ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bc-green mx-auto"></div>
                                <p className="mt-2 text-gray-400">Loading companies...</p>
                            </div>
                        ) : companiesFromDB.length > 0 ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {companiesFromDB.map((company, index) => (
                                        <div key={company._id || index} className="bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-700 hover:border-bc-green transition-colors">
                                            <h3 className="font-bold text-white mb-2">{company.name}</h3>
                                            <div className="space-y-1 text-sm text-gray-400">
                                                <p><strong className="text-gray-300">Industry:</strong> {company.industry}</p>
                                                <p><strong className="text-gray-300">Employees:</strong> {company.employees?.toLocaleString()}</p>
                                                <p><strong className="text-gray-300">Revenue:</strong> ${company.revenue?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-700">
                                    Total Companies: {companiesFromDB.length}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400 bg-gray-800 rounded-lg border border-gray-700">
                                <div className="text-5xl mb-4">📊</div>
                                <p className="text-base mb-2">No companies found in database</p>
                                <p className="text-sm text-gray-500">Use the import or add form above to get started</p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Marketplace Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="Capacity Marketplace">
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Monetize Idle Time</h4>
                                <span className="text-xs font-semibold text-bc-blue bg-blue-50 px-2 py-1 rounded dark:bg-blue-900/30 dark:text-blue-300">Live Market</span>
                            </div>
                            {/* Item 1 */}
                            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-full dark:bg-green-900/20 dark:text-green-400">
                                        <LayersIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Plywood Press 1</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">4hr Slot • Sat 20:00 - 00:00</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">$12,500</p>
                                    <Button className="mt-1 py-1 px-3 text-xs">List Now</Button>
                                </div>
                            </div>
                            {/* Item 2 */}
                            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-full dark:bg-amber-900/20 dark:text-amber-400">
                                        <SawIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-100">Sawmill Line 3</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">6hr Slot • Sun 00:00 - 06:00</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">$8,200</p>
                                    <Button className="mt-1 py-1 px-3 text-xs">List Now</Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Commodity Market Trends">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <GlobeIcon className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Global Lumber Futures</span>
                                </div>
                                <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-400">+2.4% Today</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Softwood Lumber (1000 bd ft)</span>
                                    <div className="text-right">
                                        <span className="font-bold block dark:text-white">$542.00</span>
                                        <span className="text-xs text-green-500">▲ $12.50</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">OSB (7/16")</span>
                                    <div className="text-right">
                                        <span className="font-bold block dark:text-white">$415.00</span>
                                        <span className="text-xs text-red-500">▼ $3.20</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Plywood (Southern Pine)</span>
                                    <div className="text-right">
                                        <span className="font-bold block dark:text-white">$680.00</span>
                                        <span className="text-xs text-gray-400">• 0.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Detailed Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* OEE Detailed Gauges */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {oeeData.map(data => (
                            <Card key={data.name} className="relative group overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bc-green to-bc-blue"></div>
                                <div className="absolute top-3 right-3 z-10">
                                    <button onClick={() => openOeeModal(data)} className="p-2 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bc-blue hover:text-white dark:bg-gray-700 dark:hover:bg-bc-blue">
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-center pt-6 pb-2">
                                    <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 line-clamp-1 px-2">{data.name}</h3>
                                </div>
                                <OeeGaugeChart value={data.oee} name="OEE Score" />
                                <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 bg-gray-50/50 dark:bg-gray-700/30 dark:border-gray-700 dark:divide-gray-700 backdrop-blur-sm">
                                    <div className="p-2 text-center">
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Avail</p>
                                        <p className="font-bold text-gray-700 dark:text-gray-200">{data.availability}%</p>
                                    </div>
                                    <div className="p-2 text-center">
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Perf</p>
                                        <p className="font-bold text-gray-700 dark:text-gray-200">{data.performance}%</p>
                                    </div>
                                    <div className="p-2 text-center">
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Qual</p>
                                        <p className="font-bold text-gray-700 dark:text-gray-200">{data.quality}%</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        <div className="md:col-span-3">
                            <Card title="Weekly Production Trend" className="h-full shadow-lg border border-gray-100 dark:border-gray-700">
                                <ProductionTrendChart data={productionTrend} />
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar: Alerts & Actions */}
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <Button onClick={handleExportOee} variant="secondary" className="w-full text-xs">
                                <div className="flex items-center justify-center gap-2">
                                    <DownloadIcon className="w-4 h-4" />
                                    <span>Export Operations Data</span>
                                </div>
                            </Button>
                        </div>

                        <Card title="Active Alerts" className="shadow-lg border-l-4 border-amber-500">
                            <ul className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
                                {activeAlerts.slice(0, 5).map(ticket => (
                                    <li key={ticket.id} className="flex items-start space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="p-2 bg-amber-100 rounded-full text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">
                                            <WrenchIcon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{ticket.machine}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{ticket.issue}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">{ticket.date}</p>
                                        </div>
                                    </li>
                                ))}
                                {activeAlerts.length === 0 && <div className="text-center py-8 text-gray-500 text-sm">No active alerts. System healthy.</div>}
                            </ul>
                        </Card>

                        {lowInventoryItems.length > 0 && (
                            <Card title="Inventory Low" className="shadow-lg border-l-4 border-red-500">
                                <ul className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
                                    {lowInventoryItems.map(item => (
                                        <li key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{item.name}</p>
                                                <span className="text-xs font-mono text-red-500">{item.currentStock} {item.unit}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                                <div className="h-full bg-red-500" style={{ width: `${(item.currentStock / item.targetStock) * 100}%` }}></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}
                    </div>

                    <Card title="Quick Actions" className="shadow-lg border-l-4 border-bc-blue">
                        <div className="p-4 grid grid-cols-2 gap-3">
                            <Button onClick={() => onNavigate('analytics')} variant="secondary" className="text-xs justify-center">
                                <TrendingUpIcon className="w-4 h-4 mr-2" />
                                Analytics
                            </Button>
                            <Button onClick={() => onNavigate('marketplace')} variant="secondary" className="text-xs justify-center">
                                <GlobeIcon className="w-4 h-4 mr-2" />
                                Marketplace
                            </Button>
                            <Button onClick={() => onNavigate('sops')} variant="secondary" className="text-xs justify-center">
                                <TreeIcon className="w-4 h-4 mr-2" />
                                SOPs
                            </Button>
                            <Button onClick={() => onNavigate('maintenance')} variant="secondary" className="text-xs justify-center">
                                <WrenchIcon className="w-4 h-4 mr-2" />
                                Maintenance
                            </Button>
                            <Button onClick={() => onNavigate('orders')} variant="secondary" className="text-xs justify-center">
                                <TruckIcon className="w-4 h-4 mr-2" />
                                Orders
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            <Modal isOpen={isOeeModalOpen} onClose={() => setIsOeeModalOpen(false)} title={`Update OEE for ${currentMachine?.name}`}>
                <form onSubmit={handleOeeUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability (%)</label>
                        <input type="number" name="availability" id="availability" value={newOeeMetrics.availability} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="performance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Performance (%)</label>
                        <input type="number" name="performance" id="performance" value={newOeeMetrics.performance} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="quality" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quality (%)</label>
                        <input type="number" name="quality" id="quality" value={newOeeMetrics.quality} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="secondary" onClick={() => setIsOeeModalOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit">Update Metrics</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default DashboardView;