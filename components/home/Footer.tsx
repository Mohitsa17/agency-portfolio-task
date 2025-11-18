'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { FadeInUp } from './animations';
import SectionDivider from './SectionDivider';
import { transitions } from '@/lib/motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-indigo-400' },
  ];

  const quickLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Clients', href: '#clients' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <SectionDivider />
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-black text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <FadeInUp delay={0.1}>
              <div>
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Task Project
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                  Building digital excellence together. We create stunning experiences that drive results and transform visions into reality.
                </p>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${social.color} border border-gray-700/50 hover:border-gray-600`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div>
                <h4 className="text-white text-base sm:text-lg font-bold mb-4 sm:mb-6 uppercase tracking-wider">
                  Quick Links
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base lg:text-lg flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div>
                <h4 className="text-white text-base sm:text-lg font-bold mb-4 sm:mb-6 uppercase tracking-wider">
                  Contact Info
                </h4>
                <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base lg:text-lg">
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <a href="mailto:hello@example.com" className="hover:text-white transition-colors break-all">
                      hello@example.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-indigo-400">📍</span>
                    <span>Available Worldwide</span>
                  </li>
                </ul>
              </div>
            </FadeInUp>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...transitions.gentle, delay: 0.4 }}
            className="border-t border-gray-800 pt-6 sm:pt-8 text-center relative"
          >
            <p className="text-gray-500 text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap">
              © {currentYear} Task Project. All rights reserved. Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              </motion.span>
            </p>
            {/* Subtle Admin Access Button - Bottom Right Corner */}
            <a
              href="/admin/login"
              className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 opacity-25 hover:opacity-60 transition-all duration-300 text-gray-400 hover:text-gray-300 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md border border-gray-700/30 hover:border-gray-600/50 bg-gray-800/20 hover:bg-gray-800/40 backdrop-blur-sm"
              aria-label="Admin Login"
              title="Admin Login"
            >
              🔐 Admin
            </a>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
