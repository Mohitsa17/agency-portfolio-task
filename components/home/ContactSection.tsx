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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Send, CheckCircle2, User, Phone, MapPin } from 'lucide-react';
import api from '@/lib/api';
import { FadeInLeft, ScaleIn } from './animations';
import SectionDivider, { GradientDivider } from './SectionDivider';
import { transitions } from '@/lib/motion';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  city: z.string().min(2, 'City must be at least 2 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      await api.post('/contact', values);
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SectionDivider />
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <FadeInLeft>
            <div className="text-center mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
                Contact Us
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                Have a question or want to work together? We'd love to hear from you.
              </p>
            </div>
          </FadeInLeft>

          <GradientDivider />

          <FadeInLeft delay={0.2}>
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden">
              <CardContent className="p-6 sm:p-10 md:p-16">
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="mb-6 sm:mb-8 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-sm sm:text-base md:text-lg text-green-800 dark:text-green-200 font-semibold">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.01 }} transition={transitions.smooth}>
                                <Input
                                  placeholder="John Doe"
                                  className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white dark:bg-gray-900"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.01 }} transition={transitions.smooth}>
                                <Input
                                  type="email"
                                  placeholder="john@example.com"
                                  className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white dark:bg-gray-900"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                              <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              Mobile Number
                            </FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.01 }} transition={transitions.smooth}>
                                <Input
                                  type="tel"
                                  placeholder="+1 234 567 8900"
                                  className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white dark:bg-gray-900"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              City
                            </FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.01 }} transition={transitions.smooth}>
                                <Input
                                  placeholder="New York"
                                  className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white dark:bg-gray-900"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-14 sm:h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 text-base sm:text-lg font-semibold border-0"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-3">
                            <motion.div
                              className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-3">
                            <Send className="w-5 h-5" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </FadeInLeft>
        </div>
      </section>
    </>
  );
}
