import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar,
  Send,
  Car,
  Train,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";

const ContactSection = () => {
  const {
    formData,
    errors,
    status,
    updateField,
    submitForm,
    resetForm,
    isSubmitting,
    isSuccess,
    isError,
  } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
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
              {/* Messages de feedback */}
              {isSuccess && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="text-green-800">
                    <h4 className="font-medium">Message envoyé avec succès !</h4>
                    <p className="text-sm mt-1">Je vous recontacterai dans les plus brefs délais.</p>
                  </div>
                </Alert>
              )}

              {isError && errors.general && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <div>
                    <h4 className="font-medium">Erreur</h4>
                    <p className="text-sm mt-1">{errors.general}</p>
                  </div>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Prénom *</label>
                    <Input 
                      placeholder="Votre prénom" 
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nom *</label>
                    <Input 
                      placeholder="Votre nom" 
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <Input 
                    type="email" 
                    placeholder="votre@email.com" 
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Téléphone</label>
                  <Input 
                    type="tel" 
                    placeholder="01 23 45 67 89" 
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type de consultation</label>
                  <select 
                    className={`w-full p-3 border border-input rounded-md bg-background ${errors.consultationType ? 'border-red-500' : ''}`}
                    value={formData.consultationType}
                    onChange={(e) => updateField('consultationType', e.target.value)}
                  >
                    <option value="Thérapie individuelle">Thérapie individuelle</option>
                    <option value="Thérapie de couple">Thérapie de couple</option>
                    <option value="Psychologie de l'enfant">Psychologie de l'enfant</option>
                    <option value="Accompagnement professionnel">Accompagnement professionnel</option>
                    <option value="Évaluation psychologique">Évaluation psychologique</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {errors.consultationType && (
                    <p className="text-sm text-red-500 mt-1">{errors.consultationType}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea 
                    placeholder="Décrivez brièvement le motif de votre consultation..." 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>
                
                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    id="confidentiality" 
                    className="mt-1" 
                    checked={formData.confidentialityAccepted}
                    onChange={(e) => updateField('confidentialityAccepted', e.target.checked)}
                  />
                  <label htmlFor="confidentiality" className="text-sm text-muted-foreground">
                    Je comprends que toutes les informations partagées seront traitées de manière strictement confidentielle *
                  </label>
                </div>
                {errors.confidentialityAccepted && (
                  <p className="text-sm text-red-500 mt-1">{errors.confidentialityAccepted}</p>
                )}
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
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