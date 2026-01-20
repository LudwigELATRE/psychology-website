import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import {
  Users,
  Brain,
  Heart,
  Baby,
  Briefcase,
  UserCheck,
  Clock,
  MapPin
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Thérapie individuelle",
      description: "Accompagnement personnalisé pour adultes dans la gestion du stress, de l'anxiété, de la dépression et des troubles de l'humeur.",
      features: ["Séances de 50 minutes", "Approche personnalisée", "Rythme adapté"],
      price: "70€"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Bilan neuropsychologique",
      description: "Évaluation complète des fonctions cognitives : mémoire, attention, fonctions exécutives et langage.",
      features: ["Tests standardisés", "Rapport détaillé", "Recommandations thérapeutiques"],
      price: "180€"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Prise en charge TCC",
      description: "Thérapie cognitivo-comportementale pour traiter anxiété, dépression, phobies et troubles obsessionnels.",
      features: ["Approche structurée", "Exercices pratiques", "Suivi des progrès"],
      price: "75€"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Réhabilitation neuropsychologique",
      description: "Rééducation des fonctions cognitives après traumatisme crânien, AVC ou maladie neurodégénérative.",
      features: ["Programme personnalisé", "Exercices ciblés", "Suivi familial"],
      price: "85€"
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Suivi à Domicile fin de vie ou Personne âgée",
      description: "Accompagnement psychologique à domicile pour personnes âgées et en fin de vie, incluant le soutien familial.",
      features: ["Déplacement à domicile", "Soutien familial", "Approche bienveillante"],
      price: "90€"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Inscription au groupe parole",
      description: "Séances collectives thématiques pour partager et apprendre ensemble dans un cadre sécurisé.",
      features: ["Petit groupe (6-8 pers.)", "Thèmes variés", "Entraide mutuelle"],
      price: "35€"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Mes services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un accompagnement adapté à vos besoins spécifiques, 
            dans un cadre professionnel et bienveillant.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              price={service.price}
            />
          ))}
        </div>

        {/* Informations pratiques */}
        <div className="bg-gradient-subtle rounded-3xl p-8 shadow-gentle">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Informations pratiques</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Horaires</p>
                    <p className="text-sm text-muted-foreground">Lun-Ven: 9h-19h | Sam: 9h-13h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Localisation</p>
                    <p className="text-sm text-muted-foreground">15 Avenue des Champs, 75008 Paris</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Modalités</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Consultations sur rendez-vous uniquement</li>
                <li>• Possibilité de téléconsultation</li>
                <li>• Paiement par chèque, espèces ou carte</li>
                <li>• Remboursement possible selon votre mutuelle</li>
                <li>• Annulation 24h avant sans frais</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button variant="hero" size="lg">
              Prendre rendez-vous dès maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;