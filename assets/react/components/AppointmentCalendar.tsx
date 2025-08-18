import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, momentLocalizer, Event, View, SlotInfo } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  Video,
  Phone,
  Save,
  X
} from 'lucide-react';

// Configuration de moment en français
moment.locale('fr');
const localizer = momentLocalizer(moment);

// Calendar avec drag and drop
const DnDCalendar = withDragAndDrop(Calendar);

// Types
interface AppointmentEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  patientName: string;
  patientEmail: string;
  type: 'consultation' | 'suivi' | 'premiere';
  mode: 'presentiel' | 'visio' | 'telephone';
  status: 'confirme' | 'en_attente' | 'annule' | 'termine';
  notes?: string;
  price: number;
}

interface AppointmentCalendarProps {
  events?: AppointmentEvent[];
  onSelectEvent?: (event: AppointmentEvent) => void;
  onSelectSlot?: (slotInfo: SlotInfo) => void;
  onEventDrop?: (event: AppointmentEvent) => void;
  onEventResize?: (event: AppointmentEvent) => void;
  onCreateEvent?: (event: Partial<AppointmentEvent>) => void;
  onUpdateEvent?: (event: AppointmentEvent) => void;
  onDeleteEvent?: (eventId: string) => void;
}

interface EventFormData {
  id?: string;
  title: string;
  patientName: string;
  patientEmail: string;
  start: string;
  end: string;
  type: AppointmentEvent['type'];
  mode: AppointmentEvent['mode'];
  status: AppointmentEvent['status'];
  notes: string;
  price: number;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  events = [],
  onSelectEvent,
  onSelectSlot,
  onEventDrop,
  onEventResize,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent
}) => {
  const { toast } = useToast();
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AppointmentEvent | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    patientName: '',
    patientEmail: '',
    start: '',
    end: '',
    type: 'consultation',
    mode: 'presentiel',
    status: 'en_attente',
    notes: '',
    price: 80
  });

  // Messages en français
  const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: 'Aujourd\'hui',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    noEventsInRange: 'Aucun événement dans cette période',
    showMore: (total: number) => `+${total} de plus`
  };

  // Données d'exemple si aucun événement n'est fourni
  const defaultEvents: AppointmentEvent[] = useMemo(() => [
    {
      id: '1',
      title: 'Consultation - Marie Dupont',
      start: new Date(2025, 7, 20, 14, 0), // 20 août 2025, 14h00
      end: new Date(2025, 7, 20, 15, 0),   // 20 août 2025, 15h00
      patientName: 'Marie Dupont',
      patientEmail: 'marie.dupont@email.com',
      type: 'consultation',
      mode: 'presentiel',
      status: 'confirme',
      notes: 'Suivi thérapeutique',
      price: 80
    },
    {
      id: '2',
      title: 'Suivi - Jean Martin',
      start: new Date(2025, 7, 22, 10, 30), // 22 août 2025, 10h30
      end: new Date(2025, 7, 22, 11, 15),   // 22 août 2025, 11h15
      patientName: 'Jean Martin',
      patientEmail: 'jean.martin@email.com',
      type: 'suivi',
      mode: 'visio',
      status: 'confirme',
      notes: 'Séance de suivi en ligne',
      price: 70
    },
    {
      id: '3',
      title: 'Première consultation - Sophie Bernard',
      start: new Date(2025, 7, 25, 16, 0), // 25 août 2025, 16h00
      end: new Date(2025, 7, 25, 17, 0),   // 25 août 2025, 17h00
      patientName: 'Sophie Bernard',
      patientEmail: 'sophie.bernard@email.com',
      type: 'premiere',
      mode: 'presentiel',
      status: 'en_attente',
      notes: 'Première consultation - bilan initial',
      price: 90
    }
  ], []);

  const calendarEvents = events.length > 0 ? events : defaultEvents;

  // Style des événements selon le type
  const eventStyleGetter = useCallback((event: AppointmentEvent) => {
    let backgroundColor = '#3174ad';
    let borderColor = '#3174ad';

    switch (event.type) {
      case 'premiere':
        backgroundColor = '#10b981'; // Green
        borderColor = '#10b981';
        break;
      case 'consultation':
        backgroundColor = '#3b82f6'; // Blue
        borderColor = '#3b82f6';
        break;
      case 'suivi':
        backgroundColor = '#8b5cf6'; // Purple
        borderColor = '#8b5cf6';
        break;
    }

    if (event.status === 'annule') {
      backgroundColor = '#ef4444'; // Red
      borderColor = '#ef4444';
    } else if (event.status === 'en_attente') {
      backgroundColor = '#f59e0b'; // Orange
      borderColor = '#f59e0b';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '6px',
        opacity: event.status === 'annule' ? 0.6 : 1,
        color: 'white',
        fontWeight: '500',
        fontSize: '13px',
        padding: '2px 6px'
      }
    };
  }, []);

  // Composant personnalisé pour l'événement
  const EventComponent = ({ event }: { event: AppointmentEvent }) => (
    <div className="flex items-center gap-1 text-xs">
      {event.mode === 'visio' && <Video className="h-3 w-3" />}
      {event.mode === 'telephone' && <Phone className="h-3 w-3" />}
      {event.mode === 'presentiel' && <MapPin className="h-3 w-3" />}
      <span className="truncate">{event.title}</span>
    </div>
  );

  // Gestion de la sélection d'un événement
  const handleSelectEvent = useCallback((event: AppointmentEvent) => {
    setEditingEvent(event);
    setFormData({
      id: event.id,
      title: event.title,
      patientName: event.patientName,
      patientEmail: event.patientEmail,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      type: event.type,
      mode: event.mode,
      status: event.status,
      notes: event.notes || '',
      price: event.price
    });
    setShowModal(true);
    onSelectEvent?.(event);
  }, [onSelectEvent]);

  // Gestion de la sélection d'un créneau
  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setEditingEvent(null);
    setFormData({
      title: '',
      patientName: '',
      patientEmail: '',
      start: moment(slotInfo.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(slotInfo.end).format('YYYY-MM-DDTHH:mm'),
      type: 'consultation',
      mode: 'presentiel',
      status: 'en_attente',
      notes: '',
      price: 80
    });
    setShowModal(true);
    onSelectSlot?.(slotInfo);
  }, [onSelectSlot]);

  // Gestion du drag & drop
  const handleEventDrop = useCallback((args: any) => {
    const { event, start, end } = args;
    const updatedEvent = { ...event, start, end };
    onEventDrop?.(updatedEvent);
    toast({
      title: "Rendez-vous déplacé",
      description: "Le rendez-vous a été déplacé avec succès.",
    });
  }, [onEventDrop, toast]);

  // Gestion du resize
  const handleEventResize = useCallback((args: any) => {
    const { event, start, end } = args;
    const updatedEvent = { ...event, start, end };
    onEventResize?.(updatedEvent);
    toast({
      title: "Rendez-vous modifié",
      description: "La durée du rendez-vous a été modifiée.",
    });
  }, [onEventResize, toast]);

  // Navigation
  const navigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const goToBack = useCallback(() => {
    if (view === 'month') {
      setDate(moment(date).subtract(1, 'month').toDate());
    } else if (view === 'week') {
      setDate(moment(date).subtract(1, 'week').toDate());
    } else {
      setDate(moment(date).subtract(1, 'day').toDate());
    }
  }, [date, view]);

  const goToNext = useCallback(() => {
    if (view === 'month') {
      setDate(moment(date).add(1, 'month').toDate());
    } else if (view === 'week') {
      setDate(moment(date).add(1, 'week').toDate());
    } else {
      setDate(moment(date).add(1, 'day').toDate());
    }
  }, [date, view]);

  const goToToday = useCallback(() => {
    setDate(new Date());
  }, []);

  // Gestion du formulaire
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData: Partial<AppointmentEvent> = {
      id: formData.id || Date.now().toString(),
      title: formData.title || `${formData.type} - ${formData.patientName}`,
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      start: new Date(formData.start),
      end: new Date(formData.end),
      type: formData.type,
      mode: formData.mode,
      status: formData.status,
      notes: formData.notes,
      price: formData.price
    };

    if (editingEvent) {
      onUpdateEvent?.(eventData as AppointmentEvent);
      toast({
        title: "Rendez-vous modifié",
        description: "Le rendez-vous a été modifié avec succès.",
      });
    } else {
      onCreateEvent?.(eventData);
      toast({
        title: "Rendez-vous créé",
        description: "Le nouveau rendez-vous a été créé avec succès.",
      });
    }

    setShowModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = () => {
    if (editingEvent) {
      onDeleteEvent?.(editingEvent.id);
      toast({
        title: "Rendez-vous supprimé",
        description: "Le rendez-vous a été supprimé avec succès.",
        variant: "destructive"
      });
      setShowModal(false);
      setEditingEvent(null);
    }
  };

  const getViewTitle = () => {
    if (view === 'month') {
      return moment(date).format('MMMM YYYY');
    } else if (view === 'week') {
      const start = moment(date).startOf('week');
      const end = moment(date).endOf('week');
      return `${start.format('DD MMM')} - ${end.format('DD MMM YYYY')}`;
    } else {
      return moment(date).format('dddd DD MMMM YYYY');
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Planning des rendez-vous
            </CardTitle>
            <CardDescription>
              Gérez vos rendez-vous avec une interface de calendrier interactive
            </CardDescription>
          </div>
          
          <Button 
            onClick={() => handleSelectSlot({ start: new Date(), end: new Date() } as SlotInfo)} 
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouveau RDV
          </Button>
        </div>

        {/* Toolbar personnalisée */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Aujourd'hui
            </Button>
            <Button variant="outline" size="sm" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="ml-4 font-semibold text-lg">
              {getViewTitle()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
            >
              Mois
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
            >
              Semaine
            </Button>
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('day')}
            >
              Jour
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[600px]">
          <DnDCalendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view}
            onView={setView}
            date={date}
            onNavigate={navigate}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            selectable
            resizable
            eventPropGetter={eventStyleGetter}
            components={{
              event: EventComponent
            }}
            messages={messages}
            formats={{
              timeGutterFormat: 'HH:mm',
              eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                localizer?.format(start, 'HH:mm', culture) + ' - ' + localizer?.format(end, 'HH:mm', culture),
              dayFormat: 'dddd DD/MM',
              dayHeaderFormat: 'dddd DD/MM',
              dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
                localizer?.format(start, 'DD/MM', culture) + ' - ' + localizer?.format(end, 'DD/MM', culture)
            }}
            step={15}
            timeslots={4}
            min={new Date(2025, 7, 20, 8, 0, 0)}
            max={new Date(2025, 7, 20, 20, 0, 0)}
          />
        </div>

        {/* Légende */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Première consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm">Suivi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm">En attente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Annulé</span>
          </div>
        </div>
      </CardContent>

      {/* Modal de création/édition */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
            </DialogTitle>
            <DialogDescription>
              {editingEvent ? 'Modifiez les informations du rendez-vous.' : 'Créez un nouveau rendez-vous.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nom du patient</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientEmail">Email</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start">Début</Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">Fin</Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value: AppointmentEvent['type']) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premiere">Première consultation</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="suivi">Suivi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mode">Mode</Label>
                <Select value={formData.mode} onValueChange={(value: AppointmentEvent['mode']) => setFormData({ ...formData, mode: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presentiel">Présentiel</SelectItem>
                    <SelectItem value="visio">Visioconférence</SelectItem>
                    <SelectItem value="telephone">Téléphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value: AppointmentEvent['status']) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en_attente">En attente</SelectItem>
                    <SelectItem value="confirme">Confirmé</SelectItem>
                    <SelectItem value="termine">Terminé</SelectItem>
                    <SelectItem value="annule">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <DialogFooter className="flex justify-between">
              <div>
                {editingEvent && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={handleDeleteEvent}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  {editingEvent ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};