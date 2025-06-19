// LoginPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For animations

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  isLoading?: boolean;
}

const LoginPage: React.FC<LoginFormProps> = ({ onLogin, isLoading = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-12 bg-gray-50 relative overflow-hidden">
      {/* Background Animation Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-[movePattern_15s_linear_infinite]"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 z-10"
      >
        <div className="flex flex-col items-center mb-8">
          {/* Logo with pulsing animation */}
          <div className="w-16 h-16 flex justify-center items-center bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mb-4 animate-pulse">
            <div className="relative w-8 h-8">
              <div className="absolute w-5 h-3.5 bg-white rounded bottom-0 left-1.5"></div>
              <div className="absolute w-3.5 h-3.5 border-3 border-white border-b-0 rounded-t-lg top-0.5 left-2"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">SecureVault</h1>
          <p className="text-sm text-gray-500 mt-1">ECC-Protected Password Manager</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-center mb-6">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">👤</span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                className="w-full py-3 pl-10 pr-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔒</span>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full py-3 pl-10 pr-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </motion.div>

          {isSignUp && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔒</span>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="confirm-password"
                  required
                  placeholder="Confirm your password"
                  className="w-full py-3 pl-10 pr-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center mb-6"
          >
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            type="submit" 
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              isSignUp ? 'Sign Up' : 'Login'
            )}
          </motion.button>

          <div className="text-center mt-6 flex justify-center items-center space-x-2">
            <p className="text-sm text-gray-600">
              {isSignUp 
                ? 'Already have an account?' 
                : 'Don\'t have an account?'}
            </p>
            <button 
              type="button"
              onClick={toggleMode}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium underline focus:outline-none"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-8 bg-indigo-50 py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
          <span className="text-lg">🛡️</span>
          <p className="text-xs text-indigo-700 font-medium">Secured with Elliptic Curve Cryptography</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;