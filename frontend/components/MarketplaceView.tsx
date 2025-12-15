import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { MOCK_OEE_DATA } from '../constants';
import { LayersIcon, SawIcon, TruckIcon, PlusIcon, CurrencyDollarIcon } from './icons/IconComponents';

interface MarketplaceListing {
  id: string;
  machineName: string;
  machineType: string;
  date: string;
  timeSlot: string;
  durationHours: number;
  pricePerHour: number;
  status: 'Available' | 'Rented' | 'Pending';
  renter?: string;
}

const MOCK_LISTINGS: MarketplaceListing[] = [
    { id: 'L001', machineName: 'Plywood Press 1', machineType: 'Press', date: '2024-07-28', timeSlot: '20:00 - 00:00', durationHours: 4, pricePerHour: 2500, status: 'Available' },
    { id: 'L002', machineName: 'Sawmill Line 3', machineType: 'Sawmill', date: '2024-07-29', timeSlot: '00:00 - 06:00', durationHours: 6, pricePerHour: 1200, status: 'Available' },
    { id: 'L003', machineName: 'Veneer Lathe A', machineType: 'Lathe', date: '2024-07-27', timeSlot: '14:00 - 18:00', durationHours: 4, pricePerHour: 3000, status: 'Rented', renter: 'Partner Mill B' },
    { id: 'L004', machineName: 'Dryer Kiln 2', machineType: 'Kiln', date: '2024-07-30', timeSlot: '08:00 - 12:00', durationHours: 4, pricePerHour: 800, status: 'Pending' },
];

const MarketplaceView: React.FC = () => {
    const [listings, setListings] = useState<MarketplaceListing[]>(MOCK_LISTINGS);
    const [filter, setFilter] = useState<'All' | 'Available' | 'Rented'>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Form State
    const [newListing, setNewListing] = useState<Partial<MarketplaceListing>>({
        machineName: MOCK_OEE_DATA[0].name,
        date: '',
        timeSlot: '',
        durationHours: 4,
        pricePerHour: 1000
    });

    const filteredListings = listings.filter(l => filter === 'All' || l.status === filter);

    const handleCreateListing = (e: React.FormEvent) => {
        e.preventDefault();
        const listing: MarketplaceListing = {
            id: `L${Date.now()}`,
            machineName: newListing.machineName || '',
            machineType: 'General', // Simplified for demo
            date: newListing.date || '',
            timeSlot: newListing.timeSlot || '',
            durationHours: newListing.durationHours || 0,
            pricePerHour: newListing.pricePerHour || 0,
            status: 'Available'
        };
        setListings([listing, ...listings]);
        setIsModalOpen(false);
    };

    const handleRent = (id: string) => {
        setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'Pending' } : l));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-bc-blue to-indigo-900 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Capacity Marketplace</h2>
                    <p className="text-blue-200 max-w-xl">Monetize your idle machine time or rent capacity from partner mills. Optimized logistics and secure transactions included.</p>
                    <div className="flex gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <p className="text-xs text-blue-300 uppercase">Total Revenue (Month)</p>
                            <p className="text-2xl font-bold">$42,500</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <p className="text-xs text-blue-300 uppercase">Active Listings</p>
                            <p className="text-2xl font-bold">{listings.filter(l => l.status === 'Available').length}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.5,8.9,82,22.1,70.8,33.1C59.6,44.2,48.7,53,36.8,61.1C24.9,69.2,12,76.6,-0.4,77.3C-12.9,78,-26.3,71.9,-38.9,64.1C-51.5,56.3,-63.3,46.8,-72.4,34.6C-81.5,22.4,-87.9,7.5,-86.3,-6.7C-84.7,-20.9,-75.1,-34.4,-63.5,-45.3C-51.9,-56.2,-38.3,-64.5,-24.8,-72.2C-11.3,-79.9,2.1,-87,15.1,-86.6C28.1,-86.3,40.7,-78.5,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                    {['All', 'Available', 'Rented'].map(f => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-bc-green text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <div className="flex items-center gap-2">
                        <PlusIcon className="w-5 h-5" />
                        <span>Create New Listing</span>
                    </div>
                </Button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                    <Card key={listing.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className={`absolute top-0 left-0 w-1 h-full ${listing.status === 'Available' ? 'bg-green-500' : listing.status === 'Rented' ? 'bg-gray-400' : 'bg-yellow-500'}`}></div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-full ${listing.machineName.includes('Saw') ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'} dark:bg-opacity-20`}>
                                        {listing.machineName.includes('Saw') ? <SawIcon /> : <LayersIcon />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">{listing.machineName}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${listing.status === 'Available' ? 'bg-green-100 text-green-800' : listing.status === 'Rented' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {listing.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-bc-blue dark:text-blue-400">${listing.pricePerHour}</p>
                                    <p className="text-[10px] text-gray-500 uppercase">Per Hour</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Date</span>
                                    <span className="font-medium dark:text-gray-200">{listing.date}</span>
                                </div>
                                <div className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Time Slot</span>
                                    <span className="font-medium dark:text-gray-200">{listing.timeSlot}</span>
                                </div>
                                <div className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Total Value</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">${(listing.pricePerHour * listing.durationHours).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {listing.status === 'Available' ? (
                                    <Button className="w-full justify-center bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" onClick={() => {}}>
                                        Edit Listing
                                    </Button>
                                ) : (
                                    <div className="w-full py-2 text-center text-sm text-gray-500 bg-gray-50 rounded dark:bg-gray-800/50">
                                        Rented by {listing.renter || 'Client'}
                                    </div>
                                )}
                                {listing.status === 'Available' && (
                                    <Button className="w-full justify-center" onClick={() => handleRent(listing.id)}>
                                        Simulate Rent
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Create Listing Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="List New Capacity">
                <form onSubmit={handleCreateListing} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Machine</label>
                        <select 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={newListing.machineName}
                            onChange={(e) => setNewListing({...newListing, machineName: e.target.value})}
                        >
                            {MOCK_OEE_DATA.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                            <input 
                                type="date" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newListing.date}
                                onChange={(e) => setNewListing({...newListing, date: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Slot</label>
                            <input 
                                type="text" 
                                placeholder="e.g., 20:00 - 00:00"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newListing.timeSlot}
                                onChange={(e) => setNewListing({...newListing, timeSlot: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (Hours)</label>
                            <input 
                                type="number" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newListing.durationHours}
                                onChange={(e) => setNewListing({...newListing, durationHours: Number(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Per Hour ($)</label>
                            <input 
                                type="number" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newListing.pricePerHour}
                                onChange={(e) => setNewListing({...newListing, pricePerHour: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                        <p>Estimated Total Value: <span className="font-bold">${(newListing.pricePerHour || 0) * (newListing.durationHours || 0)}</span></p>
                    </div>

                    <div className="flex justify-end pt-4 gap-2">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Post Listing</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MarketplaceView;