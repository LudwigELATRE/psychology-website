import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Users, Calendar } from "lucide-react";
const psychologistPortrait = "/images/psychologist-portrait.jpg";

const AboutSection = () => {
  const formations = [
    "Master en Psychologie Clinique - Université Paris Descartes",
    "Spécialisation en Thérapies Cognitivo-Comportementales",
    "Formation en Thérapie de Couple et Famille",
    "Certification en Psychologie de l'Enfant et de l'Adolescent"
  ];

  const specialities = [
    "Anxiété et troubles de l'humeur",
    "Burn-out et stress professionnel", 
    "Thérapie de couple",
    "Psychologie de l'enfant",
    "Troubles du comportement",
    "Accompagnement au deuil"
  ];

  const stats = [
    { icon: <Calendar className="w-6 h-6" />, value: "3+", label: "Années d'expérience" },
    { icon: <Users className="w-6 h-6" />, value: "1200+", label: "Patients accompagnés" },
    { icon: <Award className="w-6 h-6" />, value: "4", label: "Certifications" },
    { icon: <GraduationCap className="w-6 h-6" />, value: "Formation", label: "Continue" }
  ];

  return (
    <section id="apropos" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo et statistiques */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-3xl transform -rotate-3 opacity-20"></div>
              <div className="relative bg-background rounded-3xl p-8 shadow-soft">
                <img 
                  src={psychologistPortrait}
                  alt="Maëva DIVAD, Psychologue"
                  className="w-full h-96 object-cover rounded-2xl shadow-gentle"
                />
                <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl p-4 shadow-hover border border-border">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-primary">Maëva DIVAD: 759365478</p>
                    <p className="text-xs text-muted-foreground">Psychologue agréée</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gradient-card shadow-gentle hover:shadow-soft transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground mx-auto mb-3">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contenu textuel */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Maëva DIVAD
              </h2>
              <p className="text-xl text-primary font-semibold">
                Psychologue clinicienne psychothérapeute TCC
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Passionnée par l'accompagnement humain depuis plus de 15 ans, 
                j'ai consacré ma carrière à aider mes patients à surmonter leurs difficultés 
                et à retrouver un équilibre de vie. Mon approche se base sur l'écoute active, 
                la bienveillance et des méthodes thérapeutiques éprouvées.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Je crois fermement que chaque personne possède en elle les ressources 
                nécessaires pour aller mieux. Mon rôle est de vous accompagner dans 
                cette découverte, à votre rythme et dans le respect de votre singularité.
              </p>
            </div>

            {/* Formation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-primary" />
                Formation et diplômes
              </h3>
              <ul className="space-y-2">
                {formations.map((formation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{formation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spécialités */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center">
                <Award className="w-6 h-6 mr-3 text-primary" />
                Spécialités
              </h3>
              <div className="flex flex-wrap gap-3">
                {specialities.map((speciality, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {speciality}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Citation */}
            <div className="bg-gradient-card rounded-2xl p-6 shadow-gentle border-l-4 border-primary">
              <blockquote className="text-foreground italic text-lg">
                "L'objectif n'est pas de changer qui vous êtes, mais de vous aider 
                à devenir la meilleure version de vous-même."
              </blockquote>
              <cite className="text-sm text-muted-foreground mt-2 block">- Maëva DIVAD</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;