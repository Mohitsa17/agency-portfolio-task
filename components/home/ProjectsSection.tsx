'use client';

import { useEffect, useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FolderKanban, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { FadeInUp, staggerContainer, staggerItem } from './animations';
import { GradientDivider } from './SectionDivider';
import { transitions } from '@/lib/motion';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

const ProjectCard = memo(({ project }: { project: Project }) => (
  <motion.div
    variants={staggerItem}
    whileHover={{ y: -12, scale: 1.02 }}
    transition={transitions.spring}
    className="group"
  >
    <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out bg-white/90 dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/30 rounded-2xl" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', willChange: 'transform' }}>
      <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-800">
        <img
          src={project.image || 'https://via.placeholder.com/400x300'}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />
      </div>
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        <Button
          variant="ghost"
          className="group/btn w-full justify-between hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl p-4 transition-all duration-300"
        >
          <span className="font-semibold text-sm sm:text-base">Read More</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
));

ProjectCard.displayName = 'ProjectCard';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects', {
          headers: {
            'Cache-Control': 'public, max-age=3600',
          },
        });
        setProjects(response.data.data || []);
      } catch (error) {
        // Error handling without console.log
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <FolderKanban className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Portfolio
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Our Projects
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Explore our latest work and innovative solutions that drive success
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
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 sm:py-24">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">No projects available yet.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
