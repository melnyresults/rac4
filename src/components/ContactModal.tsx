import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Send, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, title = "Get In Touch" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && isValidEmail(formData.email) && formData.phone.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', { name: formData.name.trim(), email: formData.email.trim() });
      
      // Submit to Zapier raw webhook with CORS handling
      const webhookData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        timestamp: new Date().toISOString(),
        source: 'RAC Immigration Website'
      };

      console.log('Sending to webhook:', webhookData);

      const response = await fetch('https://hooks.zapier.com/hooks/catch/19293386/uhu9jmq/', {
        method: 'POST',
        mode: 'no-cors', // Handle CORS issues with Zapier
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      console.log('Response received:', response);
      
      // With no-cors mode, we can't read the response status
      // Assume success if no error was thrown
      toast.success('Thank you! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '' });
      onClose();
      
      // Redirect to thank you page
      setTimeout(() => {
        window.location.href = '/thanks';
      }, 1000);
      
    } catch (error) {
      console.error('Form submission error details:', {
        error: error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        toast.error('Network error. Please check your internet connection and try again.');
      } else {
        toast.error('Unable to submit form. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-navy-primary text-white p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-2">
                  <img
                    src="https://i.ibb.co/Csb2gT8X/Untitled-design-3.png"
                    alt="RAC Immigration Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="text-white/80 text-sm">Free Consultation Available</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="bg-gold-primary/10 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Next Steps:</strong> After submitting, we'll contact you within 24 hours to schedule your free consultation and discuss your immigration options.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full bg-navy-primary text-white py-3 rounded-lg font-medium hover:bg-navy-secondary transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;