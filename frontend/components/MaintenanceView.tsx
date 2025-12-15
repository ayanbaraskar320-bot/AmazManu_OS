import React, { useState, useEffect } from 'react';
import { MOCK_OEE_DATA } from '../constants';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { MaintenanceTicket, TicketStatus } from '../types';
import { PlusIcon } from './icons/IconComponents';
import { PrefilledTicket } from '../App';

const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
        case TicketStatus.Open:
            return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full dark:bg-red-900/50 dark:text-red-200">{status}</span>;
        case TicketStatus.InProgress:
            return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-900/50 dark:text-yellow-200">{status}</span>;
        case TicketStatus.Resolved:
            return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-900/50 dark:text-green-200">{status}</span>;
    }
};

interface MaintenanceViewProps {
  prefilledTicket: PrefilledTicket | null;
  clearPrefilledTicket: () => void;
  tickets: MaintenanceTicket[];
  setTickets: React.Dispatch<React.SetStateAction<MaintenanceTicket[]>>;
}

const MaintenanceView: React.FC<MaintenanceViewProps> = ({ prefilledTicket, clearPrefilledTicket, tickets, setTickets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    machine: MOCK_OEE_DATA[0]?.name || '',
    issue: '',
    reportedBy: 'Operator',
  });

  useEffect(() => {
    if (prefilledTicket) {
      setNewTicket(prev => ({
        ...prev,
        machine: prefilledTicket.machine,
        issue: prefilledTicket.issue,
      }));
      setIsModalOpen(true);
      clearPrefilledTicket();
    }
  }, [prefilledTicket, clearPrefilledTicket]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.machine || !newTicket.issue) {
      alert('Please fill out all fields.');
      return;
    }
    const ticketToAdd: MaintenanceTicket = {
      id: `TKT${String(tickets.length + 10).padStart(3, '0')}`,
      ...newTicket,
      status: TicketStatus.Open,
      date: new Date().toISOString().split('T')[0],
    };
    setTickets(prevTickets => [ticketToAdd, ...prevTickets]);
    setIsModalOpen(false);
    setNewTicket({ machine: MOCK_OEE_DATA[0]?.name || '', issue: '', reportedBy: 'Operator' });
  };


  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Maintenance Tickets</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <div className="flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              <span>Log New Issue</span>
            </div>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Machine</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Issue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Reported By</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{ticket.machine}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ticket.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ticket.reportedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(ticket.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ticket.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Maintenance Issue">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="machine" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Machine</label>
            <select id="machine" name="machine" value={newTicket.machine} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {MOCK_OEE_DATA.map(machine => <option key={machine.name} value={machine.name}>{machine.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Issue Description</label>
            <textarea id="issue" name="issue" rows={3} value={newTicket.issue} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Describe the issue..."></textarea>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
            <Button type="submit">Submit Ticket</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MaintenanceView;
