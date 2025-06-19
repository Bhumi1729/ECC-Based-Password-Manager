import React from 'react';
import { Heart, Shield, ExternalLink, MessageCircle, Github, Lock, Key } from 'lucide-react';

interface FooterProps {
  companyName?: string;
  year?: number;
}

const Footer: React.FC<FooterProps> = ({ 
  companyName = "Fortify", 
  year = new Date().getFullYear() 
}) => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
      
      {/* Top section with links */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* App Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Lock size={24} className="text-indigo-400 mr-2" />
              <h3 className="text-white text-xl font-bold">
                {companyName}
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              A simple and secure password manager to keep your credentials safe. 
              Military-grade encryption for your digital life.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-all transform hover:scale-110">
                <Github size={22} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-all transform hover:scale-110">
                <MessageCircle size={22} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="md:px-8">
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Key size={18} className="text-indigo-400 mr-2" />
              Features
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Secure Vault</span>
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Auto-fill Passwords</span>
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Password Generator</span>
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Encryption Standards</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Security Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center">
              <Shield size={18} className="text-indigo-400 mr-2" />
              Security & Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Security Best Practices</span>
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="group text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom section with copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {year} {companyName}. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-8 text-sm">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms of Use</a>
            <div className="flex items-center text-gray-300 bg-gray-800 px-3 py-1 rounded-full">
              <Shield size={14} className="mr-1 text-indigo-400" />
              <span className="text-xs font-medium">Encrypted & Secure</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust indicator */}
      <div className="bg-black py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-gray-500 flex items-center justify-center">
          <span>Made with</span>
          <Heart size={12} className="mx-1 text-red-500 animate-pulse" />
          <span>to keep your passwords safe</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;