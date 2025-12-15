import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Header from './Header';
import OeeGaugeChart from './charts/OeeGaugeChart';
import ProductionTrendChart from './charts/ProductionTrendChart';
import * as Icons from './icons/IconComponents';
import { TicketStatus } from '../types';

const UiUxView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const colors = [
        { name: 'bc-green', hex: '#006A4E', class: 'bg-bc-green' },
        { name: 'bc-blue', hex: '#004E8A', class: 'bg-bc-blue' },
        { name: 'bc-gray', hex: '#F0F2F5', class: 'bg-bc-gray' },
        { name: 'slate-900', hex: '#0f172a', class: 'bg-[#0f172a]' },
        { name: 'slate-800', hex: '#1e293b', class: 'bg-[#1e293b]' },
    ];

    // Mock Data for Charts
    const productionData = [
        { day: 'Mon', production: 4000 },
        { day: 'Tue', production: 3000 },
        { day: 'Wed', production: 5000 },
        { day: 'Thu', production: 4500 },
        { day: 'Fri', production: 6000 },
        { day: 'Sat', production: 5500 },
        { day: 'Sun', production: 7000 },
    ];

    // Mock Data for Header
    const mockAlerts = [
        { id: '1', machine: 'Press 1', issue: 'Overheating', reportedBy: 'System', status: TicketStatus.Open, date: '2024-01-01' }
    ];
    const mockLowInventory = [
        { id: '1', name: 'Resin', currentStock: 100, targetStock: 500, unit: 'L', type: 'raw' as const }
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">UI/UX Design System</h2>
                <p className="text-gray-400">Component Library & Style Guide</p>
            </div>

            {/* Typography Section */}
            <Card title="Typography">
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-white">Heading 1 (4xl)</h1>
                        <h2 className="text-3xl font-bold text-white">Heading 2 (3xl)</h2>
                        <h3 className="text-2xl font-bold text-white">Heading 3 (2xl)</h3>
                        <h4 className="text-xl font-bold text-white">Heading 4 (xl)</h4>
                        <h5 className="text-lg font-bold text-white">Heading 5 (lg)</h5>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-gray-700">
                        <p className="text-base text-gray-300">Body Text (base): The quick brown fox jumps over the lazy dog.</p>
                        <p className="text-sm text-gray-400">Small Text (sm): The quick brown fox jumps over the lazy dog.</p>
                        <p className="text-xs text-gray-500">Extra Small (xs): The quick brown fox jumps over the lazy dog.</p>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Uppercase Label</p>
                    </div>
                </div>
            </Card>

            {/* Colors Section */}
            <Card title="Color Palette">
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {colors.map((color) => (
                            <div key={color.name} className="space-y-2">
                                <div className={`h-20 rounded-lg shadow-lg ${color.class} border border-gray-700`}></div>
                                <div>
                                    <p className="font-bold text-white text-sm">{color.name}</p>
                                    <p className="text-xs text-gray-400">{color.hex}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Buttons Section */}
            <Card title="Buttons">
                <div className="p-6 space-y-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">Primary Button</Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="danger">Danger Button</Button>
                        <Button variant="primary" disabled>Disabled</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary" className="text-xs py-1 px-2">Small Button</Button>
                        <Button variant="primary">Default Button</Button>
                        <Button variant="primary" className="text-lg py-3 px-6">Large Button</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">
                            <Icons.PlusIcon className="w-4 h-4 mr-2" />
                            With Icon
                        </Button>
                        <Button variant="secondary">
                            Next
                            <Icons.TrendingUpIcon className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Standard Card">
                    <div className="p-6 text-gray-300">
                        This is a standard card component with a title. It automatically handles dark mode and padding.
                    </div>
                </Card>
                <Card title="Card with Action" className="border-l-4 border-bc-green">
                    <div className="p-6 text-gray-300">
                        This card has a custom border color and additional styling passed via className prop.
                    </div>
                </Card>
            </div>

            {/* Data Visualization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Gauge Chart (OEE)">
                    <div className="p-6 flex justify-center">
                        <div className="w-64">
                            <OeeGaugeChart value={85} name="Sample Machine" />
                        </div>
                    </div>
                </Card>
                <Card title="Trend Chart (Production)">
                    <div className="p-6 h-64">
                        <ProductionTrendChart data={productionData} />
                    </div>
                </Card>
            </div>

            {/* Layout Components Section */}
            <Card title="Layout Components (Header Demo)">
                <div className="p-6 border border-gray-700 rounded-xl overflow-hidden">
                    <p className="text-sm text-gray-400 mb-4">This is a demo of the Header component with mock alerts.</p>
                    <div className="relative transform scale-95 origin-top-left w-full border border-gray-800 rounded-lg">
                        {/* @ts-ignore - Ignoring View type mismatch for demo */}
                        <Header activeView="ui-ux" activeAlerts={mockAlerts} lowInventoryItems={mockLowInventory} />
                    </div>
                </div>
            </Card>

            {/* Modals Section */}
            <Card title="Interactive Components">
                <div className="p-6">
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal Demo</Button>
                </div>
            </Card>

            {/* Icons Section */}
            <Card title="Iconography">
                <div className="p-6">
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                        {Object.entries(Icons).map(([name, Icon]) => (
                            <div key={name} className="flex flex-col items-center group cursor-pointer hover:text-bc-green transition-colors">
                                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                                    {/* @ts-ignore */}
                                    <Icon className="w-6 h-6 text-gray-300 group-hover:text-bc-green" />
                                </div>
                                <span className="text-[10px] text-gray-500 mt-2 text-center break-all">{name.replace('Icon', '')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        This is a reusable modal component. It handles the overlay, centering, and animations.
                    </p>
                    <p className="text-gray-300">
                        You can put any content here, including forms, lists, or other components.
                    </p>
                    <div className="flex justify-end pt-4">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-2">
                            Close
                        </Button>
                        <Button onClick={() => { alert('Action confirmed!'); setIsModalOpen(false); }}>
                            Confirm Action
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UiUxView;
