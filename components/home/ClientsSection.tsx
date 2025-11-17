'use client';

import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Quote } from 'lucide-react';
import api from '@/lib/api';
import { FadeInUp, staggerContainer, staggerItem } from './animations';
import SectionDivider, { GradientDivider } from './SectionDivider';
import { transitions } from '@/lib/motion';

interface Client {
  _id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
  createdAt: string;
}

const ClientCard = memo(({ client }: { client: Client }) => (
  <motion.div
    variants={staggerItem}
    whileHover={{
      scale: 1.05,
      boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25)',
    }}
    transition={transitions.spring}
  >
    <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ease-out bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-2xl overflow-hidden group">
      <CardContent className="p-8 sm:p-10">
        <div className="flex items-start gap-4 mb-6 sm:mb-8">
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
            "{client.description}"
          </p>
        </div>
        <div className="flex items-center gap-4 sm:gap-5 pt-6 sm:pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 ring-indigo-100 dark:ring-indigo-900/50 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-700 transition-all duration-300 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 flex-shrink-0">
            <img
              src={client.image || 'https://via.placeholder.com/150'}
              alt={client.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
          <div>
            <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1">
              {client.name}
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {client.designation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
));

ClientCard.displayName = 'ClientCard';

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/clients', {
          headers: {
            'Cache-Control': 'public, max-age=3600',
          },
        });
        setClients(response.data.data || []);
      } catch (error) {
        // Error handling without console.log
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <>
      <SectionDivider />
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:via-purple-950 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-screen-xl mx-auto relative z-10">
          <FadeInUp>
            <div className="text-center mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  Testimonials
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
                Happy Clients
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                See what our clients have to say about working with us
              </p>
            </div>
          </FadeInUp>

          <GradientDivider />

          {isLoading ? (
            <div className="text-center py-20 sm:py-24">
              <motion.div
                className="inline-block w-12 h-12 sm:w-16 sm:h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400">Loading clients...</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-20 sm:py-24">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">No client testimonials available yet.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
            >
              {clients.map((client) => (
                <ClientCard key={client._id} client={client} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
