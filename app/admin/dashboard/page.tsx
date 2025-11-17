'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';
import { FolderKanban, Users, Mail, Newspaper } from 'lucide-react';

interface Stats {
  projects: number;
  clients: number;
  contacts: number;
  newsletters: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    clients: 0,
    contacts: 0,
    newsletters: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, clientsRes, contactsRes, newslettersRes] = await Promise.all([
          api.get('/projects', { headers: { 'Cache-Control': 'public, max-age=300' } }),
          api.get('/clients', { headers: { 'Cache-Control': 'public, max-age=300' } }),
          api.get('/contact', { headers: { 'Cache-Control': 'public, max-age=300' } }),
          api.get('/newsletter', { headers: { 'Cache-Control': 'public, max-age=300' } }),
        ]);

        setStats({
          projects: projectsRes.data.data?.length || 0,
          clients: clientsRes.data.data?.length || 0,
          contacts: contactsRes.data.data?.length || 0,
          newsletters: newslettersRes.data.data?.length || 0,
        });
      } catch (error) {
        // Error handling
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      description: 'Total projects',
    },
    {
      title: 'Clients',
      value: stats.clients,
      icon: Users,
      description: 'Total clients',
    },
    {
      title: 'Contacts',
      value: stats.contacts,
      icon: Mail,
      description: 'Contact submissions',
    },
    {
      title: 'Newsletters',
      value: stats.newsletters,
      icon: Newspaper,
      description: 'Newsletter subscribers',
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Welcome to the admin panel. Here's an overview of your data.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="w-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

