import React, { useState } from 'react';
import { MOCK_SUPPLIER_ORDERS } from '../constants';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { OrderStatus, SupplierOrder } from '../types';
import { PlusIcon, DownloadIcon } from './icons/IconComponents';
import { exportToCsv } from '../utils/exportUtils';

const getStatusBadge = (status: OrderStatus) => {
    const colors = {
        [OrderStatus.Placed]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
        [OrderStatus.Shipped]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
        [OrderStatus.Delivered]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
        [OrderStatus.Cancelled]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`}>{status}</span>;
};

const OrdersView: React.FC = () => {
    const [orders, setOrders] = useState<SupplierOrder[]>(MOCK_SUPPLIER_ORDERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({
        supplier: '',
        items: '',
        expectedDate: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewOrder(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newOrder.supplier || !newOrder.items || !newOrder.expectedDate) {
            alert("Please fill out all fields.");
            return;
        }

        const orderToAdd: SupplierOrder = {
            id: `ORD${String(orders.length + 10).padStart(3, '0')}`,
            ...newOrder,
            status: OrderStatus.Placed,
            orderDate: new Date().toISOString().split('T')[0],
        };
        setOrders(prev => [orderToAdd, ...prev]);
        setIsModalOpen(false);
        setNewOrder({ supplier: '', items: '', expectedDate: '' });
    };
    
    const handleExportOrders = () => {
        exportToCsv(orders, `supplier_orders_${new Date().toISOString().split('T')[0]}.csv`);
    };

    return (
        <>
            <Card>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-xl font-bold">Supplier Orders</h2>
                    <div className="flex items-center gap-4">
                        <Button onClick={handleExportOrders} variant="secondary">
                           <div className="flex items-center gap-2">
                             <DownloadIcon className="w-5 h-5" />
                             <span>Export Orders</span>
                           </div>
                        </Button>
                        <Button onClick={() => setIsModalOpen(true)}>
                           <div className="flex items-center gap-2">
                             <PlusIcon className="w-5 h-5" />
                             <span>Create New Order</span>
                           </div>
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Order ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Supplier</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Items</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Expected Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {orders.map((order) => (
                                <tr key={order.id} className="dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.supplier}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.items}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(order.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.expectedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Supplier Order">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Supplier Name</label>
                        <input type="text" id="supplier" name="supplier" value={newOrder.supplier} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div>
                        <label htmlFor="items" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Items</label>
                        <input type="text" id="items" name="items" value={newOrder.items} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., Pine Logs, Adhesive Resin" required />
                    </div>
                    <div>
                        <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Delivery Date</label>
                        <input type="date" id="expectedDate" name="expectedDate" value={newOrder.expectedDate} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600" required />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit">Place Order</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default OrdersView;