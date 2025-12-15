import React from 'react';
import Card from './ui/Card';
import { MOCK_MAINTENANCE_PREDICTIONS, MOCK_DEMAND_FORECAST } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';

interface PredictiveViewProps {
  onTakeAction: (machine: string, issue: string) => void;
}

const PredictiveView: React.FC<PredictiveViewProps> = ({ onTakeAction }) => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
    };

    const getRiskColor = (risk: number) => {
        if (risk > 75) return 'text-red-500';
        if (risk > 50) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="space-y-8">
            <Card title="Predictive Maintenance Alerts">
                <ul className="space-y-3">
                    {MOCK_MAINTENANCE_PREDICTIONS.map((pred, index) => (
                        <li key={index} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between dark:bg-gray-700/50">
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-100">{pred.machine}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Predicted Issue: <span className="font-semibold">{pred.predictedFailure}</span></p>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <div className="text-right">
                                    <p className={`text-2xl font-bold ${getRiskColor(pred.riskScore)}`}>{pred.riskScore}%</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Failure Risk (Next 7 Days)</p>
                                </div>
                                <Button variant="secondary" onClick={() => onTakeAction(pred.machine, pred.predictedFailure)}>
                                    Take Action
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Customer Demand Forecast">
                    <ResponsiveContainer width="100%" height={300}>
                         <AreaChart data={MOCK_DEMAND_FORECAST} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="month" tick={{ fill: tickColor }} />
                            <YAxis tick={{ fill: tickColor }} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend wrapperStyle={{ color: tickColor }} />
                            <Area type="monotone" dataKey="historical" stackId="1" stroke="#8884d8" fill="#8884d8" name="Historical Demand" />
                            <Area type="monotone" dataKey="forecast" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Forecasted Demand" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
                 <div className="space-y-8">
                    <Card title="Supplier Delay Warnings">
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 dark:bg-yellow-900/50 dark:border-yellow-600">
                           <p className="font-bold text-yellow-800 dark:text-yellow-200">Potential Delay Alert</p>
                           <p className="text-sm text-yellow-700 dark:text-yellow-300">High port congestion may impact shipments from <span className="font-semibold">Hardwood Co.</span> Expected delay: 2-3 days.</p>
                        </div>
                    </Card>
                     <Card title="Energy Optimization Suggestions">
                         <div className="p-4 bg-blue-100 border-l-4 border-blue-500 dark:bg-blue-900/50 dark:border-blue-600">
                           <p className="font-bold text-blue-800 dark:text-blue-200">AI Suggestion</p>
                           <p className="text-sm text-blue-700 dark:text-blue-300">Reduce idle time on <span className="font-semibold">Sawmill Line 3</span> between 2 AM - 4 AM to save an estimated 50 kWh daily.</p>
                        </div>
                    </Card>
                 </div>
            </div>
        </div>
    );
};

export default PredictiveView;