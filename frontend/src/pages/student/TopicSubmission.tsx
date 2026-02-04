import React, { useState } from 'react';
import Card from '../../components/common/UI/Card';
import Input from '../../components/common/UI/Input';
import Textarea from '../../components/common/UI/Textarea';
import Select from '../../components/common/UI/Select';
import Button from '../../components/common/UI/Button';
import { useAuth } from '../../hooks/useAuth';

const DOMAINS = ['Web Development', 'AI/ML', 'IoT', 'Blockchain'] as const;

const TopicSubmission: React.FC = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState<typeof DOMAINS[number]>('Web Development');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const payload = { title, domain, description, team, submittedBy: user?.email ?? user?.name };
    console.log('Submitting proposal', payload);
    setTimeout(() => {
      setLoading(false);
      alert('Proposal Submitted!');
    }, 800);
  };

  return (
    <div className="flex items-center justify-center py-10">
      <Card>
        <div className="max-w-2xl w-full">
          <h2 className="text-xl font-semibold mb-2">Project Topic Submission</h2>
          <p className="text-[rgb(var(--color-muted))] text-sm mb-4">Submit your project proposal for review{user?.name ? ` — ${user.name}` : ''}.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input label="Project Title" value={title} onChange={e => setTitle(e.target.value)} required />

            <Select label="Domain" value={domain} onChange={e => setDomain(e.target.value as any)}>
              {DOMAINS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>

            <Textarea label="Description" rows={4} value={description} onChange={e => setDescription(e.target.value)} required />

            <Input label="Team Members" placeholder="Enter names separated by commas" value={team} onChange={e => setTeam(e.target.value)} />

            <div className="flex items-center justify-end">
              <Button variant="primary" type="submit" loading={loading}>Submit Proposal</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default TopicSubmission;
