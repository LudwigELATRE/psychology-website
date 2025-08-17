import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  Plus,
  Filter,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar as CalendarIcon,
  User,
  MessageCircle,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'suivi' | 'premiere';
  mode: 'presentiel' | 'visio' | 'telephone';
  status: 'confirme' | 'en_attente' | 'annule' | 'termine';
  practitioner: {
    name: string;
    title: string;
    avatar?: string;
  };
  location?: string;
  notes?: string;
  price: number;
}

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [selectedFilter, setSelectedFilter] = useState<string>('tous');
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Données d'exemple
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2025-08-20',
      time: '14:00',
      duration: 60,
      type: 'consultation',
      mode: 'presentiel',
      status: 'confirme',
      practitioner: {
        name: 'Dr. Maëva DIVAD',
        title: 'Psychologue clinicienne'
      },
      location: '15 Rue de la Paix, 75001 Paris',
      notes: 'Suivi thérapeutique hebdomadaire',
      price: 80
    },
    {
      id: '2',
      date: '2025-08-25',
      time: '10:30',
      duration: 45,
      type: 'suivi',
      mode: 'visio',
      status: 'confirme',
      practitioner: {
        name: 'Dr. Maëva DIVAD',
        title: 'Psychologue clinicienne'
      },
      notes: 'Séance de suivi en ligne',
      price: 70
    },
    {
      id: '3',
      date: '2025-08-15',
      time: '16:00',
      duration: 60,
      type: 'premiere',
      mode: 'presentiel',
      status: 'termine',
      practitioner: {
        name: 'Dr. Maëva DIVAD',
        title: 'Psychologue clinicienne'
      },
      location: '15 Rue de la Paix, 75001 Paris',
      notes: 'Première consultation - bilan initial',
      price: 90
    },
    {
      id: '4',
      date: '2025-08-28',
      time: '15:00',
      duration: 60,
      type: 'consultation',
      mode: 'telephone',
      status: 'en_attente',
      practitioner: {
        name: 'Dr. Maëva DIVAD',
        title: 'Psychologue clinicienne'
      },
      notes: 'Consultation téléphonique',
      price: 65
    }
  ]);

  const getStatusBadge = (status: Appointment['status']) => {
    const variants = {
      confirme: { variant: 'default' as const, icon: CheckCircle, text: 'Confirmé' },
      en_attente: { variant: 'secondary' as const, icon: AlertCircle, text: 'En attente' },
      annule: { variant: 'destructive' as const, icon: XCircle, text: 'Annulé' },
      termine: { variant: 'outline' as const, icon: CheckCircle, text: 'Terminé' }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getModeBadge = (mode: Appointment['mode']) => {
    const variants = {
      presentiel: { icon: MapPin, text: 'Présentiel', color: 'bg-blue-100 text-blue-800' },
      visio: { icon: Video, text: 'Visioconférence', color: 'bg-green-100 text-green-800' },
      telephone: { icon: Phone, text: 'Téléphone', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = variants[mode];
    const Icon = config.icon;
    
    return (
      <Badge variant="outline" className={`gap-1 ${config.color}`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (selectedFilter === 'tous') return true;
    return appointment.status === selectedFilter;
  });

  const upcomingAppointments = appointments.filter(
    apt => apt.status === 'confirme' && new Date(`${apt.date}T${apt.time}`) > new Date()
  );

  const pastAppointments = appointments.filter(
    apt => apt.status === 'termine' || new Date(`${apt.date}T${apt.time}`) < new Date()
  );

  const pendingAppointments = appointments.filter(apt => apt.status === 'en_attente');

  const handleCancelAppointment = (appointmentId: string) => {
    toast({
      title: "Rendez-vous annulé",
      description: "Votre rendez-vous a été annulé avec succès.",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Vous devez être connecté pour voir vos rendez-vous.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Mes rendez-vous</h1>
              <p className="text-muted-foreground">
                Gérez vos consultations et suivez votre parcours thérapeutique
              </p>
            </div>
            
            <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-lg">
                  <Plus className="h-4 w-4" />
                  Nouveau rendez-vous
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Prendre un rendez-vous</DialogTitle>
                  <DialogDescription>
                    Contactez directement le cabinet pour prendre rendez-vous
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm text-muted-foreground">01 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Plateforme en ligne</p>
                      <p className="text-sm text-muted-foreground">Doctolib (bientôt disponible)</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                    Fermer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">À venir</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{upcomingAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">Terminés</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{pastAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">En attente</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{pendingAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Total</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="upcoming" className="gap-2">
              <Calendar className="h-4 w-4" />
              À venir
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2">
              <Filter className="h-4 w-4" />
              Tous
            </TabsTrigger>
          </TabsList>

          {/* Rendez-vous à venir */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {appointment.practitioner.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {appointment.practitioner.title}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {getStatusBadge(appointment.status)}
                            {getModeBadge(appointment.mode)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{appointment.time} ({appointment.duration} min)</span>
                          </div>
                          {appointment.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="truncate">{appointment.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{appointment.price}€</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="bg-muted/50 rounded-lg p-3 text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageCircle className="h-4 w-4" />
                              <span className="font-medium">Notes</span>
                            </div>
                            <p className="text-muted-foreground">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:w-40">
                        {appointment.mode === 'visio' && (
                          <Button size="sm" className="gap-2">
                            <Video className="h-4 w-4" />
                            Rejoindre
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="gap-2">
                          <Edit className="h-4 w-4" />
                          Modifier
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-2">
                              <X className="h-4 w-4" />
                              Annuler
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Annuler le rendez-vous</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir annuler ce rendez-vous ? 
                                Cette action peut entraîner des frais selon la politique d'annulation.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Garder</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Annuler le RDV
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun rendez-vous à venir</h3>
                  <p className="text-muted-foreground mb-6">
                    Prenez un nouveau rendez-vous pour continuer votre suivi
                  </p>
                  <Button onClick={() => setIsNewAppointmentOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Prendre rendez-vous
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Historique */}
          <TabsContent value="past" className="space-y-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-0 shadow-md opacity-90">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {appointment.practitioner.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {appointment.practitioner.title}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {getStatusBadge(appointment.status)}
                            {getModeBadge(appointment.mode)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time} ({appointment.duration} min)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:w-40">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun historique</h3>
                  <p className="text-muted-foreground">
                    Vos rendez-vous terminés apparaîtront ici
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tous les rendez-vous */}
          <TabsContent value="all" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="confirme">Confirmé</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="termine">Terminé</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {appointment.practitioner.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {appointment.practitioner.title}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(appointment.status)}
                          {getModeBadge(appointment.mode)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{appointment.time} ({appointment.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{appointment.price}€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointments;