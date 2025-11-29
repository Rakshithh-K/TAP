import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';
import api from '../utils/api';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const { setAuth } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { userId, email } = location.state || {};

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-otp', { userId, otp });
      setAuth(data.token, data.user);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      await api.post('/auth/resend-otp', { userId });
      alert('OTP sent successfully! Please check your email.');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            📧 Verify Your Email
          </h2>
          <p className="text-blue-100 mb-2">
            We've sent a 6-digit OTP to
          </p>
          <p className="text-white font-semibold">
            {email}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <form className="space-y-6" onSubmit={handleVerifyOTP}>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-center text-2xl font-bold letter-spacing-wide"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 Verifying...' : '✅ Verify Email'}
            </button>
            
            <div className="text-center space-y-3">
              <p className="text-blue-100 text-sm">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resending}
                className="text-white hover:text-blue-200 transition-colors duration-300 underline underline-offset-4 disabled:opacity-50"
              >
                {resending ? '📤 Sending...' : '🔄 Resend OTP'}
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-blue-100 text-xs">
            🕐 OTP expires in 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;