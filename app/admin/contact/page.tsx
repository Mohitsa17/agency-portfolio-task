'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Contact {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  createdAt: string;
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact');
      setContacts(response.data.data || []);
    } catch (error) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Contact Submissions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
          View all contact form submissions
        </p>
      </div>

      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {isLoading ? (
            <div className="text-center py-8">Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No contact submissions yet.
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Full Name</TableHead>
                      <TableHead className="min-w-[180px]">Email</TableHead>
                      <TableHead className="min-w-[120px] hidden sm:table-cell">Phone</TableHead>
                      <TableHead className="min-w-[100px] hidden md:table-cell">City</TableHead>
                      <TableHead className="min-w-[150px]">Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact._id}>
                        <TableCell className="font-medium min-w-[120px]">
                          <div className="truncate">{contact.fullName}</div>
                        </TableCell>
                        <TableCell className="min-w-[180px]">
                          <div className="truncate">{contact.email}</div>
                        </TableCell>
                        <TableCell className="min-w-[120px] hidden sm:table-cell">
                          <div className="truncate">{contact.phone}</div>
                        </TableCell>
                        <TableCell className="min-w-[100px] hidden md:table-cell">
                          {contact.city}
                        </TableCell>
                        <TableCell className="min-w-[150px] whitespace-nowrap text-sm">
                          {new Date(contact.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

