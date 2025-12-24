import React, { useState } from 'react';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { importAllData } from '../Api';
import { DownloadIcon } from './icons/IconComponents';

interface SettingsViewProps {
  onImported?: () => Promise<void>;
  isAdmin?: boolean;
  setIsAdmin?: (v: boolean) => void;
  autoRefreshInterval?: number;
  setAutoRefreshInterval?: (v: number) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onImported, isAdmin, setIsAdmin, autoRefreshInterval, setAutoRefreshInterval }) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [detectedArrays, setDetectedArrays] = useState<Array<{ path: string; sample: any[] }>>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({ companies: 'None', oee: 'None', production: 'None', maintenance: 'None', inventory_raw: 'None', inventory_finished: 'None' });
  const [importPreview, setImportPreview] = useState<Record<string, any[]>>({});
  const [mappingFields, setMappingFields] = useState<Record<string, Record<string, string>>>({});
  const [importing, setImporting] = useState(false);

  const handleFileInput = async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    setImportText(text);
  };

  const detectArrays = () => {
    try {
      const parsed = JSON.parse(importText || '{}');
      const arrays: Array<{ path: string; sample: any[] }> = [];
      const walk = (obj: any, path = '') => {
        if (Array.isArray(obj)) {
          arrays.push({ path: path || '$', sample: obj.slice(0, 3) });
        } else if (obj && typeof obj === 'object') {
          Object.keys(obj).forEach(k => walk(obj[k], path ? `${path}.${k}` : k));
        }
      };
      walk(parsed);
      setDetectedArrays(arrays);
      const preview: Record<string, any[]> = {};
      arrays.forEach(a => preview[a.path] = a.sample);
      setImportPreview(preview);
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  const autoMapFields = (collection: string) => {
    // naive auto-map: pick common field names
    const sample = importPreview[mapping[collection]]?.[0] || {};
    const fields: Record<string, string> = {};
    Object.keys(sample).forEach(k => {
      fields[k] = k;
    });
    setMappingFields(prev => ({ ...prev, [collection]: fields }));
  };

  const handleConfirmImport = async () => {
    setImporting(true);
    try {
      const payload = { mapping, mappingFields, preview: importPreview };
      await importAllData(payload as any);
      alert('Import complete');
      if (onImported) await onImported();
      setIsImportModalOpen(false);
    } catch (e: any) {
      alert('Import failed: ' + (e.message || String(e)));
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold">Auto-refresh</h3>
        <div className="mt-2">
          <select value={String(autoRefreshInterval || 0)} onChange={(e) => setAutoRefreshInterval && setAutoRefreshInterval(Number(e.target.value))} className="p-2 border rounded w-48">
            <option value="0">Off</option>
            <option value="3000">3 seconds</option>
            <option value="5000">5 seconds</option>
            <option value="10000">10 seconds</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">Controls simulation and preview auto-updates.</p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold">Admin Access</h3>
        <div className="mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!isAdmin} onChange={(e) => setIsAdmin && setIsAdmin(e.target.checked)} />
            <span className="text-xs">Grant admin privileges (enables import)</span>
          </label>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold">Data Import</h3>
        <p className="text-sm text-gray-500 mt-2">Upload or paste JSON files to map and import data into the system.</p>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => setIsImportModalOpen(true)} variant="primary" disabled={!isAdmin}>
            <DownloadIcon className="w-4 h-4 mr-2" />
            {isAdmin ? 'Import Data' : 'Import (admin)'}
          </Button>
          <Button onClick={() => { setImportText(''); setDetectedArrays([]); setImportPreview({}); setMapping({ companies: 'None', oee: 'None', production: 'None', maintenance: 'None', inventory_raw: 'None', inventory_finished: 'None' }); }} variant="secondary">Clear</Button>
        </div>
      </section>

      <Modal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} title={`Import / Preview Data`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload JSON file</label>
            <input type="file" accept="application/json" onChange={(e) => handleFileInput(e.target.files ? e.target.files[0] : null)} className="mt-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Or paste JSON</label>
            <textarea value={importText} onChange={(e) => setImportText(e.target.value)} rows={6} className="mt-2 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
          </div>
          <div className="flex gap-2">
            <Button onClick={detectArrays} variant="secondary">Detect Arrays</Button>
            <Button onClick={() => { setImportText(''); setDetectedArrays([]); setImportPreview({}); setMapping({ companies: 'None', oee: 'None', production: 'None', maintenance: 'None', inventory_raw: 'None', inventory_finished: 'None' }); }}>Clear</Button>
          </div>

          {detectedArrays.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600">Detected arrays (choose which maps to each collection)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* For brevity reuse simple mapping UI; full mapping similar to Dashboard implementation */}
                {detectedArrays.map(a => (
                  <div key={a.path} className="text-xs bg-gray-50 p-2 rounded">{a.path}</div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsImportModalOpen(false)} className="mr-2">Cancel</Button>
            <Button type="button" onClick={handleConfirmImport} disabled={importing}>{importing ? 'Importing…' : 'Import Selected'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsView;
