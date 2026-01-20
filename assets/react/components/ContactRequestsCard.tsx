import React from 'react';
import { useUserContacts, ContactRequest } from '@/hooks/useUserContacts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  CalendarClock,
} from 'lucide-react';

const ContactRequestsCard: React.FC = () => {
  const { contacts, isLoading, error } = useUserContacts();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getConsultationTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Thérapie individuelle': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Thérapie de couple': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      "Psychologie de l'enfant": 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Accompagnement professionnel': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Évaluation psychologique': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Autre': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    };
    return colors[type] || colors['Autre'];
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg mb-8">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-lg mb-8 border-l-4 border-l-destructive">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (contacts.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-lg mb-8 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 rounded-lg">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Vos demandes de contact</CardTitle>
            <CardDescription>
              {contacts.length} demande{contacts.length > 1 ? 's' : ''} envoyée{contacts.length > 1 ? 's' : ''}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.map((contact) => (
          <ContactRequestItem key={contact.id} contact={contact} formatDate={formatDate} getConsultationTypeColor={getConsultationTypeColor} />
        ))}
      </CardContent>
    </Card>
  );
};

interface ContactRequestItemProps {
  contact: ContactRequest;
  formatDate: (date: string) => string;
  getConsultationTypeColor: (type: string) => string;
}

const ContactRequestItem: React.FC<ContactRequestItemProps> = ({
  contact,
  formatDate,
  getConsultationTypeColor,
}) => {
  return (
    <div className="bg-background rounded-lg p-4 shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getConsultationTypeColor(contact.consultationType)}>
            {contact.consultationType}
          </Badge>
          {contact.processed ? (
            <Badge variant="default" className="gap-1 bg-green-600">
              <CheckCircle2 className="h-3 w-3" />
              Traitée
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              En attente
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4" />
          <span>{formatDate(contact.createdAt)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{contact.email}</span>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{contact.phone}</span>
          </div>
        )}
      </div>

      {contact.message && (
        <div className="bg-muted/50 rounded-md p-3 text-sm">
          <p className="text-muted-foreground italic">"{contact.message}"</p>
        </div>
      )}
    </div>
  );
};

export default ContactRequestsCard;
