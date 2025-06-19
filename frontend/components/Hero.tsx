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
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-start pt-40">
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
      
      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center text-white">
          Secure Your Digital Life With
          <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {animatedText}<span className="animate-pulse">|</span>
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center mt-6">
          Military-grade encryption based on Elliptic Curve Cryptography. Your passwords are protected even from us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-all duration-300 flex items-center justify-center group">
            Get Started
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 bg-transparent border border-gray-700 hover:border-blue-500 rounded-md font-medium transition-all duration-300 text-gray-300">
            Learn More
          </button>
        </div>
        
        {/* Dashboard Image */}
        <div className="mt-12 w-full flex justify-center">
          <img 
            src="/images/pass.png" 
            alt="Dashboard Preview" 
            className="rounded-2xl shadow-2xl border-4 border-blue-500 w-full max-w-3xl object-contain scale-105 md:scale-110 transition-transform duration-500"
          />
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