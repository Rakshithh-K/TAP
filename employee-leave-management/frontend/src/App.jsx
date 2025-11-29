import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApplyLeave from './pages/ApplyLeave';
import MyRequests from './pages/MyRequests';
import PendingRequests from './pages/PendingRequests';
import AllRequests from './pages/AllRequests';
import Profile from './pages/Profile';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/apply-leave" element={
            <ProtectedRoute requiredRole="employee">
              <ApplyLeave />
            </ProtectedRoute>
          } />
          
          <Route path="/my-requests" element={
            <ProtectedRoute requiredRole="employee">
              <MyRequests />
            </ProtectedRoute>
          } />
          
          <Route path="/pending-requests" element={
            <ProtectedRoute requiredRole="manager">
              <PendingRequests />
            </ProtectedRoute>
          } />
          
          <Route path="/all-requests" element={
            <ProtectedRoute requiredRole="manager">
              <AllRequests />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;