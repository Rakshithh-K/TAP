import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/leaves/all');
      console.log('Fetched requests:', data);
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setError(error.response?.data?.message || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  if (loading) {
    return <div className="p-6">Loading requests...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
          <button 
            onClick={fetchRequests}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              📋 All Leave Requests
            </h1>
            <p className="text-gray-600">Manage and review all employee leave requests ({requests.length} total)</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <select
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">📋 All Requests</option>
              <option value="pending">⏳ Pending</option>
              <option value="approved">✅ Approved</option>
              <option value="rejected">❌ Rejected</option>
            </select>
          </div>
        </div>
      
        {filteredRequests.length === 0 ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12 text-center rounded-2xl border border-blue-200">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">No leave requests found</p>
            <p className="text-gray-500">Try adjusting your filter or check back later.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRequests.map((request) => {
              const statusConfig = {
                pending: { bg: 'from-amber-400 to-orange-500', icon: '⏳', text: 'Pending Review' },
                approved: { bg: 'from-green-400 to-emerald-500', icon: '✅', text: 'Approved' },
                rejected: { bg: 'from-red-400 to-pink-500', icon: '❌', text: 'Rejected' }
              };
              const config = statusConfig[request.status] || statusConfig.pending;
              
              return (
                <div key={request._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {request.userId?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.userId?.name || 'Unknown User'}
                          </h3>
                          <p className="text-sm text-gray-500">{request.userId?.email || 'No email'}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${config.bg} text-white text-sm font-semibold flex items-center space-x-1`}>
                        <span>{config.icon}</span>
                        <span>{config.text}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">
                            {request.leaveType === 'sick' ? '🤒' : 
                             request.leaveType === 'casual' ? '☕' : '🏖️'}
                          </span>
                          <div>
                            <p className="text-sm text-gray-500">Leave Type</p>
                            <p className="font-semibold capitalize">{request.leaveType} Leave</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">📅</span>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-semibold">
                              {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">⏱️</span>
                          <div>
                            <p className="text-sm text-gray-500">Total Days</p>
                            <p className="font-semibold">{request.totalDays} day(s)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Reason:</p>
                      <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{request.reason}</p>
                    </div>
                    
                    {request.managerComment && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <p className="text-sm text-gray-500 mb-1">Manager Comment:</p>
                        <p className="text-gray-700">{request.managerComment}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400">
                        Submitted on {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;