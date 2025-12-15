import React, { useState } from 'react';
import Card from './ui/Card';
import Modal from './ui/Modal';
import { BookOpenIcon } from './icons/IconComponents';

interface TrainingModule {
    title: string;
    description: string;
    content: React.ReactNode;
}

const TrainingView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('operators');
    const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

    const trainingContent: Record<string, TrainingModule[]> = {
        operators: [
            { title: 'Using the OEE Dashboard', description: 'Learn how to read and interpret OEE scores.', content: <p>This module covers how to monitor real-time OEE data, understand the components (Availability, Performance, Quality), and how it impacts overall production.</p> },
            { title: 'How to Log Maintenance Tickets', description: 'Step-by-step guide for digital ticket submission.', content: <p>Follow these steps to log a new maintenance issue: 1. Navigate to the Maintenance view. 2. Click "Log New Issue". 3. Fill in the machine details and issue description. 4. Submit the ticket.</p> }
        ],
        maintenance: [
            { title: 'Interpreting Predictive Alerts', description: 'Understand AI-driven failure risk scores.', content: <p>This training explains how the predictive maintenance model works, what the risk scores mean, and how to prioritize tasks based on these alerts to prevent downtime.</p> },
            { title: 'Digital SOP Guide', description: 'Accessing and using digital Standard Operating Procedures.', content: <p>Learn how to search, view, and follow SOPs directly from the dashboard on any device, ensuring you always have the latest procedures at your fingertips.</p> }
        ],
        managers: [
            { title: 'Leveraging Analytics for Decisions', description: 'Use data to drive strategic improvements.', content: <p>This module focuses on the Advanced Analytics view. Learn how to use Downtime Analysis, Energy Consumption charts, and Supplier Scorecards to make informed business decisions.</p> },
            { title: 'Understanding Capacity Simulations', description: 'How to use the capacity planner to unlock potential.', content: <p>Explore the Capacity Optimization view. This guide shows you how to run simulations, identify hidden capacity, and make data-backed decisions about capital expenditure.</p> }
        ]
    };
    
    const TabButton: React.FC<{ id: string; label: string; }> = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === id ? 'bg-bc-green text-white' : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'}`}
        >
            {label}
        </button>
    );

    return (
        <>
            <Card>
                <div className="p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold">Training & Support Center</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resources to help your team succeed with the new digital tools.</p>
                </div>
                <div className="p-4">
                    <div className="flex space-x-2 border-b mb-4 dark:border-gray-700">
                        <TabButton id="operators" label="For Operators & Supervisors" />
                        <TabButton id="maintenance" label="For Maintenance Teams" />
                        <TabButton id="managers" label="For Engineers & Managers" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainingContent[activeTab].map((module, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700/50" onClick={() => setSelectedModule(module)}>
                                <div className="flex items-center text-bc-blue mb-2">
                                    <BookOpenIcon />
                                    <h3 className="ml-2 font-semibold">{module.title}</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{module.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <Modal isOpen={!!selectedModule} onClose={() => setSelectedModule(null)} title={selectedModule?.title || ''}>
                <div className="dark:text-gray-300">{selectedModule?.content}</div>
            </Modal>
        </>
    );
};

export default TrainingView;