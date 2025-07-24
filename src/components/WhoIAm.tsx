import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

interface WhoIAmProps {
  currentLanguage: Language;
}

const WhoIAm: React.FC<WhoIAmProps> = ({ currentLanguage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = translations[currentLanguage];

  return (
    <section id="about" ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Passport Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002c5f' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zM0 30c0 16.569 13.431 30 30 30V0C13.431 0 0 13.431 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-80 h-80 lg:w-[560px] lg:h-[560px] mx-auto lg:mx-0">
              {/* Gold Frame */}
              <div className="absolute inset-0 border-8 border-gold-primary rounded-full shadow-2xl"></div>
              
              {/* Portrait Image */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img
                  src="/image/RAC.jpg"
                  alt="Yuliya Balina"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Passport Stamps */}
              <div className="absolute -top-4 -right-4 bg-gold-primary text-navy-primary px-3 py-2 rounded-lg text-xs font-bold transform rotate-12 shadow-lg">
                EXPERT
              </div>
              <div className="absolute -bottom-4 -left-4 bg-navy-primary text-gold-primary px-3 py-2 rounded-lg text-xs font-bold transform -rotate-12 shadow-lg">
                TRUSTED
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl sm:text-4xl font-bold text-navy-primary leading-tight mb-6"
              >
                {t.whoIAm.heading}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="prose prose-lg text-gray-700 leading-relaxed space-y-4"
              >
                {t.whoIAm.body.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    className={index === 0 ? "text-xl font-medium text-navy-primary" : ""}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>

              {/* Key Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gold-primary/20"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-primary">19+</div>
                  <div className="text-sm text-gray-600 font-medium">{t.whoIAm.stats.years}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-primary">1000s</div>
                  <div className="text-sm text-gray-600 font-medium">{t.whoIAm.stats.clients}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoIAm;