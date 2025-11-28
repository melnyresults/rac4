import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <title>Privacy Policy - RAC Immigration | Canada Immigration Agency</title>
      <meta name="description" content="Privacy policy for RAC Immigration - Leading Canada Immigration Agency. Learn how we protect your personal information and data during the Canadian immigration process." />
      <meta name="keywords" content="Canada Immigration Agency privacy, RAC Immigration privacy policy, immigration data protection, RCIC privacy standards" />
      <meta name="robots" content="index, follow" />

      {/* Header */}
      <div className="bg-navy-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gold-primary hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-gold-primary mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Your privacy and data protection are our top priorities
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-gold-primary/10 rounded-2xl p-8 mb-8">
              <p className="text-lg text-gray-700 mb-0">
                <strong>Effective Date:</strong> January 1, 2024<br />
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">Information We Collect</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-navy-primary mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Request a consultation or contact us through our website</li>
                  <li>Fill out forms or questionnaires</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Engage with our services</li>
                </ul>
                <p className="text-gray-700">
                  This may include your name, email address, phone number, address, immigration status, 
                  and other information relevant to your immigration case.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">How We Use Your Information</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>To provide immigration consultation and services</li>
                  <li>To communicate with you about your case and our services</li>
                  <li>To send you relevant updates about immigration law and policies</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal and regulatory requirements</li>
                  <li>To protect our rights and the rights of our clients</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">Information Sharing and Disclosure</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To government agencies as required for immigration applications</li>
                  <li>To trusted service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">Data Security</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Secure data transmission using SSL encryption</li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Secure storage of physical and electronic records</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Your Rights</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your personal information (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>File a complaint with relevant privacy authorities</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Cookies and Tracking</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience, 
                  analyze website traffic, and understand where our visitors are coming from. You can control 
                  cookie settings through your browser preferences.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Changes to This Policy</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Contact Us</h2>
              <div className="bg-gold-primary/10 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> ybalina@racimmigration.com</p>
                  <p><strong>Phone:</strong> +1 416-804-7771</p>
                  <p><strong>Address:</strong> Toronto, Ontario, Canada</p>
                </div>
              </div>
            </section>

            <div className="bg-navy-primary text-white rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Professional Standards</h3>
              <p className="text-white/90">
                As a licensed member of CICC (R506278) and CAPIC, we adhere to the highest standards 
                of professional conduct and client confidentiality in the immigration consulting industry.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;