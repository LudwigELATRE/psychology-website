import React from 'react';
import { AppointmentCalendar } from '@/components/AppointmentCalendar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CalendarDemo: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Démonstration du Calendrier
            </h1>
            <p className="text-muted-foreground">
              Calendrier de rendez-vous avec toutes les fonctionnalités
            </p>
          </div>
          
          <AppointmentCalendar
            onSelectEvent={(event) => {
              console.log('Event selected:', event);
            }}
            onSelectSlot={(slotInfo) => {
              console.log('Slot selected:', slotInfo);
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarDemo;