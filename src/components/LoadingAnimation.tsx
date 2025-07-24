import React from 'react';
import { motion } from 'framer-motion';
import { Stamp } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-navy-primary flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut",
          times: [0, 0.6, 1],
          scale: [0, 1.2, 1],
          rotate: [-45, 10, 0]
        }}
        className="relative"
      >
        <div className="w-32 h-32 rounded-full border-4 border-gold-primary bg-white flex items-center justify-center shadow-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-navy-primary text-2xl font-bold"
          >
            RAC
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          className="absolute -top-2 -right-2 bg-gold-primary text-navy-primary p-2 rounded-full text-xs font-semibold"
        >
          R506278
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-20 text-white text-center"
      >
        <div className="text-lg font-medium">RAC Immigration</div>
        <div className="text-sm opacity-80">Making Immigration Human Again</div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;