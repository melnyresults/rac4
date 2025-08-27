import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

const AboutUs: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const t = translations[currentLanguage];

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about-us' },
    { key: 'services', href: '/#services' },
    { key: 'blog', href: '/#testimonials' },
    { key: 'contact', href: '/#footer' }
  ];

  const languages = [
    { code: 'en' as Language, flag: 'CA', name: 'EN' },
    { code: 'uk' as Language, flag: 'UA', name: 'УКР' },
    { code: 'ru' as Language, flag: 'RU', name: 'РУС' }
  ];

  const teamMembers = [
    {
      name: "Yuliya Balina",
      title: "Founder & RCIC",
      description: "With over 19 years of hands-on experience and license #R506278, Yuliya turned her own immigrant journey into a mission: empowering skilled professionals and families to build their futures in Canada. Fluent in English, Ukrainian, and Russian, she leads RAC Immigration with expertise, empathy, and integrity.",
      image: "/image/RAC.jpg" // Using existing image
    },
    {
      name: "Vita Galiniak (Shubert)",
      title: "Immigration Case Specialist & Co-Founder, MV Group",
      description: "A seasoned consultant since 2006 and philology graduate, Vita brings unmatched expertise in work, study, visitor, PR, and citizenship applications. Partnering with Yuliya since 2006, she's driven by integrity and a passion for client success.",
      image: "https://i.ibb.co/PZ5wgL7g/Vita-Galiniak-1.jpg"
    },
    {
      name: "Mykola Galiniak",
      title: "Co-Founder & CCO, MV Group",
      description: "With a Master's in Marketing and immigration experience since 2012, Mykola built MV Group's recruitment and language-training arms. He's helped thousands of Ukrainians secure Canadian employer connections and excel on their CELPIP & IELTS exams.",
      image: "https://i.ibb.co/w3wkzw7/Mykola-Galiniak.jpg" // Mykola's photo
    },
    {
      name: "Oleksii Dzhura",
      title: "Assistant to the Consultant",
      description: "Since 2017, Oleksii has steered our clients through their very first steps toward Canada. He excels at breaking down complex immigration topics into clear, simple guidance so every applicant feels confident from day one.",
      image: "https://i.ibb.co/5xF5bx6w/Oleksii-Dzhura.jpg" // Oleksii's photo
    },
    {
      name: "Tetiana Fallaha",
      title: "Immigration Specialist",
      description: "Since 2007, Tetiana has specialized in ESL instruction and immigration support, helping skilled workers bridge language barriers for Canadian success. A certified CLB assessor with Master's degrees in Linguistics and Management, she leads MV Group Language Academy, preparing newcomers for IRCC-accepted English tests. With 16+ years of experience, she creates tailored programs for trades professionals—from welders to CNC operators—ensuring they meet both language and immigration requirements.",
      image: "https://i.ibb.co/KcTf28VJ/Tetiana-Fallaha-1.jpg"
    },
    {
      name: "Arlene Joy \"AJ\" Garcia",
      title: "Philippines-Based Immigration Agent",
      description: "A former PR strategist and operations manager for Philippine recruitment, AJ has 20+ years of global staffing and visa-processing experience. Since 2017 she's guided Filipino clients—through empathy and precision—toward their Canadian work, study, and family-reunification goals.",
      image: "https://i.ibb.co/MyPMFNDH/Aj-Photo-2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-navy-primary/95 backdrop-blur-sm z-40 border-b-2 border-gold-primary"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Company Name */}
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-white cursor-pointer"
                onClick={() => navigate('/')}
              >
                <div className="font-bold text-xl leading-tight">RAC Immigration Services</div>
                <div className="text-sm text-gold-primary">RCIC #R506278</div>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className={`transition-colors font-medium ${
                    item.key === 'about'
                      ? 'text-gold-primary border-b-2 border-gold-primary'
                      : 'text-white hover:text-gold-primary'
                  }`}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </motion.a>
              ))}
            </nav>

            {/* Language Toggle */}
            <div className="hidden md:flex items-center space-x-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-gold-primary text-navy-primary'
                      : 'text-white hover:text-gold-primary'
                  }`}
                >
                  {lang.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-gold-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-primary border-t border-gold-primary/20"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                className="h-28 w-auto"
                    href={item.href}
                    className={`block transition-colors font-medium px-4 py-2 ${
                      item.key === 'about'
                        ? 'text-gold-primary bg-gold-primary/10'
                        : 'text-white hover:text-gold-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </a>
                ))}
                
                <div className="flex items-center space-x-2 px-4 pt-4 border-t border-gold-primary/20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-gold-primary text-navy-primary'
                          : 'text-white hover:text-gold-primary'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* SEO Meta Tags */}
      <title>About Our Team - RAC Immigration Services</title>
      <meta name="description" content="Meet our experienced immigration team led by Yuliya Balina (RCIC #R506278). 19+ years helping skilled professionals immigrate to Canada." />

      {/* Header */}
      <div className="bg-navy-primary text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Our experienced professionals are dedicated to making your Canadian immigration journey successful and stress-free.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Members */}
      <section ref={ref} className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/Fk2c3x78/on-arrival-visas-post.jpg"
            alt="Immigration services background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative w-80 h-80 mx-auto lg:mx-0">
                    {member.image ? (
                      <>
                        {/* Gold Frame */}
                        <div className="absolute inset-0 border-8 border-gold-primary rounded-full shadow-2xl"></div>
                        
                        {/* Portrait Image */}
                        <div className="absolute inset-2 rounded-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </>
                    ) : (
                      /* Placeholder */
                      <div className="w-full h-full border-8 border-gold-primary rounded-full bg-gray-100 flex items-center justify-center shadow-2xl">
                        <div className="text-center text-gray-500">
                          <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                          <p className="text-sm font-medium">Photo Coming Soon</p>
                        </div>
                      </div>
                    )}

                    {/* Professional Badge */}
                    <div className="absolute -top-4 -right-4 bg-gold-primary text-navy-primary px-3 py-2 rounded-lg text-xs font-bold transform rotate-12 shadow-lg">
                      EXPERT
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-navy-primary mb-2">
                      {member.name}
                    </h2>
                    <h3 className="text-xl font-semibold text-gold-primary mb-6">
                      {member.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
          </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-navy-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Our team is here to guide you every step of the way. Contact us today for your free consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-primary" />
                <span>ybalina@racimmigration.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-primary" />
                <span>+1 416-804-7771</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gold-primary" />
                <span>Toronto, Ontario</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'mailto:ybalina@racimmigration.com?subject=Immigration Consultation Inquiry'}
              className="bg-gold-primary text-navy-primary px-8 py-4 rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Schedule Your Free Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;