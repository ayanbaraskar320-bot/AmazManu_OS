import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

const CapacityView: React.FC = () => {
    const [targetIncrease, setTargetIncrease] = useState(15);
    const [simulationResult, setSimulationResult] = useState('');
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = () => {
        setIsSimulating(true);
        setSimulationResult('');
        setTimeout(() => {
            setSimulationResult(`To achieve a ${targetIncrease}% increase, the model suggests:
- Optimizing Veneer Lathe A schedule (+8% capacity).
- Reducing Plywood Press 1 changeover time by 10 minutes (+5% capacity).
- Minor adjustments to Sawmill Line 3 feed rate (+2% capacity).`);
            setIsSimulating(false);
        }, 1500);
    };


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Hidden Capacity Simulation">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="increase" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Production Increase (%)</label>
                            <input
                                type="number"
                                id="increase"
                                value={targetIncrease}
                                onChange={(e) => setTargetIncrease(Number(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <Button onClick={runSimulation} disabled={isSimulating}>
                            {isSimulating ? 'Simulating...' : 'Run Simulation'}
                        </Button>
                        {simulationResult && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/50 dark:border-green-800">
                                <h4 className="font-semibold text-green-800 dark:text-green-200">Simulation Result:</h4>
                                <pre className="text-sm text-green-700 dark:text-green-300 whitespace-pre-wrap font-sans">{simulationResult}</pre>
                            </div>
                        )}
                    </div>
                </Card>
                 <Card title="CapEx Investment Analysis">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Compare purchasing a new machine vs. optimizing existing assets.</p>
                    <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cost of New Machine ($)</label>
                            <input type="number" defaultValue="500000" className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600" readOnly/>
                         </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Output Increase (%)</label>
                            <input type="number" defaultValue="20" className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600" readOnly/>
                         </div>
                         <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/50 dark:border-blue-800">
                            <p className="text-sm text-blue-700 dark:text-blue-300"><span className="font-semibold">Analysis:</span> Our simulation shows a <span className="font-bold">{targetIncrease}%</span> increase is possible with current assets. Recommend postponing new CapEx until existing capacity is maximized.</p>
                         </div>
                    </div>
                 </Card>
            </div>
            <Card title="Capacity Marketplace: Monetize Idle Time">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-700/50">
                    <div>
                        <p className="font-semibold">Plywood Press 1 - Idle Slot</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">4 hours available: Saturday 8:00 PM - 12:00 AM</p>
                    </div>
                    <Button variant="secondary">List Slot on Marketplace</Button>
                 </div>
                 <div className="flex items-center justify-between p-4 mt-4 bg-gray-50 rounded-lg dark:bg-gray-700/50">
                    <div>
                        <p className="font-semibold">Sawmill Line 3 - Idle Slot</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">6 hours available: Sunday 12:00 AM - 6:00 AM</p>
                    </div>
                    <Button variant="secondary">List Slot on Marketplace</Button>
                 </div>
            </Card>

        </div>
    );
};

export default CapacityView;