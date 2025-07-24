import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MessageCircle, CheckCircle } from 'lucide-react';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

interface CTASectionProps {
  currentLanguage: Language;
}

const CTASection: React.FC<CTASectionProps> = ({ currentLanguage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = translations[currentLanguage];

  const benefits = [
    t.cta.benefits[0],
    t.cta.benefits[1],
    t.cta.benefits[2]
  ];

  // Function to render text with bold formatting
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <section ref={ref} className="py-20 bg-navy-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-gold-primary/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-gold-primary/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gold-primary/5 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t.cta.heading}
          </h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            {renderTextWithBold(t.cta.subheading)}
          </p>
        </motion.div>

        {/* Benefits - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                className="flex items-center justify-center space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-gold-primary flex-shrink-0" />
                <span className="text-white font-medium text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(193, 157, 83, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold-primary text-navy-primary px-8 py-4 rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center mx-auto sm:mx-0 space-x-3"
          >
            <Calendar className="w-6 h-6" />
            <span>{t.cta.primaryButton}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-navy-primary transition-all duration-300 flex items-center mx-auto sm:mx-0 space-x-3"
          >
            <MessageCircle className="w-6 h-6" />
            <span>{t.cta.secondaryButton}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;