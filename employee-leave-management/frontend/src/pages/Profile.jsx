import React, { useState, useEffect } from 'react';
import useUserStore from '../store/userStore';
import api from '../utils/api';

const Profile = () => {
  const { user } = useUserStore();
  const [leaveBalance, setLeaveBalance] = useState(null);

  useEffect(() => {
    if (user?.role === 'employee') {
      fetchLeaveBalance();
    }
  }, [user]);

  const fetchLeaveBalance = async () => {
    try {
      const { data } = await api.get('/leaves/balance');
      setLeaveBalance(data);
    } catch (error) {
      console.error('Failed to fetch leave balance:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <p className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</p>
          </div>
          
          {user?.role === 'employee' && leaveBalance && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave Balance</label>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sick Leave:</span>
                  <span className="font-semibold">{leaveBalance.sickLeave}</span>
                </div>
                <div className="flex justify-between">
                  <span>Casual Leave:</span>
                  <span className="font-semibold">{leaveBalance.casualLeave}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vacation:</span>
                  <span className="font-semibold">{leaveBalance.vacation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;