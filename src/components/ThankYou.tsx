import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, BookOpen, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-primary to-navy-secondary flex items-center justify-center px-4">
      {/* SEO Meta Tags */}
      <title>Thank You - RAC Immigration Services</title>
      <meta name="description" content="Thank you for contacting RAC Immigration Services. We'll be in touch soon to discuss your Canadian immigration journey." />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-navy-primary mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Your consultation request has been successfully submitted. We'll contact you within 
            <strong className="text-gold-primary"> 24 hours</strong> to schedule your free consultation 
            and discuss your Canadian immigration options.
          </p>
          
          <div className="bg-gold-primary/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>What's Next:</strong> Check your email for a confirmation message, and we'll reach out 
              soon to set up your personalized consultation with Yuliya Balina (RCIC #R506278).
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="space-y-4"
        >
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/blog')}
              className="bg-gold-primary text-navy-primary px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Our Immigration Blog</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="border-2 border-navy-primary text-navy-primary px-6 py-3 rounded-lg font-bold text-lg hover:bg-navy-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>
          </div>

          {/* Blog Preview */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-navy-primary mb-3">
              While You Wait, Explore Our Latest Insights
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                   onClick={() => navigate('/blog')}>
                <h4 className="font-medium text-navy-primary mb-2">Express Entry Updates 2024</h4>
                <p className="text-sm text-gray-600">Latest changes and opportunities in Canada's Express Entry system.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                   onClick={() => navigate('/blog')}>
                <h4 className="font-medium text-navy-primary mb-2">Provincial Nominee Programs</h4>
                <p className="text-sm text-gray-600">Find the best PNP pathway for your skills and experience.</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-6 text-sm text-gray-600">
            <p className="mb-2">
              <strong>Need immediate assistance?</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <span>📧 ybalina@racimmigration.com</span>
              <span>📞 +1 416-804-7771</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;