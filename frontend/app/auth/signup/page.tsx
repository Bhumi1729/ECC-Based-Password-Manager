"use client";
import { useState, useEffect, FormEvent } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Eye, EyeOff } from "lucide-react";

interface RegisterResponse {
  message: string;
  user: {
    username: string;
    email: string;
  };
}

// Update this with your backend API URL
const API_URL = "https://ecc-based-password-manager.onrender.com"; // Adjusted to deployed backend URL

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Password strength evaluation
    useEffect(() => {
        if (!password) {
            setPasswordStrength(0);
            return;
        }
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 25;
        
        // Contains uppercase
        if (/[A-Z]/.test(password)) strength += 25;
        
        // Contains lowercase
        if (/[a-z]/.test(password)) strength += 25;
        
        // Contains numbers or special chars
        if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 25;
        
        setPasswordStrength(strength);
    }, [password]);

    // Function to get strength color
    const getStrengthColor = () => {
        if (passwordStrength <= 25) return 'from-red-600 to-red-500';
        if (passwordStrength <= 50) return 'from-yellow-500 to-yellow-400';
        if (passwordStrength <= 75) return 'from-blue-500 to-cyan-400';
        return 'from-green-500 to-emerald-400';
    };
    
    // Function to get strength label
    const getStrengthLabel = () => {
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Reset messages
        setErrorMessage(null);
        setSuccessMessage(null);
        
        // Form validation
        if (!username || !email || !password) {
            setErrorMessage("All fields are required");
            return;
        }
        
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        
        if (passwordStrength < 50) {
            setErrorMessage("Please choose a stronger password");
            return;
        }
        
        try {
            setIsLoading(true);
            
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                // Add this if your backend is on a different domain
                credentials: 'include',
                mode: 'cors'
            });
            
            const data = await response.json() as RegisterResponse;
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            
            // Success
            setSuccessMessage(data.message || 'Account created successfully!');
            
            // Clear form
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = '/auth/login';
            }, 2000);
            
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage(error instanceof Error ? error.message : 'Registration failed. Please check your network connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Background elements for visual interest */}
            
            <div className="relative">
                {/* Enhanced animated border effect */}
                <div className="absolute -inset-0.5 rounded-xl bg-transparent border border-gray-500 overflow-hidden">
                    {/* Animated gradient border effect */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[pulse_2s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[pulse_2s_ease-in-out_infinite_0.5s]"></div>
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-[pulse_2s_ease-in-out_infinite_0.75s]"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-[pulse_2s_ease-in-out_infinite_1s]"></div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400 opacity-70"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-400 opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-400 opacity-70"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-400 opacity-70"></div>
                    
                    {/* Moving highlight effect */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute h-10 w-10 bg-blue-500/20 blur-xl rounded-full animate-[moveLeftToRight_8s_linear_infinite]"></div>
                        <div className="absolute h-10 w-10 bg-blue-500/20 blur-xl rounded-full animate-[moveRightToLeft_10s_linear_infinite_2s]"></div>
                    </div>
                </div>
                
                {/* Main card with original styling */}
                <CardSpotlight className="relative h-auto w-110 px-10 py-8 rounded-xl border border-gray-800 bg-black bg-opacity-50 backdrop-filter backdrop-blur-xl">
                    {/* Subtle border gradient overlay - keeping original style */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-30"></div>
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-30"></div>
                        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent opacity-30"></div>
                        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent opacity-30"></div>
                    </div>
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold relative z-20 text-white">
                            Create Account
                        </h1>
                        <p className="text-neutral-300 relative z-20 text-sm mt-1">
                            Your security starts here.
                        </p>
                    </div>

                    {/* Display messages */}
                    {errorMessage && (
                        <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
                            {errorMessage}
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="bg-green-500/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-6 text-sm">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-2 ml-1">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>
                        
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2 ml-1">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            
                            {/* Password strength indicator */}
                            {password.length > 0 && (
                                <div className="text-xs mt-2 mb-1">
                                    <div className="flex justify-between text-gray-400 mb-1">
                                        <span>Password strength</span>
                                        <span className={`transition-colors duration-300 ${
                                        passwordStrength >= 75 ? "text-green-400" : 
                                        passwordStrength >= 50 ? "text-blue-400" : 
                                        passwordStrength >= 25 ? "text-yellow-400" : 
                                        "text-red-400"
                                        }`}>
                                        {getStrengthLabel()}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden shadow-inner shadow-black/50">
                                        <div 
                                        className={`h-full rounded-full bg-gradient-to-r ${getStrengthColor()} transition-all duration-500 ease-out shadow-lg relative`}
                                        style={{ width: `${passwordStrength}%` }}
                                        >
                                        {/* Animated shimmer effect */}
                                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent absolute"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-2 ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        {/* Sign Up Button */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-blue-500/30 backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">{isLoading ? "Creating Account..." : "Create Account"}</span>
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        
                        {/* Divider */}
                        <div className="flex items-center my-2">
                            <div className="flex-grow border-t border-gray-700/50"></div>
                            <span className="mx-4 text-sm text-neutral-400">OR</span>
                            <div className="flex-grow border-t border-gray-700/50"></div>
                        </div>
                        
                        {/* Google Sign Up Button */}
                        <button 
                            type="button"
                            className="w-full flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg border border-white/20 transition-all duration-300 shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                                />
                                <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                                />
                                <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                                />
                                <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                                />
                                <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Sign up with Google
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-neutral-400 mt-8 relative z-20 text-sm text-center">
                        Already have an account? <a href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Log in</a>
                    </p>
                </CardSpotlight>
            </div>
        </div>
    );
}