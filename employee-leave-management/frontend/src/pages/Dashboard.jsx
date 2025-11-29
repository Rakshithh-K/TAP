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

  if (!stats) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your {user?.role === 'manager' ? 'team' : 'leave requests'} today.</p>
        </div>
      
        {user?.role === 'employee' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">🌡️ Leave Balance</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white/20 rounded-lg p-2">
                  <span>🤒 Sick:</span>
                  <span className="font-bold">{stats.leaveBalance?.sickLeave} days</span>
                </div>
                <div className="flex justify-between items-center bg-white/20 rounded-lg p-2">
                  <span>☕ Casual:</span>
                  <span className="font-bold">{stats.leaveBalance?.casualLeave} days</span>
                </div>
                <div className="flex justify-between items-center bg-white/20 rounded-lg p-2">
                  <span>🏖️ Vacation:</span>
                  <span className="font-bold">{stats.leaveBalance?.vacation} days</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">📄 Total Requests</h3>
              </div>
              <p className="text-4xl font-bold">{stats.totalRequests}</p>
              <p className="text-blue-100 text-sm mt-2">All time requests</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">⏳ Pending</h3>
              </div>
              <p className="text-4xl font-bold">{stats.pendingRequests}</p>
              <p className="text-orange-100 text-sm mt-2">Awaiting approval</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">✅ Approved</h3>
              </div>
              <p className="text-4xl font-bold">{stats.approvedRequests}</p>
              <p className="text-green-100 text-sm mt-2">Successfully approved</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">👥 Team Size</h3>
              </div>
              <p className="text-4xl font-bold">{stats.totalEmployees}</p>
              <p className="text-indigo-100 text-sm mt-2">Active employees</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-400 to-slate-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">📄 All Requests</h3>
              </div>
              <p className="text-4xl font-bold">{stats.totalRequests}</p>
              <p className="text-slate-100 text-sm mt-2">Total submissions</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">⏳ Pending</h3>
              </div>
              <p className="text-4xl font-bold">{stats.pendingRequests}</p>
              <p className="text-orange-100 text-sm mt-2">Need your review</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">✅ Approved</h3>
              </div>
              <p className="text-4xl font-bold">{stats.approvedRequests}</p>
              <p className="text-green-100 text-sm mt-2">Successfully approved</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">❌ Rejected</h3>
              </div>
              <p className="text-4xl font-bold">{stats.rejectedRequests}</p>
              <p className="text-red-100 text-sm mt-2">Declined requests</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;