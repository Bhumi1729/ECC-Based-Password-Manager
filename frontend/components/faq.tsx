"use client"
import React, { useState } from 'react';
import { ChevronDown, Lock, Shield, Database, Key, RefreshCw } from 'lucide-react';

const FAQ = () => {
  

  const faqItems = [
    {
      question: "What is ECC encryption and why is it used?",
      answer: "Elliptic Curve Cryptography (ECC) is an advanced encryption method that provides the same level of security as traditional methods like RSA, but with much smaller key sizes. This makes it ideal for password managers as it offers strong security with better performance and lower resource usage.",
      icon: <Key className="text-purple-300" size={20} />
    },
    {
      question: "How does this password manager store my passwords?",
      answer: "Your passwords are never stored in plain text. Before any password reaches our database, it's encrypted using ECC encryption on your device. This means even if our database were compromised, your passwords would remain secure and unreadable without your unique decryption key.",
      icon: <Database className="text-purple-300" size={20} />
    },
    {
      question: "Is my data synchronized across devices?",
      answer: "Currently, this is a basic implementation that stores encrypted passwords locally. Cross-device synchronization is on our roadmap for future updates, which will allow you to securely access your passwords from multiple devices.",
      icon: <RefreshCw className="text-purple-300" size={20} />
    },
    {
      question: "Can I share passwords with others securely?",
      answer: "Password sharing functionality is planned for a future update. It will use ECC's unique properties to allow secure sharing without exposing the actual password during the sharing process.",
      icon: <Shield className="text-purple-300" size={20} />
    },
    {
      question: "What happens if I forget my master password?",
      answer: "Since we implement a zero-knowledge approach for maximum security, we don't store your master password anywhere. If you forget it, we cannot recover your encrypted data. We recommend keeping a secure backup of your master password in a safe place.",
      icon: <Lock className="text-purple-300" size={20} />
    }
  ];

const [openIndex, setOpenIndex] = useState<number | null>(null);

const toggleQuestion = (index: number) => {
  setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
};


  return (
    <section id='faqs' className="bg-gradient-to-br from-gray-900 via-black to-purple-950 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Learn more about how our ECC-based password manager keeps your sensitive information secure
          </p>
        </div>
        
        <div className="space-y-4 custom-scrollbar">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm bg-gray-800/80 hover:bg-gray-800/95 shadow-lg transition-all duration-300"
              style={{
                boxShadow: openIndex === index ? '0 0 15px rgba(147, 51, 234, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-gradient-to-br from-purple-700 to-purple-900 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <span className="font-medium text-white text-lg">{item.question}</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 transition-all duration-300 ${openIndex === index ? 'bg-purple-600' : ''}`}>
                  <ChevronDown 
                    className={`text-white transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                    size={18}
                  />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 pl-16 text-gray-300 border-t border-gray-700 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-block py-2 px-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg cursor-pointer hover:shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300">
            Need more help? Contact support
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #4f46e5);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default FAQ;