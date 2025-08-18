import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppointmentCalendar } from '@/components/AppointmentCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Users,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Activity,
  Settings
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  lastLogin?: string;
  appointmentsCount: number;
}

interface AdminAppointment {
  id: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'suivi' | 'premiere';
  mode: 'presentiel' | 'visio' | 'telephone';
  status: 'confirme' | 'en_attente' | 'annule' | 'termine';
  notes?: string;
  price: number;
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('tous');
  
  // Mock data for users
  const [users] = useState<User[]>([
    {
      id: '1',
      firstName: 'Marie',
      lastName: 'Dupont',
      email: 'marie.dupont@email.com',
      roles: ['ROLE_USER'],
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2025-08-17',
      appointmentsCount: 5
    },
    {
      id: '2',
      firstName: 'Jean',
      lastName: 'Martin',
      email: 'jean.martin@email.com',
      roles: ['ROLE_USER'],
      status: 'active',
      createdAt: '2024-03-20',
      lastLogin: '2025-08-16',
      appointmentsCount: 12
    },
    {
      id: '3',
      firstName: 'Sophie',
      lastName: 'Bernard',
      email: 'sophie.bernard@email.com',
      roles: ['ROLE_USER'],
      status: 'inactive',
      createdAt: '2024-02-10',
      lastLogin: '2025-07-20',
      appointmentsCount: 3
    }
  ]);

