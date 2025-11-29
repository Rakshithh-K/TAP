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
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          Leave Management
        </Link>
        
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
          
          {user.role === 'employee' ? (
            <>
              <Link to="/apply-leave" className="hover:text-indigo-200">Apply Leave</Link>
              <Link to="/my-requests" className="hover:text-indigo-200">My Requests</Link>
            </>
          ) : (
            <>
              <Link to="/pending-requests" className="hover:text-indigo-200">Pending Requests</Link>
              <Link to="/all-requests" className="hover:text-indigo-200">All Requests</Link>
            </>
          )}
          
          <Link to="/profile" className="hover:text-indigo-200">Profile</Link>
          <button onClick={handleLogout} className="hover:text-indigo-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;