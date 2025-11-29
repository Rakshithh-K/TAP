import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-2xl backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-all duration-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              🏢 LeaveFlow
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1 bg-white/10 rounded-2xl p-1">
              <Link to="/dashboard" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                <span>📊</span>
                <span>Dashboard</span>
              </Link>
              
              {user.role === 'employee' ? (
                <>
                  <Link to="/apply-leave" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                    <span>➕</span>
                    <span>Apply Leave</span>
                  </Link>
                  <Link to="/my-requests" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                    <span>📄</span>
                    <span>My Requests</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/pending-requests" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                    <span>⏳</span>
                    <span>Pending</span>
                  </Link>
                  <Link to="/all-requests" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                    <span>📋</span>
                    <span>All Requests</span>
                  </Link>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-3 ml-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-blue-100 capitalize">{user.role}</p>
                </div>
              </div>
              
              <Link to="/profile" className="p-2 rounded-xl hover:bg-white/20 transition-all duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              
              <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-red-500/20 transition-all duration-300 text-red-200 hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;