import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Trello,
  FolderOpen,
  FileCheck,
  UserPlus,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Users,
  MessageSquare,
  Video,
  Calendar,
  User,
  Settings,
  LogOut,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, collapsed }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-100'
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    title={collapsed ? label : undefined}
  >
    {icon}
    {!collapsed && <span>{label}</span>}
  </Link>
);

// Define all navigation links by role
const STUDENT_LINKS = [
  { to: '/student/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/student/submit-topic', label: 'Submit Topic', icon: <PlusCircle size={18} /> },
  { to: '/student/tasks', label: 'Task Board', icon: <Trello size={18} /> },
  { to: '/student/documents', label: 'Documents', icon: <FolderOpen size={18} /> },
  { to: '/student/chat', label: 'Chat', icon: <MessageSquare size={18} /> },
  { to: '/student/meetings', label: 'Meetings', icon: <Video size={18} /> },
];

const GUIDE_LINKS = [
  { to: '/guide/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/guide/requests', label: 'Project Requests', icon: <FileCheck size={18} /> },
  { to: '/guide/groups', label: 'My Groups', icon: <Users size={18} /> },
  { to: '/guide/chat', label: 'Messages', icon: <MessageSquare size={18} /> },
  { to: '/guide/meetings', label: 'Schedule', icon: <Calendar size={18} /> },
];

const COORDINATOR_LINKS = [
  { to: '/coordinator/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/coordinator/allocation', label: 'Guide Allocation', icon: <UserPlus size={18} /> },
  { to: '/coordinator/rubrics', label: 'Rubric Builder', icon: <ClipboardList size={18} /> },
];

// Role labels for display
const ROLE_LABELS: Record<string, string> = {
  student: 'Student Portal',
  guide: 'Guide Portal',
  coordinator: 'Coordinator Portal',
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine the active role based on URL path OR user role
  const activeRole = useMemo(() => {
    const path = location.pathname;

    // First, check URL path to determine context
    if (path.startsWith('/student')) return 'student';
    if (path.startsWith('/guide')) return 'guide';
    if (path.startsWith('/coordinator')) return 'coordinator';

    // Fall back to user's assigned role
    return user?.role || 'student';
  }, [location.pathname, user?.role]);

  // Get the appropriate links based on active role
  const links = useMemo(() => {
    switch (activeRole) {
      case 'guide':
        return GUIDE_LINKS;
      case 'coordinator':
        return COORDINATOR_LINKS;
      case 'student':
      default:
        return STUDENT_LINKS;
    }
  }, [activeRole]);

  // Get role label for header
  const roleLabel = ROLE_LABELS[activeRole] || 'APMS';

  const handleEditProfile = () => {
    setShowProfileMenu(false);
    navigate(`/${activeRole}/profile`);
  };

  const handleSettings = () => {
    setShowProfileMenu(false);
    navigate(`/${activeRole}/settings`);
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
  };

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-64'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg">APMS</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{roleLabel}</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map(link => (
          <NavItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isActive={location.pathname === link.to || location.pathname.startsWith(link.to + '/')}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* User Info with Dropdown */}
      {user && (
        <div ref={profileMenuRef} className="relative p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${collapsed ? 'justify-center' : ''
              }`}
          >
            <img
              src={user.picture || `https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
              className="w-9 h-9 rounded-full flex-shrink-0"
            />
            {!collapsed && (
              <>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="text-sm font-medium truncate">{user.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</div>
                </div>
                <MoreVertical size={16} className="text-gray-400 flex-shrink-0" />
              </>
            )}
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className={`absolute ${collapsed ? 'left-16' : 'left-3 right-3'} bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden`}>
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center gap-3">
                  <img
                    src={user.picture || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="overflow-hidden">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleEditProfile}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <User size={18} className="text-gray-500" />
                  <span className="text-sm">Edit Profile</span>
                </button>
                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <Settings size={18} className="text-gray-500" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;