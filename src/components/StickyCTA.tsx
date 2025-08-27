import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Mail } from 'lucide-react';
import { translations } from '../utils/translations';
import ContactModal from './ContactModal';

type Language = 'en' | 'uk' | 'ru';

interface StickyCTAProps {
  currentLanguage: Language;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [showContactModal, setShowContactModal] = React.useState(false);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in learning more about immigration services to Canada.");
    window.open(`https://wa.me/14168047771?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:ybalina@racimmigration.com?subject=Immigration Consultation Inquiry';
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-navy-primary/95 backdrop-blur-sm border-t-2 border-gold-primary z-50 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Message */}
          <div className="text-white text-center sm:text-left">
            <div className="font-medium">{t.stickyCTA.message}</div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactModal(true)}
              className="bg-gold-primary text-navy-primary px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.stickyCTA.bookNow}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="border border-white text-white px-4 py-2 rounded-lg text-sm hover:bg-white hover:text-navy-primary transition-all duration-300 flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmail}
              className="text-white hover:text-gold-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Quick Consultation Request"
      />
    </motion.div>
  );
};

export default StickyCTA;