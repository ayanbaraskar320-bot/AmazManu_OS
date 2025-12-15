import React, { useState } from 'react';
import Card from './ui/Card';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { InventoryItem } from '../types';
import { PencilIcon, DownloadIcon } from './icons/IconComponents';
import { exportToCsv } from '../utils/exportUtils';


const InventoryProgressBar: React.FC<{ item: InventoryItem }> = ({ item }) => {
  const percentage = (item.currentStock / item.targetStock) * 100;
  let barColor = 'bg-green-500';
  if (percentage < 25) barColor = 'bg-red-500';
  else if (percentage < 50) barColor = 'bg-yellow-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

interface InventoryViewProps {
  rawMaterials: InventoryItem[];
  setRawMaterials: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  finishedGoods: InventoryItem[];
  setFinishedGoods: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const InventoryView: React.FC<InventoryViewProps> = ({ rawMaterials, setRawMaterials, finishedGoods, setFinishedGoods }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const [itemType, setItemType] = useState<'raw' | 'finished' | null>(null);

  const openModal = (item: InventoryItem, type: 'raw' | 'finished') => {
      setCurrentItem(item);
      setNewStock(item.currentStock);
      setItemType(type);
      setIsModalOpen(true);
  };

  const handleStockUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentItem || itemType === null) return;
      
      const updateList = (list: InventoryItem[]) => list.map(item =>
          item.id === currentItem.id ? { ...item, currentStock: newStock } : item
      );

      if (itemType === 'raw') {
          setRawMaterials(updateList);
      } else {
          setFinishedGoods(updateList);
      }
      setIsModalOpen(false);
      setCurrentItem(null);
  };

  const handleExportAll = () => {
    const allInventory = [
      ...rawMaterials.map(item => ({ ...item, type: 'Raw Material' })),
      ...finishedGoods.map(item => ({ ...item, type: 'Finished Good' })),
    ];
    exportToCsv(allInventory, `inventory_all_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const InventoryList: React.FC<{ title: string; items: InventoryItem[], type: 'raw' | 'finished' }> = ({ title, items, type }) => (
    <Card>
      <h3 className="text-xl font-bold p-4">{title}</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.map(item => (
          <li key={item.id} className="p-4 group">
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold">{item.name}</p>
              <div className="flex items-center gap-4">
                 <p className="text-sm text-gray-600 dark:text-gray-300">{`${item.currentStock} / ${item.targetStock} ${item.unit}`}</p>
                 <button onClick={() => openModal(item, type)} className="opacity-0 group-hover:opacity-100 transition-opacity text-bc-blue hover:text-bc-green focus:opacity-100 focus:ring-2 focus:ring-bc-blue rounded-full p-1">
                     <PencilIcon className="dark:text-gray-300" />
                 </button>
              </div>
            </div>
            <InventoryProgressBar item={item} />
          </li>
        ))}
      </ul>
    </Card>
  );
  
  return (
    <>
      <div className="flex justify-end mb-4">
          <Button onClick={handleExportAll} variant="secondary">
              <div className="flex items-center gap-2">
                <DownloadIcon />
                <span>Export All Inventory</span>
              </div>
          </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InventoryList title="Raw Materials" items={rawMaterials} type="raw" />
        <InventoryList title="Finished Goods" items={finishedGoods} type="finished" />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Adjust Stock for ${currentItem?.name}`}>
          <form onSubmit={handleStockUpdate}>
              <div className="space-y-2">
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Stock ({currentItem?.unit})</label>
                  <input
                      type="number"
                      id="stock"
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-bc-green focus:border-bc-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
              </div>
              <div className="flex justify-end pt-6">
                  <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
                  <Button type="submit">Update Stock</Button>
              </div>
          </form>
      </Modal>
    </>
  );
};

export default InventoryView;