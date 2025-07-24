import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import WhoIAm from './components/WhoIAm';
import WhatIDo from './components/WhatIDo';
import WhyItMatters from './components/WhyItMatters';
import RealSuccess from './components/RealSuccess';
import Blog from './components/Blog';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import LoadingAnimation from './components/LoadingAnimation';

// Blog Components
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';

// About Us Component
import AboutUs from './components/AboutUs';

// Admin Components
import Login from './components/Login';
import Dashboard from './components/admin/Dashboard';
import PostEditor from './components/admin/PostEditor';
import ProtectedRoute from './components/ProtectedRoute';

type Language = 'en' | 'uk' | 'ru';

// Home Page Component
const HomePage: React.FC<{ currentLanguage: Language; setCurrentLanguage: (lang: Language) => void }> = ({ currentLanguage, setCurrentLanguage }) => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowStickyCTA(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero currentLanguage={currentLanguage} />
        <WhoIAm currentLanguage={currentLanguage} />
        <WhatIDo currentLanguage={currentLanguage} />
        <WhyItMatters currentLanguage={currentLanguage} />
        <RealSuccess currentLanguage={currentLanguage} />
        <Blog currentLanguage={currentLanguage} />
        <CTASection currentLanguage={currentLanguage} />
      </motion.main>

      <Footer currentLanguage={currentLanguage} />
      
      <AnimatePresence>
        {showStickyCTA && <StickyCTA currentLanguage={currentLanguage} />}
      </AnimatePresence>
    </>
  );
};

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for passport stamp animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#002c5f',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#c19d53',
                  color: '#002c5f',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={<HomePage currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />} 
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/posts/new" 
              element={
                <ProtectedRoute>
                  <PostEditor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/posts/edit/:id" 
              element={
                <ProtectedRoute>
                  <PostEditor />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;