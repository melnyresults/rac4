import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <title>Terms of Service - RAC Immigration | Canada Immigration Agency</title>
      <meta name="description" content="Terms of service for RAC Immigration - Leading Canada Immigration Agency. Professional immigration consulting terms and conditions for Canadian immigration services with RCIC Yuliya Balina." />
      <meta name="keywords" content="Canada Immigration Agency terms, RAC Immigration terms of service, immigration consultant terms, RCIC service agreement" />
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
              <Scale className="w-12 h-12 text-gold-primary mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">
                Terms of Service
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Professional immigration consulting services terms and conditions
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
                <CheckCircle className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">Acceptance of Terms</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700">
                  By accessing and using the services of RAC Immigration Services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">Services Provided</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  RAC Immigration Services, operated by Yuliya Balina (RCIC #R506278), provides:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Immigration consultation and advice</li>
                  <li>Application preparation and submission assistance</li>
                  <li>Document review and verification</li>
                  <li>Representation before Immigration, Refugees and Citizenship Canada (IRCC)</li>
                  <li>Case management and follow-up services</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">Professional Standards</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  As a licensed Regulated Canadian Immigration Consultant (RCIC), we adhere to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>The Code of Professional Conduct of the College of Immigration and Citizenship Consultants (CICC)</li>
                  <li>All applicable federal and provincial laws and regulations</li>
                  <li>Strict confidentiality and privacy standards</li>
                  <li>Continuing professional development requirements</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-gold-primary mr-3" />
                <h2 className="text-2xl font-bold text-navy-primary mb-0">Client Responsibilities</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Clients are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Providing complete, accurate, and truthful information</li>
                  <li>Submitting all required documents in a timely manner</li>
                  <li>Paying fees as agreed upon in the retainer agreement</li>
                  <li>Responding promptly to requests for information or action</li>
                  <li>Notifying us immediately of any changes in circumstances</li>
                  <li>Following all advice and instructions provided</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Fees and Payment</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Service fees are outlined in individual retainer agreements and may include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Professional service fees</li>
                  <li>Government application fees (paid directly to IRCC)</li>
                  <li>Third-party costs (translations, medical exams, etc.)</li>
                  <li>Administrative and processing fees</li>
                </ul>
                <p className="text-gray-700">
                  Payment terms are specified in the retainer agreement. Failure to pay fees may result in suspension or termination of services.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">No Guarantee of Results</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 mb-4">
                      <strong>Important Notice:</strong> Immigration outcomes depend on many factors beyond our control, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                      <li>Changes in immigration laws and policies</li>
                      <li>Government processing times and procedures</li>
                      <li>Individual circumstances and eligibility</li>
                      <li>Completeness and accuracy of information provided</li>
                    </ul>
                    <p className="text-gray-700">
                      While we provide professional expertise and diligent service, we cannot guarantee specific outcomes or processing times for any immigration application.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Confidentiality</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700">
                  All client information is treated as strictly confidential and is protected under solicitor-client privilege. We will not disclose any personal information without your written consent, except as required by law or professional regulations.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Limitation of Liability</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700">
                  Our liability is limited to the fees paid for our services. We are not liable for any indirect, consequential, or punitive damages arising from the use of our services or any immigration outcomes.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Termination</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Either party may terminate the service agreement with written notice. Upon termination:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>All outstanding fees become immediately due</li>
                  <li>We will provide copies of your file upon request</li>
                  <li>Confidentiality obligations continue indefinitely</li>
                  <li>We may withdraw as representative from pending applications</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Governing Law</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700">
                  These terms are governed by the laws of Ontario, Canada. Any disputes will be resolved through the appropriate professional regulatory bodies or Ontario courts.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-primary mb-4">Contact Information</h2>
              <div className="bg-gold-primary/10 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  For questions about these terms or our services:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>RAC Immigration Services</strong></p>
                  <p><strong>Yuliya Balina, RCIC #R506278</strong></p>
                  <p><strong>Email:</strong> ybalina@racimmigration.com</p>
                  <p><strong>Phone:</strong> +1 416-804-7771</p>
                  <p><strong>Location:</strong> Toronto, Ontario, Canada</p>
                </div>
              </div>
            </section>

            <div className="bg-navy-primary text-white rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Professional Regulation</h3>
              <p className="text-white/90 mb-4">
                RAC Immigration Services is regulated by the College of Immigration and Citizenship Consultants (CICC) 
                and is a member of the Canadian Association of Professional Immigration Consultants (CAPIC).
              </p>
              <p className="text-white/90">
                <strong>License #R506278</strong> - Authorized to provide immigration services in Canada
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;