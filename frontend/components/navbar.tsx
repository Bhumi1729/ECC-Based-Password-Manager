"use client"

import React, { ReactNode } from "react";
import { useState } from "react";
import { Menu, X, Lock } from 'lucide-react';
import { useRouter } from "next/navigation";
interface NavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-md"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="relative flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-md opacity-20 blur animate-pulse group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 rounded-md group-hover:from-blue-500 group-hover:to-purple-500 transition-colors duration-300">
              <Lock className="text-white w-6 h-6" />
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-colors duration-300">
            FORTIFY
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10">
          <NavLink active={true} href="#">Home</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#faqs">FAQ</NavLink>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => router.push("/auth/login")}  className="text-lg px-5 py-2 text-gray-300 hover:text-white transition-colors relative overflow-hidden group">
            <span className="relative z-10">Login</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button onClick={() => router.push("/auth/signup")} className="text-lg px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-white relative overflow-hidden group">
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></span>
          </button>
        </div>
        
        <button 
          className="md:hidden text-gray-300 hover:text-white focus:outline-none transition-transform duration-200 hover:scale-110"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="relative md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-5">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#">FAQ</NavLink>
            <div className="pt-4 flex flex-col space-y-3">
              <button className="px-5 py-2 border border-gray-700 hover:border-blue-500 rounded-md text-gray-300 transition-all duration-300 hover:text-white group">
                <span className="relative">Login</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition-opacity duration-300"></span>
              </button>
              <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-white group relative overflow-hidden">
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, active = false }) => {
  return (
    <a 
      href={href}
      className={`relative text-lg font-semibold transition-colors duration-200 group ${
        active ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
      </span>
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
      )}
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 rounded-md bg-gradient-to-r from-blue-600/20 to-purple-600/20 transition-opacity duration-300"></span>
    </a>
  );
};

export default Navbar;
