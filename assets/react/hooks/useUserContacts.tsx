import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface ContactRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  consultationType: string;
  message: string | null;
  createdAt: string;
  processed: boolean;
}

interface UseUserContactsReturn {
  contacts: ContactRequest[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUserContacts(): UseUserContactsReturn {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    const token = localStorage.getItem('auth_token');

    if (!user || !token) {
      setContacts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/me/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expirée');
          return;
        }
        throw new Error('Erreur lors de la récupération des demandes');
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    isLoading,
    error,
    refetch: fetchContacts,
  };
}
