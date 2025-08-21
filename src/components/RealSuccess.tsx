import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

interface RealSuccessProps {
  currentLanguage: Language;
}

const RealSuccess: React.FC<RealSuccessProps> = ({ currentLanguage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = translations[currentLanguage];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedReview, setExpandedReview] = useState(false);

  const testimonials = t.realSuccess.testimonials;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Function to truncate text and determine if it needs expansion
  const getTruncatedText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return { text, needsExpansion: false };
    const truncated = text.substring(0, maxLength).trim();
    const lastSpace = truncated.lastIndexOf(' ');
    return {
      text: lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...',
      needsExpansion: true
    };
  };

  return (
    <section id="testimonials" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/6c1bRPfg/shutterstock-354616754.jpg"
          alt="Success stories background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-primary/85 to-navy-secondary/85"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t.realSuccess.heading}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t.realSuccess.subheading}
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl border-4 border-gold-primary/20 relative"
            >
              {/* Reset expansion when slide changes */}
              {React.useEffect(() => setExpandedReview(false), [currentSlide])}
              {/* Passport Stamp Effect */}
              <div className="absolute -top-4 -right-4 bg-gold-primary text-navy-primary px-4 py-2 rounded-lg text-sm font-bold transform rotate-12 shadow-lg">
                SUCCESS
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-gold-primary fill-current" />
                ))}
              </div>

              {/* Quote */}
              <div className="mb-8">
                <blockquote className="text-lg sm:text-xl text-gray-700 text-center leading-relaxed italic">
                  "{expandedReview 
                    ? testimonials[currentSlide].quote 
                    : getTruncatedText(testimonials[currentSlide].quote).text
                  }"
                </blockquote>
                
                {/* See Full Review Button */}
                {getTruncatedText(testimonials[currentSlide].quote).needsExpansion && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setExpandedReview(!expandedReview)}
                      className="inline-flex items-center space-x-2 text-gold-primary hover:text-navy-primary transition-colors duration-300 font-medium"
                    >
                      <span>{expandedReview ? 'Show Less' : 'See Full Review'}</span>
                      {expandedReview ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Author */}
              <div className="text-center">
                <div className="font-bold text-navy-primary text-lg">
                  {testimonials[currentSlide].author}
                </div>
                <div className="text-gold-primary font-medium">
                  {testimonials[currentSlide].location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="bg-gold-primary text-navy-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gold-primary scale-125' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="bg-gold-primary text-navy-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealSuccess;