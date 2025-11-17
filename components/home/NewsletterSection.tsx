'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper, Mail, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import api from '@/lib/api';
import { FadeInRight, ScaleIn } from './animations';
import SectionDivider from './SectionDivider';
import { transitions } from '@/lib/motion';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setError(null);

    try {
      await api.post('/newsletter', values);
      setIsSuccess(true);
      form.reset();
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to subscribe. Please try again.';
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SectionDivider />
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-pink-600/90" />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <FadeInRight>
            <Card className="border-0 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden">
              <CardContent className="p-8 sm:p-12 md:p-16">
                <div className="text-center mb-10 sm:mb-12">
                  <ScaleIn delay={0.2}>
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 mb-4 sm:mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={transitions.spring}
                    >
                      <Newspaper className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
                    </motion.div>
                  </ScaleIn>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
                    Stay Updated
                  </h2>
                  <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                    Subscribe to our newsletter and never miss an update
                  </p>
                </div>

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mb-6 sm:mb-8 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-sm sm:text-base md:text-lg text-green-800 dark:text-green-200 font-semibold">
                      Successfully subscribed! Check your email for confirmation.
                    </p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mb-6 sm:mb-8 p-4 sm:p-5 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-lg"
                  >
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm sm:text-base md:text-lg text-red-800 dark:text-red-200 font-semibold">{error}</p>
                  </motion.div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <motion.div
                                whileFocus={{ scale: 1.01 }}
                                transition={transitions.smooth}
                                className="relative"
                              >
                                <Mail className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400 z-10" />
                                <Input
                                  type="email"
                                  placeholder="Enter your email address"
                                  className="pl-12 sm:pl-14 h-14 sm:h-16 text-base sm:text-lg rounded-full border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white dark:bg-gray-900 shadow-lg"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="h-14 sm:h-16 px-6 sm:px-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 whitespace-nowrap text-base sm:text-lg font-semibold border-0 w-full sm:w-auto"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-3">
                              <motion.div
                                className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              Subscribing...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-3">
                              <Send className="w-5 h-5" />
                              Subscribe
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </FadeInRight>
        </div>
      </section>
    </>
  );
}
