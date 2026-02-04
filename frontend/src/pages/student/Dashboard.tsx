import React, { useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/UI/Card';
import Button from '../../components/common/UI/Button';
import Badge from '../../components/common/UI/Badge';
import { Clock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

// Mock Data
const MOCK_DATA = {
  pendingTasks: 4,
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Building a full-stack e-commerce solution with React and Node.js',
      progress: 65,
    },
  ],
  milestones: [
    { id: '1', title: 'SRS Document', description: 'Complete requirements specification', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
    { id: '2', title: 'Design Review', description: 'UI/UX design approval', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { id: '3', title: 'Prototype Demo', description: 'Working prototype demonstration', date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
  ],
};

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const today = useMemo(() => new Date(), []);
  const formattedDate = today.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

  const upcoming = MOCK_DATA.milestones.filter(m => m.date >= today).slice(0, 3);
  const overallProgress = MOCK_DATA.projects.length ? Math.round(MOCK_DATA.projects.reduce((a, p) => a + p.progress, 0) / MOCK_DATA.projects.length) : 0;

  const badgeFor = (date: Date): { text: string; variant: BadgeVariant } => {
    const days = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 3) return { text: 'Urgent', variant: 'danger' };
    if (days <= 10) return { text: 'Upcoming', variant: 'warning' };
    return { text: 'Planned', variant: 'default' };
  };

  const project = MOCK_DATA.projects[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name ?? 'Student'}</h1>
          <p className="text-[rgb(var(--color-muted))] mt-1">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => logout()}>Logout</Button>
          <Button variant="primary">New Milestone</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[rgb(var(--color-muted))]">Pending Tasks</div>
              <div className="text-2xl font-bold mt-1 flex items-center gap-2">
                {MOCK_DATA.pendingTasks} <CheckCircle size={18} className="text-[rgb(var(--color-primary))]" />
              </div>
            </div>
            <Clock size={28} className="text-[rgb(var(--color-muted))]" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[rgb(var(--color-muted))]">Upcoming Deadlines</div>
              <div className="text-2xl font-bold mt-1 flex items-center gap-2">
                {upcoming.length} <AlertTriangle size={18} className="text-yellow-500" />
              </div>
            </div>
            <FileText size={28} className="text-[rgb(var(--color-muted))]" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[rgb(var(--color-muted))]">Overall Progress</div>
              <div className="text-2xl font-bold mt-1 flex items-center gap-2">
                {overallProgress}% <CheckCircle size={18} className="text-[rgb(var(--color-primary))]" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project Overview */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-[rgb(var(--color-muted))] mt-2">{project.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="primary">Add Update</Button>
                <Button variant="outline">Upload Report</Button>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-sm text-[rgb(var(--color-muted))]">Progress</div>
              <div className="w-full bg-[rgb(var(--color-border))] rounded-md h-3 mt-2 overflow-hidden">
                <div className="h-3 bg-[rgb(var(--color-primary))]" style={{ width: `${project.progress}%` }} />
              </div>
              <div className="text-sm mt-2">{project.progress}% complete</div>
            </div>
          </Card>
        </div>

        {/* Upcoming Milestones */}
        <Card>
          <h4 className="font-semibold mb-4">Upcoming Milestones</h4>
          <div className="space-y-3">
            {upcoming.map(m => {
              const b = badgeFor(m.date);
              return (
                <div key={m.id} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{m.title}</div>
                    <div className="text-[rgb(var(--color-muted))] text-sm">{m.description}</div>
                    <div className="text-[rgb(var(--color-muted))] text-xs mt-1">{m.date.toLocaleDateString()}</div>
                  </div>
                  <Badge variant={b.variant}>{b.text}</Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
