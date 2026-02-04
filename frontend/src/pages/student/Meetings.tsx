import React, { useState } from 'react';
import { Video, Calendar, Clock, ExternalLink, Plus } from 'lucide-react';
import Card from '../../components/common/UI/Card';
import Button from '../../components/common/UI/Button';
import Badge from '../../components/common/UI/Badge';
import Modal from '../../components/common/UI/Modal';
import Input from '../../components/common/UI/Input';
import Textarea from '../../components/common/UI/Textarea';

interface Meeting {
    id: string;
    title: string;
    date: string;
    time: string;
    duration: string;
    agenda: string;
    meetLink: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    guide: {
        name: string;
        picture: string;
    };
}

const initialMeetings: Meeting[] = [
    {
        id: '1',
        title: 'Project Review - SRS Discussion',
        date: '2026-02-05',
        time: '10:00 AM',
        duration: '45 mins',
        agenda: 'Review the SRS document, discuss use case diagrams, and finalize database schema.',
        meetLink: 'https://meet.google.com/abc-defg-hij',
        status: 'upcoming',
        guide: {
            name: 'Dr. Sarah Johnson',
            picture: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
        },
    },
    {
        id: '2',
        title: 'Prototype Demo',
        date: '2026-02-10',
        time: '2:00 PM',
        duration: '1 hour',
        agenda: 'Demonstrate the working prototype and gather feedback on UI/UX.',
        meetLink: 'https://meet.google.com/xyz-uvwx-rst',
        status: 'upcoming',
        guide: {
            name: 'Dr. Sarah Johnson',
            picture: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
        },
    },
    {
        id: '3',
        title: 'Initial Kickoff Meeting',
        date: '2026-01-20',
        time: '11:00 AM',
        duration: '30 mins',
        agenda: 'Introduction and project scope discussion.',
        meetLink: 'https://meet.google.com/old-meet-link',
        status: 'completed',
        guide: {
            name: 'Dr. Sarah Johnson',
            picture: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
        },
    },
];

const Meetings: React.FC = () => {
    const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        agenda: '',
    });

    const upcomingMeetings = meetings.filter(m => m.status === 'upcoming');
    const pastMeetings = meetings.filter(m => m.status !== 'upcoming');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newMeeting: Meeting = {
            id: Date.now().toString(),
            title: formData.title || 'Meeting Request',
            date: formData.date,
            time: formData.time,
            duration: '30 mins',
            agenda: formData.agenda,
            meetLink: '',
            status: 'upcoming',
            guide: {
                name: 'Dr. Sarah Johnson',
                picture: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
            },
        };

        setMeetings(prev => [newMeeting, ...prev]);
        setFormData({ title: '', date: '', time: '', agenda: '' });
        setIsModalOpen(false);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const MeetingCard = ({ meeting }: { meeting: Meeting }) => (
        <Card>
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${meeting.status === 'upcoming' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <Video size={24} className={meeting.status === 'upcoming' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">{meeting.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {formatDate(meeting.date)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {meeting.time} ({meeting.duration})
                            </span>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{meeting.agenda}</p>

                        <div className="flex items-center gap-3 mt-4">
                            <img
                                src={meeting.guide.picture}
                                alt={meeting.guide.name}
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">with {meeting.guide.name}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Badge variant={meeting.status === 'upcoming' ? 'success' : 'default'}>
                        {meeting.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </Badge>
                    {meeting.status === 'upcoming' && meeting.meetLink && (
                        <a
                            href={meeting.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
                        >
                            Join Meet <ExternalLink size={14} />
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Meetings</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Schedule and manage meetings with your guide</p>
                </div>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} className="mr-2" /> Request Meeting
                </Button>
            </div>

            {/* Upcoming Meetings */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Upcoming Meetings ({upcomingMeetings.length})</h2>
                {upcomingMeetings.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingMeetings.map(meeting => (
                            <MeetingCard key={meeting.id} meeting={meeting} />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                            No upcoming meetings. Request a meeting with your guide.
                        </p>
                    </Card>
                )}
            </div>

            {/* Past Meetings */}
            {pastMeetings.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Past Meetings</h2>
                    <div className="space-y-4">
                        {pastMeetings.map(meeting => (
                            <MeetingCard key={meeting.id} meeting={meeting} />
                        ))}
                    </div>
                </div>
            )}

            {/* Request Meeting Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request Meeting">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Meeting Title"
                        placeholder="e.g., Project Review"
                        value={formData.title}
                        onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Preferred Date"
                            type="date"
                            value={formData.date}
                            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            required
                        />
                        <Input
                            label="Preferred Time"
                            type="time"
                            value={formData.time}
                            onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
                            required
                        />
                    </div>

                    <Textarea
                        label="Agenda / Discussion Points"
                        placeholder="What would you like to discuss?"
                        rows={4}
                        value={formData.agenda}
                        onChange={e => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Send Request
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Meetings;
