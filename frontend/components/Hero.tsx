"use client"

import React, { useEffect, useState } from 'react';
import { ChevronRight, Lock, Shield, Key, RefreshCw, Fingerprint, Eye, EyeOff, CheckCircle, Database } from 'lucide-react';

const HeroSection = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const fullText = "Zero-Knowledge Security";
  const demoPassword = "•••••••••••••";
  
  useEffect(() => {
    let index = 0;
    const textInterval = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.substring(0, index));
        index++;
      } else {
        setTimeout(() => {
          setAnimatedText("");
          index = 0;
        }, 1000);
      }
    }, 100);
    
    // Toggle password visibility every 3 seconds
    const passwordInterval = setInterval(() => {
      setShowPassword(prev => !prev);
    }, 3000);
    
    return () => {
      clearInterval(textInterval);
      clearInterval(passwordInterval);
    };
  }, []);
  
  return (
    
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-70"></div>
      
      {/* Animated ECC curve lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path 
          d="M0,50 Q25,10 50,50 T100,50" 
          stroke="rgba(59, 130, 246, 0.8)" 
          strokeWidth="0.5" 
          fill="none"
          className="animate-pulse"
        />
        <path 
          d="M0,60 Q35,30 50,60 T100,60" 
          stroke="rgba(139, 92, 246, 0.6)" 
          strokeWidth="0.5" 
          fill="none"
          className="animate-pulse-slow"
        />
      </svg>
      
      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-2 pb-3 pt-4.5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-white space-y-6">
            {/* <div className="flex items-center space-x-2">
              <Lock className="text-blue-500 animate-pulse" />
              <h2 className="text-blue-400 font-mono tracking-wider text-sm">FORTIFY VAULT</h2>
            </div> */}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Secure Your Digital Life With
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {animatedText}<span className="animate-pulse">|</span>
              </span>
            </h1>
            
            <p className="text-gray-400 text-m md:text-l max-w-lg">
              Military-grade encryption based on Elliptic Curve Cryptography. Your passwords are protected even from us.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-all duration-300 flex items-center justify-center group">
                Get Started
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-3 bg-transparent border border-gray-700 hover:border-blue-500 rounded-md font-medium transition-all duration-300 text-gray-300">
                Learn More
              </button>
            </div>
            
            
          </div>
          
          {/* Password Vault Visualization - With glowing effects instead of rotation */}
          <div className="relative w-full h-80 md:h-full flex items-center justify-center">
  {/* Main vault container */}
  <div className="relative w-[420px] md:w-[470px] h-[500px] mx-auto ">
    {/* Vault background with subtle hover effect and glow */}
    <div className="absolute inset-0 rounded-2xl shadow-2xl transition-all duration-700 animate-pulse-glow">
      {/* Animated border glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 animate-border-glow"></div>
      
      {/* Vault main content */}
      <div className="relative rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 h-full transition-all duration-500 hover:shadow-glow">
        {/* Vault door seams with animated highlights */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 animate-shimmer-x"></div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gray-800 via-purple-600 to-gray-800 animate-shimmer-x-reverse"></div>
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gray-800 via-blue-600 to-gray-800 animate-shimmer-y"></div>
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-gray-800 via-purple-600 to-gray-800 animate-shimmer-y-reverse"></div>
        
        {/* Vault door contents - Using flex to fill the space */}
        <div className="absolute inset-0 flex flex-col p-8">
          {/* Vault header with fingerprint scanner */}
          <div className="flex items-center justify-between mb-5">
            <div className="text-blue-400 font-mono text-lg">SECURE VAULT</div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
              <Fingerprint className="text-blue-400 w-8 h-8 animate-pulse" />
            </div>
          </div>
          
          {/* Password entries section - Flexible space */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Password entry item 1 - with hover effect */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 relative overflow-hidden transform transition-all hover:scale-105 hover:border-blue-500 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 rounded p-1">
                      <Database className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-gray-300">Banking App</div>
                      <div className="text-gray-500 text-sm">secure.bank.com</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2 font-mono text-gray-400">
                  {showPassword ? "P@ssw0rd!2023" : demoPassword}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="text-green-500 w-4 h-4" />
                    <span className="text-green-500 text-xs">Strong</span>
                  </div>
                  <div className="text-gray-500 text-xs">Updated 2 days ago</div>
                </div>
              </div>
              
              {/* Password entry item 2 with subtle hover animation */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 relative transition-all hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-500 rounded p-1">
                      <Lock className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-gray-300">Email</div>
                      <div className="text-gray-500 text-sm">mail.service.com</div>
                    </div>
                  </div>
                  <button className="text-gray-400">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 font-mono text-gray-400">
                  {demoPassword}
                </div>
              </div>
            </div>
            
            {/* Vault security indicators with animation - Positioned at the bottom */}
            <div className="mt-auto pt-3 bg-gray-900 rounded-lg p-3 border border-gray-800 relative overflow-hidden">
              {/* Animated security scan line */}
              <div className="absolute left-0 top-0 w-full h-full opacity-10">
                <div className="h-1 bg-blue-500 animate-scan-line"></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-500">Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Key className="text-blue-400 w-4 h-4" />
                  <span className="text-blue-400">ECC Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="text-purple-400 w-4 h-4" />
                  <span className="text-purple-400">Zero-Knowledge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute -left-20 top-20 text-xs font-mono text-blue-500 opacity-30 animate-float-y">
      010110<br />101001<br />110101
    </div>
    <div className="absolute -right-20 bottom-20 text-xs font-mono text-purple-500 opacity-30 animate-float-y-reverse">
      110010<br />001101<br />100101
    </div>
    
    {/* ECC curve diagram with animation */}
    <div className="absolute -bottom-10 -left-10 w-40 h-40 opacity-20">
      <svg viewBox="0 0 100 100">
        <path 
          d="M10,70 Q30,20 50,60 T90,40" 
          stroke="rgba(168, 85, 247, 0.8)" 
          strokeWidth="1.5" 
          fill="none"
          className="animate-dash"
        />
        <circle cx="50" cy="60" r="2" fill="#60A5FA" className="animate-pulse" />
        <circle cx="70" cy="52" r="2" fill="#60A5FA" className="animate-pulse-delayed" />
      </svg>
    </div>
    
    {/* Enhanced animated glow effects */}
    <div className="absolute inset-0 rounded-2xl opacity-20 blur-2xl">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 rounded-full animate-pulse-subtle"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600 rounded-full animate-pulse-subtle-delayed"></div>
    </div>
  </div>
</div>
  </div>
</div>
      
      {/* Global styles with new animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float-gentle {
          0% { transform: translate(0, 0); }
          100% { transform: translate(3px, 3px); }
        }
        
        @keyframes float-y {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
        
        @keyframes float-y-reverse {
          0% { transform: translateY(20px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        
        @keyframes pulse-subtle-delayed {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
          animation-delay: 1s;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 25px rgba(139, 92, 246, 0.5); }
        }
        
        @keyframes border-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes shimmer-x {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes shimmer-x-reverse {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }
        
        @keyframes shimmer-y {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }
        
        @keyframes shimmer-y-reverse {
          0% { background-position: 0 200%; }
          100% { background-position: 0 -100%; }
        }
        
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
        
        .animate-border-glow {
          animation: border-glow 3s infinite ease-in-out;
        }
        
        .animate-shimmer-x {
          background-size: 200% 100%;
          animation: shimmer-x 3s infinite linear;
        }
        
        .animate-shimmer-x-reverse {
          background-size: 200% 100%;
          animation: shimmer-x-reverse 3s infinite linear;
        }
        
        .animate-shimmer-y {
          background-size: 100% 200%;
          animation: shimmer-y 3s infinite linear;
        }
        
        .animate-shimmer-y-reverse {
          background-size: 100% 200%;
          animation: shimmer-y-reverse 3s infinite linear;
        }
        
        .animate-scan-line {
          animation: scan-line 2s infinite linear;
        }
        
        .animate-dash {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: dash 3s infinite linear alternate;
        }
        
        .animate-pulse-delayed {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 1s;
        }
        
        .shadow-glow {
          box-shadow: 0 0 30px rgba(96, 165, 250, 0.3);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;