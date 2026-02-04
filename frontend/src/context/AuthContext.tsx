/**
 * =========================================
 * DEV MODE: Mock Authentication Context
 * =========================================
 * 
 * To switch user roles for testing, change the 'MOCK_ROLE' value below:
 * 
 *   'student'      → Student Dashboard, Topic Submission, Task Board, Documents
 *   'guide'        → Guide Dashboard, Project Requests, My Groups
 *   'coordinator'  → Coordinator Dashboard, Guide Allocation, Rubric Builder
 * 
 * After changing, save the file and the app will hot-reload with the new role.
 * =========================================
 */

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

// ╔════════════════════════════════════════════════════════════╗
// ║  CHANGE THIS TO TEST DIFFERENT USER ROLES                 ║
// ║  Options: 'student' | 'guide' | 'coordinator'             ║
// ╚════════════════════════════════════════════════════════════╝
const MOCK_ROLE: 'student' | 'guide' | 'coordinator' = 'student';

// Role to dashboard path mapping
const ROLE_DASHBOARDS: Record<string, string> = {
    student: '/student/dashboard',
    guide: '/guide/dashboard',
    coordinator: '/coordinator/dashboard',
};

// Mock user data based on role
const MOCK_USERS: Record<string, User> = {
    student: {
        id: 'student-123',
        name: 'John Student',
        email: 'john.student@example.com',
        role: 'student',
        picture: 'https://ui-avatars.com/api/?name=John+Student&background=3b82f6&color=fff'
    },
    guide: {
        id: 'guide-456',
        name: 'Dr. Sarah Guide',
        email: 'sarah.guide@example.com',
        role: 'guide',
        picture: 'https://ui-avatars.com/api/?name=Sarah+Guide&background=8b5cf6&color=fff'
    },
    coordinator: {
        id: 'coord-789',
        name: 'Prof. Mike Coordinator',
        email: 'mike.coordinator@example.com',
        role: 'coordinator',
        picture: 'https://ui-avatars.com/api/?name=Mike+Coordinator&background=f59e0b&color=fff'
    },
};

interface AuthContextType {
    user: User | null;
    loginWithGoogle: () => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(MOCK_USERS[MOCK_ROLE]);
    const [isLoading] = useState(false);
    const navigate = useNavigate();

    // Mock login function - navigates to the appropriate dashboard based on role
    const loginWithGoogle = () => {
        const mockUser = MOCK_USERS[MOCK_ROLE];
        setUser(mockUser);
        navigate(ROLE_DASHBOARDS[mockUser.role] || '/dashboard');
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};