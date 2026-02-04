// src/pages/guide/Dashboard.tsx
import React from 'react';
import { LayoutDashboard, FileCheck, Eye } from 'lucide-react';

import Table from '../../components/common/UI/Table';

const Dashboard = () => {
  // Mock data
  const stats = [
    { title: 'Total Groups', value: '12', icon: <LayoutDashboard className="h-6 w-6" /> },
    { title: 'Pending Approvals', value: '5', icon: <FileCheck className="h-6 w-6" /> },
    { title: 'Upcoming Reviews', value: '3', icon: <Eye className="h-6 w-6" /> },
  ];

  const recentSubmissions = [
    { id: 1, studentName: 'John Doe', projectTitle: 'AI in Healthcare', type: 'Topic', date: '2023-05-15' },
    { id: 2, studentName: 'Jane Smith', projectTitle: 'Blockchain Security', type: 'Doc', date: '2023-05-14' },
    { id: 3, studentName: 'Alex Johnson', projectTitle: 'IoT Smart Home', type: 'Topic', date: '2023-05-13' },
    { id: 4, studentName: 'Sarah Williams', projectTitle: 'ML for Finance', type: 'Doc', date: '2023-05-12' },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Guide Dashboard</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Submissions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Submissions</h2>
        </div>
        <div className="overflow-x-auto">
          <Table headers={['Student Name', 'Project Title', 'Type', 'Date', 'Actions']}>
            {recentSubmissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {submission.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {submission.projectTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${submission.type === 'Topic'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                    {submission.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {submission.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() => console.log('View submission', submission.id)}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;