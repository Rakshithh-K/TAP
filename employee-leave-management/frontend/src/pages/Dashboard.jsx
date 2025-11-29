import React, { useState, useEffect } from 'react';
import useUserStore from '../store/userStore';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useUserStore();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoint = user?.role === 'manager' ? '/dashboard/manager' : '/dashboard/employee';
        const { data } = await api.get(endpoint);
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, [user]);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {user?.role === 'employee' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Leave Balance</h3>
            <div className="space-y-1">
              <p>Sick: {stats.leaveBalance?.sickLeave}</p>
              <p>Casual: {stats.leaveBalance?.casualLeave}</p>
              <p>Vacation: {stats.leaveBalance?.vacation}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approvedRequests}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalEmployees}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.totalRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approvedRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">{stats.rejectedRequests}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;