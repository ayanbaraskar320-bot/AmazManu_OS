import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_DOWNTIME_REASONS, MOCK_ENERGY_DATA, MOCK_SUPPLIER_SCORES, MOCK_SHIFT_PERFORMANCE } from '../constants';
import Card from './ui/Card';
import { useTheme } from '../contexts/ThemeContext';

const COLORS = ['#006A4E', '#004E8A', '#D97706', '#DC2626', '#6B7280'];

const AnalyticsView: React.FC = () => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Downtime Root Cause (Last 30 Days)">
                    <div className="flex flex-col md:flex-row items-center justify-center h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={MOCK_DOWNTIME_REASONS}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="hours"
                                    nameKey="reason"
                                >
                                    {MOCK_DOWNTIME_REASONS.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend 
                                    layout="vertical" 
                                    verticalAlign="middle" 
                                    align="right"
                                    wrapperStyle={{ color: tickColor, fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Energy Consumption (kWh)">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={MOCK_ENERGY_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis dataKey="name" tick={{ fill: tickColor }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: tickColor }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend wrapperStyle={{ color: tickColor }} />
                            <Line type="monotone" dataKey="Plywood Press 1" stroke="#006A4E" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
                            <Line type="monotone" dataKey="Veneer Lathe A" stroke="#004E8A" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
                            <Line type="monotone" dataKey="Sawmill Line 3" stroke="#D97706" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card title="Shift Performance Comparison">
                         <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={MOCK_SHIFT_PERFORMANCE} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                                <XAxis dataKey="shift" tick={{ fill: tickColor }} axisLine={false} tickLine={false} />
                                <YAxis yAxisId="left" orientation="left" stroke="#006A4E" tick={{ fill: tickColor }} axisLine={false} />
                                <YAxis yAxisId="right" orientation="right" stroke="#004E8A" tick={{ fill: tickColor }} axisLine={false} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend wrapperStyle={{ color: tickColor }} />
                                <Bar yAxisId="left" dataKey="oee" name="OEE (%)" fill="#006A4E" radius={[4, 4, 0, 0]} barSize={50} />
                                <Bar yAxisId="right" dataKey="unitsProduced" name="Units Produced" fill="#004E8A" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
                
                <div className="lg:col-span-1">
                    <Card title="Supplier Scorecard">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Supplier</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {MOCK_SUPPLIER_SCORES.map((score, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{score.supplier}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Lead Time: {score.avgLeadTime} days</div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    score.qualityScore >= 95 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                                    score.qualityScore >= 90 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                                                }`}>
                                                    {score.qualityScore}%
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;