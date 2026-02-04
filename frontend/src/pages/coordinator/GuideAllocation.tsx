import React, { useState } from 'react';
import Card from '../../components/common/UI/Card';
import Table from '../../components/common/UI/Table';
import Button from '../../components/common/UI/Button';
import Badge from '../../components/common/UI/Badge';
import Modal from '../../components/common/UI/Modal';
import Select from '../../components/common/UI/Select';
import Label from '../../components/common/UI/Label';

// Mock Data
const GUIDES = [
    { id: 'g1', name: 'Dr. Sarah Johnson' },
    { id: 'g2', name: 'Prof. Michael Chen' },
    { id: 'g3', name: 'Dr. Emily Williams' },
    { id: 'g4', name: 'Prof. David Brown' },
    { id: 'g5', name: 'Dr. Lisa Anderson' },
];

interface Group {
    id: string;
    groupName: string;
    projectTitle: string;
    domain: string;
    guideId: string | null;
    guideName: string | null;
}

const initialGroups: Group[] = [
    { id: '1', groupName: 'Team Alpha', projectTitle: 'E-Commerce Platform', domain: 'Web Development', guideId: 'g1', guideName: 'Dr. Sarah Johnson' },
    { id: '2', groupName: 'Team Beta', projectTitle: 'Hospital Management', domain: 'Healthcare IT', guideId: null, guideName: null },
    { id: '3', groupName: 'Team Gamma', projectTitle: 'Student Portal', domain: 'Education Tech', guideId: 'g2', guideName: 'Prof. Michael Chen' },
    { id: '4', groupName: 'Team Delta', projectTitle: 'Library System', domain: 'Database Systems', guideId: null, guideName: null },
    { id: '5', groupName: 'Team Epsilon', projectTitle: 'IoT Dashboard', domain: 'IoT', guideId: null, guideName: null },
];

const GuideAllocation: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>(initialGroups);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [selectedGuideId, setSelectedGuideId] = useState('');

    const openModal = (group: Group) => {
        setSelectedGroup(group);
        setSelectedGuideId(group.guideId || '');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGroup(null);
        setSelectedGuideId('');
    };

    const handleConfirmAllocation = () => {
        if (!selectedGroup || !selectedGuideId) return;

        const guide = GUIDES.find(g => g.id === selectedGuideId);
        if (!guide) return;

        setGroups(prev =>
            prev.map(g =>
                g.id === selectedGroup.id
                    ? { ...g, guideId: guide.id, guideName: guide.name }
                    : g
            )
        );

        closeModal();
    };

    const tableHeaders = ['Group Name', 'Project Title', 'Domain', 'Current Guide', 'Action'];

    const tableRows = groups.map(group => [
        <span className="font-medium">{group.groupName}</span>,
        group.projectTitle,
        <Badge variant="default">{group.domain}</Badge>,
        group.guideName ? (
            <span className="text-green-600 dark:text-green-400">{group.guideName}</span>
        ) : (
            <Badge variant="warning">Unassigned</Badge>
        ),
        <Button variant="outline" onClick={() => openModal(group)}>
            {group.guideId ? 'Change' : 'Assign'}
        </Button>,
    ]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Guide Allocation</h1>
                <p className="text-[rgb(var(--color-muted))] mt-1">Assign faculty guides to student groups</p>
            </div>

            {/* Table */}
            <Card>
                <Table headers={tableHeaders} rows={tableRows} />
            </Card>

            {/* Allocation Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={`Assign Guide to ${selectedGroup?.groupName || ''}`}
            >
                <div className="space-y-4">
                    <div>
                        <div className="text-sm text-[rgb(var(--color-muted))] mb-2">Project</div>
                        <div className="font-medium">{selectedGroup?.projectTitle}</div>
                    </div>

                    <div>
                        <Label htmlFor="guide-select">Select Guide</Label>
                        <Select
                            id="guide-select"
                            value={selectedGuideId}
                            onChange={(e) => setSelectedGuideId(e.target.value)}
                        >
                            <option value="">-- Select a Guide --</option>
                            {GUIDES.map(guide => (
                                <option key={guide.id} value={guide.id}>{guide.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={closeModal}>Cancel</Button>
                        <Button
                            variant="primary"
                            onClick={handleConfirmAllocation}
                            disabled={!selectedGuideId}
                        >
                            Confirm Allocation
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default GuideAllocation;
