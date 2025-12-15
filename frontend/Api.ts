const API_URL = 'http://localhost:4000/api';

import {
  OeeData,
  ProductionData,
  MaintenanceTicket,
  InventoryItem
} from './types';

export interface Company {
  _id?: string;
  name: string;
  industry: string;
  employees: number;
  revenue: number;
  createdAt?: string;
  updatedAt?: string;
}

// Mock API functions for Dashboard Data
export const getOeeData = async (): Promise<OeeData[]> => {
  const response = await fetch(`${API_URL}/oee`);
  if (!response.ok) throw new Error('Failed to fetch OEE data');
  return response.json();
};

export const getProductionTrend = async (): Promise<ProductionData[]> => {
  const response = await fetch(`${API_URL}/production`);
  if (!response.ok) throw new Error('Failed to fetch production trend');
  return response.json();
};

export const getMaintenanceTickets = async (): Promise<MaintenanceTicket[]> => {
  const response = await fetch(`${API_URL}/maintenance`);
  if (!response.ok) throw new Error('Failed to fetch maintenance tickets');
  return response.json();
};

export const getRawMaterials = async (): Promise<InventoryItem[]> => {
  const response = await fetch(`${API_URL}/inventory/raw`);
  if (!response.ok) throw new Error('Failed to fetch raw materials');
  return response.json();
};

export const getFinishedGoods = async (): Promise<InventoryItem[]> => {
  const response = await fetch(`${API_URL}/inventory/finished`);
  if (!response.ok) throw new Error('Failed to fetch finished goods');
  return response.json();
};

// Existing Company API functions
export const getCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${API_URL}/companies`);
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  return response.json();
};

export const addCompany = async (companyData: Omit<Company, '_id' | 'createdAt' | 'updatedAt'>): Promise<Company> => {
  const response = await fetch(`${API_URL}/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyData)
  });
  if (!response.ok) {
    throw new Error('Failed to add company');
  }
  return response.json();
};

export const updateCompany = async (id: string, companyData: Partial<Company>): Promise<Company> => {
  const response = await fetch(`${API_URL}/companies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyData)
  });
  if (!response.ok) {
    throw new Error('Failed to update company');
  }
  return response.json();
};

export const deleteCompany = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/companies/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete company');
  }
};

export const importCompanies = async (companies: Company[]): Promise<{ message: string; count: number }> => {
  const response = await fetch(`${API_URL}/companies/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ companies })
  });
  if (!response.ok) {
    throw new Error('Failed to import companies');
  }
  return response.json();
};

export const importAllData = async (data: any): Promise<{ message: string; counts: any }> => {
  const response = await fetch(`${API_URL}/import-all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to import system data');
  }
  return response.json();
};