  // Mock data for appointments
  const [appointments] = useState<AdminAppointment[]>([
    {
      id: '1',
      patientName: 'Marie Dupont',
      patientEmail: 'marie.dupont@email.com',
      date: '2025-08-20',
      time: '14:00',
      duration: 60,
      type: 'consultation',
      mode: 'presentiel',
      status: 'confirme',
      notes: 'Suivi thérapeutique',
      price: 80
    },
    {
      id: '2',
      patientName: 'Jean Martin',
      patientEmail: 'jean.martin@email.com',
      date: '2025-08-25',
      time: '10:30',
      duration: 45,
      type: 'suivi',
      mode: 'visio',
      status: 'en_attente',
      notes: 'Séance de suivi en ligne',
      price: 70
    },
    {
      id: '3',
      patientName: 'Sophie Bernard',
      patientEmail: 'sophie.bernard@email.com',
      date: '2025-08-18',
      time: '16:00',
      duration: 60,
      type: 'premiere',
      mode: 'presentiel',
      status: 'confirme',
      notes: 'Première consultation',
      price: 90
    }
  ]);

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      active: { variant: 'default' as const, text: 'Actif', color: 'bg-green-100 text-green-800' },
      inactive: { variant: 'secondary' as const, text: 'Inactif', color: 'bg-gray-100 text-gray-800' },
      banned: { variant: 'destructive' as const, text: 'Banni', color: 'bg-red-100 text-red-800' }
    };
    
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getAppointmentStatusBadge = (status: AdminAppointment['status']) => {
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

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: "Action effectuée",
      description: `Action ${action} appliquée à l'utilisateur ${userId}`,
    });
  };

  const handleAppointmentAction = (appointmentId: string, action: string) => {
    toast({
      title: "Rendez-vous modifié",
      description: `Action ${action} appliquée au rendez-vous ${appointmentId}`,
    });
  };

  // Check if user is admin
  if (!user || !user.roles.includes('ROLE_ADMIN')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Accès refusé</h3>
              <p className="text-muted-foreground">
                Vous n'avez pas les permissions pour accéder à cette page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'tous' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const upcomingAppointments = appointments.filter(apt => apt.status === 'confirme' || apt.status === 'en_attente');
  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Administration</h1>
                <p className="text-muted-foreground">
                  Gérez les utilisateurs et supervisez les rendez-vous
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Shield className="h-3 w-3" />
                  Administrateur
                </Badge>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Utilisateurs</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{users.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">RDV à venir</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{upcomingAppointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Aujourd'hui</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{todayAppointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Revenus</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {appointments.reduce((sum, apt) => sum + apt.price, 0)}€
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit">
              <TabsTrigger value="calendar" className="gap-2">
                <Calendar className="h-4 w-4" />
                Calendrier
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="appointments" className="gap-2">
                <Calendar className="h-4 w-4" />
                Rendez-vous
              </TabsTrigger>
            </TabsList>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-4">
              <AppointmentCalendar
                events={appointments.map(apt => ({
                  id: apt.id,
                  title: `${apt.type} - ${apt.patientName}`,
                  start: new Date(`${apt.date}T${apt.time}`),
                  end: new Date(new Date(`${apt.date}T${apt.time}`).getTime() + apt.duration * 60000),
                  patientName: apt.patientName,
                  patientEmail: apt.patientEmail,
                  type: apt.type,
                  mode: apt.mode,
                  status: apt.status,
                  notes: apt.notes,
                  price: apt.price
                }))}
                onSelectEvent={(event) => {
                  toast({
                    title: "Rendez-vous sélectionné",
                    description: `${event.patientName} - ${event.title}`,
                  });
                }}
                onSelectSlot={(slotInfo) => {
                  toast({
                    title: "Nouveau créneau sélectionné",
                    description: `Créneau du ${slotInfo.start.toLocaleDateString('fr-FR')} à ${slotInfo.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
                  });
                }}
                onEventDrop={(event) => {
                  console.log('Event dropped:', event);
                }}
                onCreateEvent={(eventData) => {
                  console.log('Creating event:', eventData);
                }}
                onUpdateEvent={(event) => {
                  console.log('Updating event:', event);
                }}
                onDeleteEvent={(eventId) => {
                  console.log('Deleting event:', eventId);
                }}
              />
            </TabsContent>

            {/* Users Management Tab */}
            <TabsContent value="users" className="space-y-4">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Rechercher un utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="banned">Banni</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users List */}
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                {user.firstName} {user.lastName}
                              </h3>
                              <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {user.email}
                              </p>
                            </div>
                            {getStatusBadge(user.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Inscrit le:</span>
                              <p className="text-muted-foreground">
                                {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">Dernière connexion:</span>
                              <p className="text-muted-foreground">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais'}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">Rendez-vous:</span>
                              <p className="text-muted-foreground">{user.appointmentsCount}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 lg:w-40">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleUserAction(user.id, 'edit')}
                          >
                            <Edit className="h-4 w-4" />
                            Modifier
                          </Button>
                          
                          {user.status === 'active' ? (
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="gap-2"
                              onClick={() => handleUserAction(user.id, 'deactivate')}
                            >
                              <UserX className="h-4 w-4" />
                              Désactiver
                            </Button>
                          ) : (
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="gap-2"
                              onClick={() => handleUserAction(user.id, 'activate')}
                            >
                              <UserCheck className="h-4 w-4" />
                              Activer
                            </Button>
                          )}
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" className="gap-2">
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer cet utilisateur ? 
                                  Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleUserAction(user.id, 'delete')}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Appointments Management Tab */}
            <TabsContent value="appointments" className="space-y-4">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                {appointment.patientName}
                              </h3>
                              <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {appointment.patientEmail}
                              </p>
                            </div>
                            {getAppointmentStatusBadge(appointment.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{new Date(appointment.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{appointment.time} ({appointment.duration} min)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {appointment.mode === 'presentiel' && <MapPin className="h-4 w-4 text-primary" />}
                              {appointment.mode === 'telephone' && <Phone className="h-4 w-4 text-primary" />}
                              {appointment.mode === 'visio' && <Activity className="h-4 w-4 text-primary" />}
                              <span className="capitalize">{appointment.mode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{appointment.price}€</span>
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm">
                              <p className="text-muted-foreground">{appointment.notes}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2 lg:w-40">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleAppointmentAction(appointment.id, 'edit')}
                          >
                            <Edit className="h-4 w-4" />
                            Modifier
                          </Button>
                          
                          {appointment.status === 'en_attente' && (
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="gap-2"
                              onClick={() => handleAppointmentAction(appointment.id, 'confirm')}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Confirmer
                            </Button>
                          )}
                          
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleAppointmentAction(appointment.id, 'cancel')}
                          >
                            <XCircle className="h-4 w-4" />
                            Annuler
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;