import React from 'react';
import Card from '../../components/common/UI/Card';
import Badge from '../../components/common/UI/Badge';
import { Users, Layers, UserCheck, AlertCircle, AlertTriangle } from 'lucide-react';

// Mock Data
const STATS = [
    { label: 'Total Batches', value: 12, icon: Layers, color: 'text-blue-500' },
    { label: 'Active Projects', value: 48, icon: Users, color: 'text-green-500' },
    { label: 'Guides Available', value: 15, icon: UserCheck, color: 'text-purple-500' },
    { label: 'Pending Allocations', value: 7, icon: AlertCircle, color: 'text-orange-500' },
];

const AT_RISK_PROJECTS = [
    { id: '1', groupName: 'Team Alpha', project: 'E-Commerce Platform', daysOverdue: 5 },
    { id: '2', groupName: 'Team Beta', project: 'Hospital Management', daysOverdue: 3 },
    { id: '3', groupName: 'Team Gamma', project: 'Student Portal', daysOverdue: 7 },
    { id: '4', groupName: 'Team Delta', project: 'Library System', daysOverdue: 2 },
];

const CoordinatorDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Coordinator Dashboard</h1>
                <p className="text-[rgb(var(--color-muted))] mt-1">Overview of all batches and projects</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat) => (
                    <Card key={stat.label}>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-[rgb(var(--color-muted))]">{stat.label}</div>
                                <div className="text-3xl font-bold mt-1">{stat.value}</div>
                            </div>
                            <div className={`${stat.color}`}>
                                <stat.icon size={32} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* At-Risk Projects */}
            <Card>
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="text-red-500" size={20} />
                    <h2 className="text-lg font-semibold">At-Risk Projects</h2>
                </div>
                <p className="text-sm text-[rgb(var(--color-muted))] mb-4">
                    Groups that have missed their milestone deadlines
                </p>
                <div className="space-y-3">
                    {AT_RISK_PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800"
                        >
                            <div>
                                <div className="font-medium">{project.groupName}</div>
                                <div className="text-sm text-[rgb(var(--color-muted))]">{project.project}</div>
                            </div>
                            <Badge variant="danger">{project.daysOverdue} days overdue</Badge>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default CoordinatorDashboard;
