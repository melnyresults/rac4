import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

interface HeaderProps {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, setCurrentLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[currentLanguage];

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '/about-us' },
    { key: 'services', href: '#services' },
    { key: 'testimonials', href: '#testimonials' },
    { key: 'contact', href: '#footer' }
  ];

  const languages = [
    { code: 'en' as Language, flag: 'CA', name: 'EN' },
    { code: 'uk' as Language, flag: 'UA', name: 'УКР' },
    { code: 'ru' as Language, flag: 'RU', name: 'РУС' }
  ];

  // Определяем активную секцию при скролле
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Обработчик клика по пункту меню
  const handleNavClick = (key: string, href: string) => {
    // Special handling for about link
    if (key === 'about') {
      // Navigate to about-us page instead of scrolling
      window.location.href = href;
      return;
    }

    setActiveSection(key);
    setIsMenuOpen(false);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 64; // Height of fixed header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-navy-primary/95 backdrop-blur-sm z-40 border-b-2 border-gold-primary"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Company Name */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-white"
            >
              <div className="font-bold text-xl leading-tight">RAC Immigration Services</div>
              <div className="text-sm text-gold-primary">RCIC #R506278</div>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                whileHover={{ y: -2 }}
                className={`transition-colors font-medium ${
                  activeSection === item.key
                    ? 'text-gold-primary border-b-2 border-gold-primary'
                    : 'text-white hover:text-gold-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.key, item.href);
                }}
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </motion.a>
            ))}
          </nav>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => setCurrentLanguage(lang.code)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  currentLanguage === lang.code
                    ? 'bg-gold-primary text-navy-primary'
                    : 'text-white hover:text-gold-primary'
                }`}
              >
                  {lang.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gold-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-primary border-t border-gold-primary/20"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block transition-colors font-medium px-4 py-2 ${
                    activeSection === item.key
                      ? 'text-gold-primary bg-gold-primary/10'
                      : 'text-white hover:text-gold-primary'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.key, item.href);
                  }}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </a>
              ))}
              
              <div className="flex items-center space-x-2 px-4 pt-4 border-t border-gold-primary/20">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-gold-primary text-navy-primary'
                        : 'text-white hover:text-gold-primary'
                    }`}
                  >
                    <div className={`w-5 h-4 mr-2 rounded-sm overflow-hidden flex-shrink-0 flag-${lang.flag.toLowerCase()}`}></div>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;