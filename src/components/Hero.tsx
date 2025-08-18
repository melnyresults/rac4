import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

interface HeroProps {
  currentLanguage: Language;
}

const Hero: React.FC<HeroProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/27gFRx1F/unnamed.jpg"
          alt="Canadian immigration background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-primary/70"></div>
      </div>

      {/* RCIC License Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-20 left-4 sm:top-24 sm:left-8 bg-gold-primary text-navy-primary px-3 py-2 rounded-full text-xs font-bold shadow-lg z-10"
      >
        RCIC #R506278
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block"
            >
              {t.hero.headline1}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block text-gold-primary mt-2"
            >
              {t.hero.headline2}
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-8"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(193, 157, 83, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold-primary text-navy-primary px-8 py-4 rounded-lg font-bold text-lg border-4 border-white/20 shadow-2xl hover:border-white/40 transition-all duration-300 flex items-center mx-auto space-x-3"
             
            >
              <Calendar className="w-6 h-6" />
              <span>{t.hero.cta}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gold-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;