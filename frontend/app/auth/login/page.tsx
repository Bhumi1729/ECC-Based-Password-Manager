"use client"

import React, { useState, useEffect, useRef } from 'react';

interface LoginProps {
  onLogin?: (user: any, token: string) => void;
  onGoogleLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin = () => {}, onGoogleLogin = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      console.log('Sending request to:', 'http://localhost:4000/login');
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      console.log('Response received:', response.status, response.statusText);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
      console.log('Token stored, calling onLogin');
      
      // Call the onLogin callback with user data and token
      onLogin(data.user, data.token);
      console.log('onLogin called');
      
      // Display success message
      setSuccessMessage(data.message || 'Login successful!');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // This would be replaced with actual Google auth implementation
    onGoogleLogin();
    setIsLoading(false);
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 p-4 overflow-hidden relative">
      {/* Main content wrapper */}
      <div className="relative z-10 w-full max-w-md">
        {/* Enhanced card with improved contrast and shadow for better visibility */}
        <div className="relative backdrop-blur-xl bg-gray-900/90 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl shadow-cyan-900/30 transform transition-all duration-500 hover:shadow-cyan-700/40">
          {/* Enhanced prismatic border effect */}
          <div className="absolute inset-0 border-2 border-transparent rounded-2xl overflow-hidden">
            <div className="absolute -inset-6 opacity-40 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin-slow blur-xl"></div>
          </div>
          
          {/* Card inner shadow for depth */}
          <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-gray-800 to-black opacity-80"></div>
          
          {/* Card content with enhanced contrast */}
          <div className="relative backdrop-blur-xl p-8">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-100 text-center mb-1">Login</h1>
            <p className="text-gray-200 text-sm text-center mb-6">Enter your credentials</p>
            
            
            {/* Error message */}
            {error && (
              <div className="mb-4 p-2 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            
            {/* Success message */}
            {successMessage && (
              <div className="mb-4 p-2 bg-green-900/50 border border-green-700 rounded-lg text-green-200 text-sm">
                {successMessage}
              </div>
            )}
            {/* Beautifully enhanced Google login button */}
            <div className="mb-6"> {/* Increased margin */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="relative w-full py-3 px-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg text-white font-medium transition-all duration-500 overflow-hidden group flex items-center justify-center shadow-lg shadow-gray-900/60"
              >
                {/* Enhanced hover effects */}
                <span className="absolute w-full h-full inset-0 bg-gradient-to-r from-black/80 via-gray-800/80 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                
                {/* Animated highlight */}
                <span className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <span className="absolute -translate-x-full group-hover:translate-x-full transition-all duration-1000 w-1/2 h-full bg-gradient-to-r from-transparent via-gray-500/10 to-transparent"></span>
                </span>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  {/* Google Icon with subtle glow */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032
                      s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2
                      C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" 
                      fill="white" />
                  </svg>
                  <span className="group-hover:text-cyan-50 transition-colors duration-300">Login with Google</span>
                </span>
              </button>
              
              {/* Elegant separator with animation */}
              <div className="flex items-center my-6"> {/* Increased margin */}
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent group-hover:via-cyan-600 transition-colors duration-300"></div>
                <div className="px-4 text-xs text-gray-200">or</div> {/* Increased padding */}
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent group-hover:via-cyan-600 transition-colors duration-300"></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased spacing */}
              {/* Enhanced email field with beautiful effects */}
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white group-focus-within:text-cyan-200 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="pl-10 pr-3 py-3 w-full text-base text-gray-100 bg-gray-900/50 backdrop-blur-md border-0 border-b-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 group-hover:bg-gray-900/70"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Animated glowing underline */}
                <div className="relative h-0.5 mt-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse opacity-75"></div>
                </div>
              </div>
              
              {/* Enhanced password field with beautiful effects */}
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white group-focus-within:text-cyan-400 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="pl-10 pr-10 py-3 w-full text-base text-gray-200 bg-gray-900/50 backdrop-blur-md border-0 border-b-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 group-hover:bg-gray-900/70"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-cyan-300 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Animated glowing underline */}
                <div className="relative h-0.5 mt-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse opacity-75"></div>
                </div>
              </div>
              
              {/* Enhanced remember me and forgot password options */}
              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center space-x-2 cursor-pointer group select-none">
                  <div className="relative w-4 h-4">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-4 h-4 bg-gray-500 rounded-sm border border-gray-400 peer-checked:bg-gradient-to-br from-blue-500 to-cyan-500 peer-checked:border-0 transition-all duration-300 shadow-md"></div>
                    <div className="absolute top-0 left-0 w-4 h-4 peer-checked:block hidden text-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 text-xs">Remember me</span>
                </label>
                <a href="#" className="text-gray-200 hover:text-white transition-colors duration-100 text-xs relative group">
                  Forgot password?
                  <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-cyan-400 transition-all duration-300"></span>
                </a>
              </div>
              
              {/* Stunning login button with beautiful effects */}
              <div className="pt-3"> {/* Increased top padding */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:from-cyan-700 active:to-blue-700 rounded-lg text-white font-medium shadow-lg shadow-cyan-700/30 transition-all duration-300 overflow-hidden group"
                >
                  {/* Beautiful background animation */}
                  <span className="absolute inset-0 w-full h-full">
                    <span className="absolute w-full h-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  </span>
                  
                  {/* Pulse effect on click */}
                  <span className="absolute w-0 h-0 rounded-full bg-white opacity-30 group-active:w-full group-active:h-full transition-all duration-300 origin-center"></span>
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-base">Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 filter drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <span className="text-base tracking-wide">Access Vault</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
              
              {/* Enhanced fingerprint login button with beautiful animations */}
              <div className="flex items-center justify-center space-x-4 py-3 mt-2">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <button
                  type="button"
                  className="group relative w-12 h-12 rounded-full bg-gray-900/90 hover:bg-gray-900 flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/30 border border-gray-800 hover:border-cyan-700"
                >
                  {/* Multiple pulse animations */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-full animate-ping bg-cyan-600/10 animation-delay-100"></div>
                    <div className="absolute inset-0 rounded-full animate-ping bg-cyan-600/5 animate-ping-slow"></div>
                  </div>
                  
                  {/* Inner glow effect */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon with beautiful glow */}
                  <svg className="w-6 h-6 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300 relative z-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                  </svg>
                </button>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
            </form>
          </div>
        </div>
        
         {/* Enhanced register link */}
         <div className="text-center mt-6 text-sm text-gray-300">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 relative group">
            Register now
            <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-cyan-400 transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;