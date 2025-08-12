import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar,
  Send,
  Car,
  Train,
  Shield
} from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log("Formulaire soumis");
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Prendre rendez-vous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour toute question ou pour planifier votre première consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <Send className="w-6 h-6 mr-3 text-primary" />
                Demande de rendez-vous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Prénom *</label>
                    <Input placeholder="Votre prénom" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nom *</label>
                    <Input placeholder="Votre nom" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <Input type="email" placeholder="votre@email.com" required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Téléphone</label>
                  <Input type="tel" placeholder="01 23 45 67 89" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type de consultation</label>
                  <select className="w-full p-3 border border-input rounded-md bg-background">
                    <option>Thérapie individuelle</option>
                    <option>Thérapie de couple</option>
                    <option>Psychologie de l'enfant</option>
                    <option>Accompagnement professionnel</option>
                    <option>Évaluation psychologique</option>
                    <option>Autre</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea 
                    placeholder="Décrivez brièvement le motif de votre consultation..." 
                    rows={4}
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="confidentiality" className="mt-1" required />
                  <label htmlFor="confidentiality" className="text-sm text-muted-foreground">
                    Je comprends que toutes les informations partagées seront traitées de manière strictement confidentielle *
                  </label>
                </div>
                
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Envoyer ma demande
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations de contact et pratiques */}
          <div className="space-y-8">
            {/* Contact direct */}
            <Card className="bg-gradient-subtle shadow-gentle">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Contact direct</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Téléphone</p>
                    <p className="text-muted-foreground">01 23 45 67 89</p>
                    <p className="text-xs text-muted-foreground">Lun-Ven: 9h-19h</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">marie.petit@psychologue.fr</p>
                    <p className="text-xs text-muted-foreground">Réponse sous 24h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localisation */}
            <Card className="bg-gradient-card shadow-gentle">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-primary" />
                  Cabinet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground">Adresse</p>
                  <p className="text-muted-foreground">15 Avenue des Champs</p>
                  <p className="text-muted-foreground">75008 Paris</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Train className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Métro: Franklin D. Roosevelt (L1, L9)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Parking payant disponible</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horaires */}
            <Card className="bg-gradient-subtle shadow-gentle">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-primary" />
                  Horaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">Lundi - Vendredi</span>
                    <span className="text-muted-foreground">9h00 - 19h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Samedi</span>
                    <span className="text-muted-foreground">9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Dimanche</span>
                    <span className="text-muted-foreground">Fermé</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations importantes */}
            <Card className="bg-primary/5 border-primary/20 shadow-gentle">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Confidentialité</h3>
                    <p className="text-sm text-muted-foreground">
                      En tant que psychologue diplômée d'État, je suis tenue au secret professionnel. 
                      Toutes nos échanges resteront strictement confidentiels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;