// Dashboard.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Eye, EyeOff, Copy, Trash2, Edit, Shield, Lock, ExternalLink, LogOut, Settings, User, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Password {
  _id: string;
  websiteName: string;
  websiteLink: string;
  usernameOrEmail: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  strength?: number; // 0-100 scale
  favorite?: boolean;
}

const Dashboard: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<Password | null>(null);
  const [newPassword, setNewPassword] = useState({
    websiteName: '',
    websiteLink: '',
    usernameOrEmail: '',
    password: '',
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [generatingPassword, setGeneratingPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswordVisible, setShowPasswordVisible] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      setPasswords([
        {
          _id: '1',
          websiteName: 'Google',
          websiteLink: 'https://google.com',
          usernameOrEmail: 'user@example.com',
          password: 'securePassword123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strength: 85,
          favorite: true
        },
        {
          _id: '2',
          websiteName: 'Github',
          websiteLink: 'https://github.com',
          usernameOrEmail: 'devuser',
          password: 'githubPass456!',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strength: 92,
          favorite: false
        },
        {
          _id: '3',
          websiteName: 'Twitter',
          websiteLink: 'https://twitter.com',
          usernameOrEmail: 'tweetuser',
          password: 'twitterSecure789',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strength: 78,
          favorite: true
        },
        {
          _id: '4',
          websiteName: 'Netflix',
          websiteLink: 'https://netflix.com',
          usernameOrEmail: 'moviefan',
          password: 'netflixPass123!',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strength: 70,
          favorite: false
        },
        {
          _id: '5',
          websiteName: 'Amazon',
          websiteLink: 'https://amazon.com',
          usernameOrEmail: 'shopper@example.com',
          password: 'amazonSecure456',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strength: 88,
          favorite: false
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setShowCopiedToast(true);
    
    // Hide toast after 2 seconds
    setTimeout(() => {
      setShowCopiedToast(false);
    }, 2000);
  };

  const toggleFavorite = (id: string) => {
    setPasswords(prevPasswords => 
      prevPasswords.map(pwd => 
        pwd._id === id ? { ...pwd, favorite: !pwd.favorite } : pwd
      )
    );
  };

  const generateRandomPassword = () => {
    setGeneratingPassword(true);
    
    // Simulation of password generation
    setTimeout(() => {
      const length = 16;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      
      if (showEditModal && currentPassword) {
        setCurrentPassword({ ...currentPassword, password });
      } else {
        setNewPassword({ ...newPassword, password });
      }
      
      setPasswordStrength(90);
      setGeneratingPassword(false);
    }, 800);
  };

  const calculatePasswordStrength = (password: string) => {
    // Simple password strength calculation logic
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    
    if (showEditModal && currentPassword) {
      setCurrentPassword({ ...currentPassword, password });
    } else {
      setNewPassword({ ...newPassword, password });
      setPasswordStrength(strength);
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'from-green-500 to-emerald-400';
    if (strength >= 60) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  const getStrengthText = (strength: number) => {
    if (strength >= 80) return 'Strong';
    if (strength >= 60) return 'Medium';
    return 'Weak';
  };

  const filteredPasswords = passwords.filter(item => {
    // Apply category filter
    if (activeCategory === 'favorites' && !item.favorite) return false;
    
    // Apply search filter
    return (
      item.websiteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.websiteLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.usernameOrEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddPassword = () => {
    // API call to add password
    const newPasswordItem: Password = {
      _id: Math.random().toString(36).substr(2, 9),
      ...newPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      strength: passwordStrength,
      favorite: false
    };
    
    setPasswords([...passwords, newPasswordItem]);
    setShowAddModal(false);
    setNewPassword({
      websiteName: '',
      websiteLink: '',
      usernameOrEmail: '',
      password: '',
    });
    setPasswordStrength(0);
  };

  const handleEditPassword = () => {
    if (!currentPassword) return;
    
    // API call to update password
    setPasswords(prevPasswords => 
      prevPasswords.map(pwd => 
        pwd._id === currentPassword._id ? currentPassword : pwd
      )
    );
    
    setShowEditModal(false);
    setCurrentPassword(null);
  };

  const handleDeletePassword = (id: string) => {
    // API call to delete password
    setPasswords(passwords.filter(pw => pw._id !== id));
  };

  const getWebsiteInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 1).toUpperCase();
  };

  const getWebsiteColor = (name: string) => {
    const colors = [
      'from-pink-500 to-purple-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-teal-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-indigo-500 to-blue-500',
    ];
    
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-900 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Geometric grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated particles */}
        <div className="particle-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: Math.random() * 5 + 1 + 'px',
                height: Math.random() * 5 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `floatParticle ${Math.random() * 15 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-gray-900/50 backdrop-blur-md border-r border-gray-800/50 h-full flex flex-col"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-cyan-400" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-cyan-400 rounded-full filter blur-md -z-10"
                />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                CryptoVault
              </h1>
            </div>
          </div>
          
          <div className="px-4 py-6">
            <div className="space-y-1">
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory('all')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeCategory === 'all' 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-l-4 border-cyan-400' 
                    : 'hover:bg-white/5'
                }`}
              >
                <Lock className={`h-5 w-5 ${activeCategory === 'all' ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span className={activeCategory === 'all' ? 'text-white' : 'text-gray-400'}>All Passwords</span>
              </motion.button>
              
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory('favorites')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeCategory === 'favorites' 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-l-4 border-cyan-400' 
                    : 'hover:bg-white/5'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${activeCategory === 'favorites' ? 'text-cyan-400' : 'text-gray-400'}`}
                  fill={activeCategory === 'favorites' ? 'currentColor' : 'none'} 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className={activeCategory === 'favorites' ? 'text-white' : 'text-gray-400'}>Favorites</span>
                <div className="ml-auto flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-6 h-6 text-xs">
                  {passwords.filter(p => p.favorite).length}
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory('recent')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeCategory === 'recent' 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-l-4 border-cyan-400' 
                    : 'hover:bg-white/5'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${activeCategory === 'recent' ? 'text-cyan-400' : 'text-gray-400'}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={activeCategory === 'recent' ? 'text-white' : 'text-gray-400'}>Recent</span>
              </motion.button>
            </div>
          </div>
          
          <div className="mt-auto p-4 border-t border-gray-800/50">
            <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                <User className="h-4 w-4 text-white" />
                <motion.div 
                  animate={{ y: [30, -30] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    duration: 2,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-transparent"
                />
              </div>
              <div>
                <div className="text-sm font-medium">User Account</div>
                <div className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Premium</div>
              </div>
            </div>
            
            <div className="flex items-center mt-4 space-x-2">
              <motion.button 
                whileHover={{ y: -3 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-lg flex-1 justify-center transition-all"
              >
                <Settings className="h-4 w-4" />
                <span className="text-xs">Settings</span>
              </motion.button>
              <motion.button 
                whileHover={{ y: -3 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-lg flex-1 justify-center transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-xs">Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 flex justify-between items-center"
          >
            <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
               <Search className="h-6 w-6 text-cyan-400 opacity-80" /> 
            </div>
              <input
                type="text"
                placeholder="Search passwords..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 px-4 py-3 rounded-lg font-medium shadow-lg relative overflow-hidden group"
            >
              <motion.div 
                animate={{ 
                  x: ["-100%", "200%"],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "linear",
                }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10 opacity-0 group-hover:opacity-100"
              />
              <PlusCircle className="h-5 w-5" />
              <span>New Password</span>
            </motion.button>
          </motion.div>
          
          {/* Status bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-6 py-3 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-md border-y border-gray-800/50"
          >
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 relative">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-green-400 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-400">Strong Encryption Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 relative">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-blue-400 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-400">Last Backup: 2h ago</span>
                </div>
              </div>
              <div className="text-sm text-gray-400 flex items-center">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ 
                    duration: 0.5,
                    delay: 1, 
                    ease: "easeInOut"
                  }}
                  className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mr-1"
                >
                  {filteredPasswords.length}
                </motion.div> 
                passwords stored
              </div>
            </div>
          </motion.div>

          {/* Password cards grid */}
          <div className="flex-1 px-6 py-4 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 h-64"
                  >
                    <div className="h-6 w-36 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full mb-4 animate-pulse"></div>
                    <div className="h-6 w-48 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full mb-6 animate-pulse"></div>
                    
                    <div className="space-y-3">
                      <div className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl animate-pulse"></div>
                      <div className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl animate-pulse"></div>
                    </div>
                    
                    <div className="mt-6 h-5 w-32 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full animate-pulse"></div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <AnimatePresence>
                {filteredPasswords.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="relative inline-block">
                      <Lock className="h-20 w-20 mx-auto text-gray-600 mb-6" />
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full bg-gray-600 filter blur-md -z-10"
                      />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">No passwords found</h3>
                    <p className="text-gray-400 max-w-md mx-auto">Add a new password or try a different search term.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddModal(true)}
                      className="mt-8 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-3 rounded-xl font-medium shadow-lg relative overflow-hidden group"
                    >
                      <motion.div 
                        animate={{ 
                          x: ["-100%", "200%"],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "linear",
                        }}
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10 opacity-0 group-hover:opacity-100"
                      />
                      <span className="flex items-center space-x-2">
                        <PlusCircle className="h-5 w-5" />
                        <span>Add Your First Password</span>
                      </span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredPasswords.map((password, index) => (
                      <motion.div
                        key={password._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        className="group relative overflow-hidden bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-800/50 hover:border-cyan-500/50 shadow-xl"
                      >
                        {/* Background glow effect */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        />
                        
                        <div className="p-6">
                          {/* Card Header */}
                          {/* Card Header */}
<div className="flex items-center space-x-4 mb-4">
  <div className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden bg-gray-800">
    {/* Favicon image */}
    <img 
      src={`https://www.google.com/s2/favicons?domain=${password.websiteLink}&sz=64`}
      alt={`${password.websiteName} icon`}
      className="w-full h-full object-contain"
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.onerror = null;
        target.style.display = 'none';
        // Show fallback initials if image fails to load
        const parent = target.parentNode as HTMLElement;
        const fallback = parent.querySelector('.fallback-initials') as HTMLElement;
        if (fallback) fallback.style.display = 'flex';
      }}
    />
    {/* Fallback to initials if favicon fails to load */}
    <div 
      className={`fallback-initials w-full h-full absolute top-0 left-0 bg-gradient-to-r ${getWebsiteColor(password.websiteName)} flex items-center justify-center text-white font-bold text-sm hidden`}
    >
      {getWebsiteInitials(password.websiteName)}
      <motion.div 
        animate={{ 
          y: ['-100%', '100%'],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "linear",
        }}
        className="absolute w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
      />
    </div>
  </div>
  <div>
    <h3 className="text-lg font-medium text-white">{password.websiteName}</h3>
    <div className="flex items-center space-x-2 text-gray-400 text-sm">
      <ExternalLink className="h-3 w-3" />
      <a href={password.websiteLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400 transition-colors truncate max-w-[180px]">{password.websiteLink}</a>
    </div>
  </div>
  
  <button 
    onClick={() => toggleFavorite(password._id)}
    className="ml-auto text-gray-400 hover:text-yellow-400 transition-colors"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5"
      fill={password.favorite ? 'currentColor' : 'none'} 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  </button>
</div>
                          
                          {/* Username */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs font-medium text-gray-400">Username / Email</div>
                              <button 
                                onClick={() => copyToClipboard(password.usernameOrEmail, 'Username')}
                                className="text-gray-500 hover:text-white transition-colors"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg px-4 py-2 text-white break-all">
                              {password.usernameOrEmail}
                            </div>
                          </div>
                          
                          {/* Password */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs font-medium text-gray-400">Password</div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => togglePasswordVisibility(password._id)}
                                  className="text-gray-500 hover:text-white transition-colors"
                                >
                                  {visiblePasswords[password._id] ? 
                                    <EyeOff className="h-4 w-4" /> : 
                                    <Eye className="h-4 w-4" />
                                  }
                                </button>
                                <button 
                                  onClick={() => copyToClipboard(password.password, 'Password')}
                                  className="text-gray-500 hover:text-white transition-colors"
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg px-4 py-2 text-white font-mono break-all">
                              {visiblePasswords[password._id] ? 
                                password.password : 
                                '••••••••••••••••'
                              }
                            </div>
                          </div>

                          {/* Password Strength */}
                          <div className="mt-4">
                            <div className="flex justify-between items-center text-xs mb-1">
                              <div className="text-gray-400">Strength</div>
                              <div className={`
                                ${password.strength && password.strength >= 80 ? 'text-green-400' : 
                                  password.strength && password.strength >= 60 ? 'text-yellow-400' : 'text-red-400'}
                              `}>
                                {password.strength && getStrengthText(password.strength)}
                              </div>
                            </div>
                            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${password.strength}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full rounded-full bg-gradient-to-r ${password.strength && getStrengthColor(password.strength)}`}
                              />
                            </div>
                          </div>
                          
                          {/* Card Footer with buttons */}
                          <div className="mt-5 pt-4 border-t border-gray-800/50 flex justify-between">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setCurrentPassword(password);
                                setShowEditModal(true);
                              }}
                              className="text-sm flex items-center space-x-1 text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeletePassword(password._id)}
                              className="text-sm flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg px-4 py-3 z-50 flex items-center space-x-2"
          >
            <Check className="h-5 w-5 text-green-400" />
            <span className="text-white">{copiedText} copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Password Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">Add New Password</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Website Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Google, Facebook"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    value={newPassword.websiteName}
                    onChange={(e) => setNewPassword({...newPassword, websiteName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Website URL</label>
                  <input
                    type="text"
                    placeholder="e.g. https://google.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    value={newPassword.websiteLink}
                    onChange={(e) => setNewPassword({...newPassword, websiteLink: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Username / Email</label>
                  <input
                    type="text"
                    placeholder="Your login username or email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    value={newPassword.usernameOrEmail}
                    onChange={(e) => setNewPassword({...newPassword, usernameOrEmail: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPasswordVisible ? "text" : "password"}
                      placeholder="Enter secure password"
                      className="w-full px-4 py-3 pr-20 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      value={newPassword.password}
                      onChange={handlePasswordChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                      <button 
                        type="button"
                        onClick={() => setShowPasswordVisible(!showPasswordVisible)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        {showPasswordVisible ? 
                          <EyeOff className="h-5 w-5" /> : 
                          <Eye className="h-5 w-5" />
                        }
                      </button>
                      <button 
                        type="button"
                        onClick={generateRandomPassword}
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                        disabled={generatingPassword}
                      >
                        {generatingPassword ? 
                          <RefreshCw className="h-5 w-5 animate-spin" /> : 
                          <RefreshCw className="h-5 w-5" />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Password strength meter */}
                  {newPassword.password && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <div className="text-gray-400">Strength</div>
                        <div className={`
                          ${passwordStrength >= 80 ? 'text-green-400' : 
                            passwordStrength >= 60 ? 'text-yellow-400' : 'text-red-400'}
                        `}>
                          {getStrengthText(passwordStrength)}
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                          className={`h-full rounded-full bg-gradient-to-r ${getStrengthColor(passwordStrength)}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 bg-gray-900 border-t border-gray-800 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setShowAddModal(false);
                    setNewPassword({
                      websiteName: '',
                      websiteLink: '',
                      usernameOrEmail: '',
                      password: '',
                    });
                    setPasswordStrength(0);
                  }}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddPassword}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg font-medium"
                  disabled={!newPassword.websiteName || !newPassword.usernameOrEmail || !newPassword.password}
                >
                  Save Password
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Password Modal */}
      <AnimatePresence>
        {showEditModal && currentPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">Edit Password</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Website Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    value={currentPassword.websiteName}
                    onChange={(e) => setCurrentPassword({...currentPassword, websiteName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Website URL</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    value={currentPassword.websiteLink}
                    onChange={(e) => setCurrentPassword({...currentPassword, websiteLink: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Username / Email</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    value={currentPassword.usernameOrEmail}
                    onChange={(e) => setCurrentPassword({...currentPassword, usernameOrEmail: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPasswordVisible ? "text" : "password"}
                      className="w-full px-4 py-3 pr-20 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      value={currentPassword.password}
                      onChange={handlePasswordChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                      <button 
                        type="button"
                        onClick={() => setShowPasswordVisible(!showPasswordVisible)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        {showPasswordVisible ? 
                          <EyeOff className="h-5 w-5" /> : 
                          <Eye className="h-5 w-5" />
                        }
                      </button>
                      <button 
                        type="button"
                        onClick={generateRandomPassword}
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                        disabled={generatingPassword}
                      >
                        {generatingPassword ? 
                          <RefreshCw className="h-5 w-5 animate-spin" /> : 
                          <RefreshCw className="h-5 w-5" />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Password strength meter */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <div className="text-gray-400">Strength</div>
                      <div className={`
                        ${currentPassword.strength && currentPassword.strength >= 80 ? 'text-green-400' : 
                          currentPassword.strength && currentPassword.strength >= 60 ? 'text-yellow-400' : 'text-red-400'}
                      `}>
                        {currentPassword.strength && getStrengthText(currentPassword.strength)}
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentPassword.strength}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${currentPassword.strength && getStrengthColor(currentPassword.strength)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-900 border-t border-gray-800 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleDeletePassword(currentPassword._id)}
                  className="flex items-center space-x-1 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </motion.button>
                
                <div className="space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setShowEditModal(false);
                      setCurrentPassword(null);
                    }}
                    className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleEditPassword}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg font-medium"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for custom animations */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #a855f7);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #9333ea);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;