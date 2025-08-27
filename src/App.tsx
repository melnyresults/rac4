import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { BlogProvider, useBlog } from './contexts/BlogContext';

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
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ThankYou from './components/ThankYou';

// About Us Component
import AboutUs from './components/AboutUs';

type Language = 'en' | 'uk' | 'ru';

// SEO Component for dynamic meta tags
const SEOHead: React.FC<{ title?: string; description?: string; keywords?: string }> = ({ 
  title = "RAC Immigration | Yuliya Balina - Leading Canada Immigration Agency",
  description = "RAC Immigration - Leading Canada Immigration Agency with RCIC Yuliya Balina. 19+ years helping skilled professionals immigrate to Canada through Express Entry, PNP, work visas. Free consultation available.",
  keywords = "Canada Immigration Agency, RAC Immigration, immigration consultant canada, RCIC, Yuliya Balina, express entry canada, provincial nominee program, work visa canada, study visa canada, permanent residence canada, immigration services toronto"
}) => {
  React.useEffect(() => {
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);
  
  return null;
};

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
      <SEOHead />
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

// Admin Route Component
const AdminRoute: React.FC = () => {
  const { isAdmin } = useBlog();
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
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
    <BlogProvider>
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
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/thanks" element={<ThankYou />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />} />
          </Routes>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;