import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Shield, Target } from 'lucide-react';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

interface WhyItMattersProps {
  currentLanguage: Language;
}

const WhyItMatters: React.FC<WhyItMattersProps> = ({ currentLanguage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = translations[currentLanguage];
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const values = [
    {
      icon: Heart,
      title: t.whyItMatters.values.respect.title,
      description: t.whyItMatters.values.respect.description,
      example: t.whyItMatters.values.respect.example
    },
    {
      icon: Shield,
      title: t.whyItMatters.values.accountability.title,
      description: t.whyItMatters.values.accountability.description,
      example: t.whyItMatters.values.accountability.example
    },
    {
      icon: Target,
      title: t.whyItMatters.values.commitment.title,
      description: t.whyItMatters.values.commitment.description,
      example: t.whyItMatters.values.commitment.example
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-primary leading-tight max-w-5xl mx-auto">
            {currentLanguage === 'en' ? 'Because This Is About More Than Paperwork.' : t.whyItMatters.mainHeading}
          </h2>
        </motion.div>

        {/* Centered Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <div className="bg-gradient-to-br from-gold-primary to-gold-secondary rounded-3xl p-12 lg:p-16 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10">
              <div className="text-8xl text-white/20 mb-8 font-serif">"</div>
              
              <div className="space-y-6">
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
                  {t.whyItMatters.quote}
                </blockquote>
                
                <div className="pt-6 border-t border-white/20">
                  <p className="text-lg sm:text-xl lg:text-2xl font-medium text-white/90 leading-relaxed">
                    {t.whyItMatters.codeIntro}
                  </p>
                </div>
              </div>
              
              <div className="text-8xl text-white/20 mt-8 rotate-180 font-serif">"</div>
            </div>
          </div>
        </motion.div>

        {/* Values Cards - Centered and Side by Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
              className="relative h-80"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full transition-transform duration-700 cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl shadow-xl border-2 border-gold-primary/20 p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="bg-gradient-to-br from-gold-primary/10 to-gold-primary/20 p-5 rounded-full mb-6 group-hover:from-gold-primary group-hover:to-gold-secondary transition-all duration-300">
                    <value.icon className="w-12 h-12 text-gold-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-primary mb-4 leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-medium text-center">
                    {value.description}
                  </p>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-navy-primary to-navy-secondary rounded-2xl shadow-xl p-8 flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="text-center">
                    <p className="text-white leading-relaxed text-sm">
                      {value.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Personal Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-navy-primary rounded-2xl p-8 lg:p-12 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gold-primary/10 rounded-full translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gold-primary/10 rounded-full -translate-x-8 translate-y-8"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-primary leading-tight">
                {t.whyItMatters.personalMessage.line1}
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-primary leading-tight">
                {t.whyItMatters.personalMessage.line2}
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-primary leading-tight">
                {t.whyItMatters.personalMessage.line3}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyItMatters;