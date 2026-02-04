import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import Card from '../../components/common/UI/Card';
import Button from '../../components/common/UI/Button';
import Badge from '../../components/common/UI/Badge';

interface Message {
    id: string;
    text: string;
    sender: 'student' | 'guide';
    timestamp: Date;
}

// Mock guide data
const GUIDE = {
    id: 'g1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    expertise: ['Web Development', 'AI/ML', 'Cloud Computing'],
    status: 'online' as const,
    picture: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
};

// Mock initial messages
const initialMessages: Message[] = [
    {
        id: '1',
        text: 'Hello! I wanted to discuss the progress on your E-Commerce project.',
        sender: 'guide',
        timestamp: new Date(Date.now() - 3600000 * 2),
    },
    {
        id: '2',
        text: 'Hi Dr. Johnson! Yes, we have completed the authentication module.',
        sender: 'student',
        timestamp: new Date(Date.now() - 3600000 * 1.5),
    },
    {
        id: '3',
        text: 'Great progress! Please submit the SRS document by Friday. Make sure to include the updated use case diagrams.',
        sender: 'guide',
        timestamp: new Date(Date.now() - 3600000),
    },
    {
        id: '4',
        text: 'We are also reviewing your prototype. The UI looks clean, but we need to discuss the database schema.',
        sender: 'guide',
        timestamp: new Date(Date.now() - 1800000),
    },
    {
        id: '5',
        text: 'Sure! We will have the SRS ready. Can we schedule a meeting to discuss the database design?',
        sender: 'student',
        timestamp: new Date(Date.now() - 900000),
    },
];

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            sender: 'student',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-[calc(100vh-120px)] flex gap-6">
            {/* Left Column - Guide Profile */}
            <div className="w-80 flex-shrink-0">
                <Card>
                    <div className="text-center mb-6">
                        <img
                            src={GUIDE.picture}
                            alt={GUIDE.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-violet-100 dark:ring-violet-900"
                        />
                        <h2 className="text-xl font-bold">{GUIDE.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{GUIDE.department}</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className={`w-2 h-2 rounded-full ${GUIDE.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{GUIDE.status}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Contact</h3>
                        <p className="text-sm">{GUIDE.email}</p>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {GUIDE.expertise.map(skill => (
                                <Badge key={skill} variant="default">{skill}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <Button variant="outline" className="flex-1">
                            <Phone size={16} className="mr-2" /> Call
                        </Button>
                        <Button variant="outline" className="flex-1">
                            <Video size={16} className="mr-2" /> Video
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Right Column - Chat Interface */}
            <div className="flex-1 flex flex-col">
                <Card className="flex-1 flex flex-col p-0 overflow-hidden">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <img
                                src={GUIDE.picture}
                                alt={GUIDE.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h3 className="font-semibold">{GUIDE.name}</h3>
                                <span className="text-xs text-green-500">Online</span>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <MoreVertical size={20} />
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${message.sender === 'student'
                                            ? 'bg-blue-500 text-white rounded-br-md'
                                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                    <span
                                        className={`text-xs mt-1 block ${message.sender === 'student'
                                                ? 'text-blue-100'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Chat;
