import React, { useMemo, useState, useRef } from 'react';
import Card from '../../components/common/UI/Card';
import Button from '../../components/common/UI/Button';
import Badge from '../../components/common/UI/Badge';
import Tabs from '../../components/common/UI/Tabs';
import Modal from '../../components/common/UI/Modal';
import ProgressBar from '../../components/common/UI/ProgressBar';
import { FileText, Download } from 'lucide-react';

type Doc = {
  id: string;
  name: string;
  date: string;
  type: 'SRS' | 'Reports' | 'Diagrams' | 'Other';
  status: 'Approved' | 'Pending' | 'Rejected';
};

const initial: Doc[] = [
  { id: 'd1', name: 'SRS_v1.pdf', date: new Date().toISOString(), type: 'SRS', status: 'Approved' },
  { id: 'd2', name: 'Weekly_Report_1.pdf', date: new Date().toISOString(), type: 'Reports', status: 'Pending' },
  { id: 'd3', name: 'Architecture.drawio', date: new Date().toISOString(), type: 'Diagrams', status: 'Approved' }
];

const CATEGORIES = ['All', 'SRS', 'Reports', 'Diagrams'];

const Documents: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>(initial);
  const [active, setActive] = useState<string>('All');
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<'SRS' | 'Reports' | 'Diagrams' | 'Other'>('SRS');

  const filtered = useMemo(() => {
    if (active === 'All') return docs;
    return docs.filter(d => d.type === active);
  }, [docs, active]);

  const openModal = () => { setOpen(true); setProgress(0); };
  const closeModal = () => { setOpen(false); setUploading(false); setProgress(0); };

  const simulateUpload = (fileName: string) => {
    setUploading(true);
    setProgress(0);
    const start = Date.now();
    const duration = 2000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        // finish
        const newDoc: Doc = { id: `d-${Math.random().toString(36).slice(2,9)}`, name: fileName, date: new Date().toISOString(), type, status: 'Pending' };
        setDocs(prev => [newDoc, ...prev]);
        setTimeout(() => {
          closeModal();
        }, 300);
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  const onUpload = (e?: React.FormEvent) => {
    e?.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return alert('Please select a file');
    simulateUpload(file.name);
  };

  const badgeVariant = (s: Doc['status']) => {
    if (s === 'Approved') return 'success';
    if (s === 'Pending') return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-[rgb(var(--color-muted))]">Manage and upload project documents</p>
        </div>
        <div>
          <Button variant="primary" onClick={openModal}>Upload Document</Button>
        </div>
      </div>

      <Card>
        <Tabs labels={CATEGORIES} active={active} onChange={setActive} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(d => (
            <Card key={d.id}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-[rgb(var(--color-primary))]"><FileText size={28} /></div>
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-[rgb(var(--color-muted))] text-sm">{new Date(d.date).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={badgeVariant(d.status)}>{d.status}</Badge>
                  <button className="p-2 rounded hover:bg-[rgb(var(--color-input))]" aria-label="Download">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Modal isOpen={open} title="Upload Document" onClose={closeModal}>
        <form onSubmit={onUpload} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1 text-[rgb(var(--color-muted))]">File</label>
            <input ref={fileRef} type="file" className="w-full" />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-[rgb(var(--color-muted))]">Type</label>
            <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-[rgb(var(--color-input))] border-[rgb(var(--color-border))] rounded-md px-3 py-2">
              <option value="SRS">SRS</option>
              <option value="Reports">Reports</option>
              <option value="Diagrams">Diagrams</option>
            </select>
          </div>

          {uploading && (
            <div>
              <ProgressBar value={progress} />
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit" loading={uploading}>Upload</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Documents;
