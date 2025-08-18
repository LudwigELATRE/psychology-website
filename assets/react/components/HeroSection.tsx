import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Clock } from "lucide-react";
const therapyOfficeImage = "/images/therapy-office.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center bg-gradient-subtle pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Cabinet d'accompagnement
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  psychologique
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Je propose un accompagnement thérapeutique spécialisé pour vous aider 
                à surmonter les difficultés psychologiques et retrouver un bien-être durable. 
                Mon approche clinique vise à traiter les troubles anxieux, dépressifs et traumatiques.
              </p>
            </div>

            {/* Points clés */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Écoute active</h3>
                  <p className="text-sm text-muted-foreground">Bienveillante</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Confidentialité</h3>
                  <p className="text-sm text-muted-foreground">Garantie</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Disponibilité</h3>
                  <p className="text-sm text-muted-foreground">Flexible</p>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="group"
              >
                Prendre rendez-vous
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="gentle" 
                size="lg"
                onClick={() => scrollToSection('services')}
              >
                Découvrir mes services
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-gradient-card rounded-3xl p-8 shadow-soft">
                <img 
                  src={therapyOfficeImage}
                  alt="Cabinet de psychologie"
                  className="w-full h-96 object-cover rounded-2xl shadow-gentle"
                />
                <div className="absolute -bottom-4 -right-4 bg-background rounded-2xl p-4 shadow-hover border border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">3+</p>
                    <p className="text-sm text-muted-foreground">Années d'expérience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;