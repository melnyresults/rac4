import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import toast from 'react-hot-toast';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      toast.success('Welcome to the admin panel!');
    } else {
      toast.error('Invalid password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-primary to-navy-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-navy-primary" />
          </div>
          <h1 className="text-2xl font-bold text-navy-primary mb-2">Admin Login</h1>
          <p className="text-gray-600">Enter your password to access the blog admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent pr-12"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-navy-primary text-white py-3 rounded-lg font-medium hover:bg-navy-secondary transition-colors duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Default password: <code className="bg-gray-100 px-2 py-1 rounded">racimmigration2024</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;