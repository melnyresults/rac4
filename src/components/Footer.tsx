import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';

type Language = 'en' | 'uk' | 'ru';

interface FooterProps {
  currentLanguage: Language;
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const footerLinks = [
    { text: t.footer.privacy, href: '#' },
    { text: t.footer.terms, href: '#' },
    { text: t.footer.contact, href: '#footer' }
  ];

  return (
    <footer id="footer" className="bg-navy-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center">
                <span className="text-navy-primary font-bold">RAC</span>
              </div>
              <div>
                <div className="font-bold text-lg">RAC Immigration</div>
                <div className="text-gold-primary text-sm">RCIC #R506278</div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gold-primary">{t.footer.contactInfo}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-primary" />
                <span>info@racimmigration.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-primary mt-1" />
                <span>Toronto, Ontario, Canada</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gold-primary">{t.footer.followUs}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-primary hover:text-navy-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 RAC Immigration. {t.footer.allRights}
            </div>
            
            <div className="flex items-center space-x-6">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-gold-primary transition-colors text-sm"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm">
              {t.footer.licensed}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;