import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Briefcase, Save } from 'lucide-react';
import Card from '../../components/common/UI/Card';
import Button from '../../components/common/UI/Button';
import Input from '../../components/common/UI/Input';
import Textarea from '../../components/common/UI/Textarea';
import { useAuth } from '../../hooks/useAuth';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+91 98765 43210',
        department: 'Computer Science',
        bio: 'Passionate about building innovative solutions and learning new technologies.',
        location: 'University Campus',
    });

    const handleSave = () => {
        console.log('Saving profile:', formData);
        setIsEditing(false);
        // In a real app, this would make an API call
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage your personal information and preferences
                </p>
            </div>

            {/* Profile Card */}
            <Card>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}&size=128&background=6366f1&color=fff`}
                                alt={user?.name}
                                className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-100 dark:ring-gray-700"
                            />
                            <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg">
                                <Camera size={18} />
                            </button>
                        </div>
                        <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
                        <span className="inline-block mt-1 px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full capitalize">
                            {user?.role}
                        </span>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <Button
                                variant={isEditing ? 'primary' : 'outline'}
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            >
                                {isEditing ? (
                                    <>
                                        <Save size={16} className="mr-2" /> Save Changes
                                    </>
                                ) : (
                                    'Edit Profile'
                                )}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <Input
                                        value={formData.name}
                                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                ) : (
                                    <p className="text-base">{formData.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Email
                                </label>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-gray-400" />
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    ) : (
                                        <p className="text-base">{formData.email}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Phone
                                </label>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-gray-400" />
                                    {isEditing ? (
                                        <Input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    ) : (
                                        <p className="text-base">{formData.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Department
                                </label>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={16} className="text-gray-400" />
                                    {isEditing ? (
                                        <Input
                                            value={formData.department}
                                            onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
                                        />
                                    ) : (
                                        <p className="text-base">{formData.department}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Location
                                </label>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-400" />
                                    {isEditing ? (
                                        <Input
                                            value={formData.location}
                                            onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        />
                                    ) : (
                                        <p className="text-base">{formData.location}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Bio
                            </label>
                            {isEditing ? (
                                <Textarea
                                    rows={3}
                                    value={formData.bio}
                                    onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                />
                            ) : (
                                <p className="text-base text-gray-600 dark:text-gray-300">{formData.bio}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Additional Settings */}
            <Card>
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Receive email updates about your projects
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                        <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Get notified about deadlines and messages
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-red-600 dark:text-red-400">Delete Account</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Permanently delete your account and all data
                            </p>
                        </div>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                            Delete
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
