import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Clock, Euro, ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Formations = () => {
  const formations = [
    {
      title: "Formation TCC - Thérapie Cognitive et Comportementale",
      description: "Formation complète aux techniques de TCC pour professionnels de santé mentale",
      duration: "40 heures",
      participants: "Max 12 personnes",
      price: "Sur devis",
      category: "Professionnels",
      highlights: ["Certification incluse", "Supervision pratique", "Supports pédagogiques"]
    },
    {
      title: "Atelier de Gestion du Stress",
      description: "Workshop pratique pour apprendre les techniques de gestion du stress et de l'anxiété",
      duration: "6 heures",
      participants: "Max 8 personnes",
      price: "180€",
      category: "Particuliers",
      highlights: ["Techniques pratiques", "Exercices personnalisés", "Suivi post-atelier"]
    },
    {
      title: "Formation Neuropsychologie",
      description: "Approches modernes en neuropsychologie clinique et réhabilitation cognitive",
      duration: "24 heures",
      participants: "Max 10 personnes",
      price: "Sur devis",
      category: "Professionnels",
      highlights: ["Cas pratiques", "Outils d'évaluation", "Méthodes de réhabilitation"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Formations & <span className="bg-gradient-hero bg-clip-text text-transparent">Ateliers</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Développez vos compétences en psychologie clinique et thérapie. 
                Formations certifiantes pour professionnels et ateliers pratiques pour particuliers.
              </p>
            </div>
          </div>
        </section>

        {/* Formations Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.map((formation, index) => (
                <Card key={index} className="bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={formation.category === "Professionnels" ? "default" : "secondary"}>
                        {formation.category}
                      </Badge>
                      <div className="text-2xl font-bold text-primary">{formation.price}</div>
                    </div>
                    <CardTitle className="text-xl text-foreground">{formation.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {formation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">{formation.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">{formation.participants}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-secondary" />
                        Points clés
                      </h4>
                      <ul className="space-y-1">
                        {formation.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <ArrowRight className="w-3 h-3 mr-2 text-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full group">
                      Demander un devis
                      <Euro className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Formation */}
        <section className="py-20 bg-gradient-card">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Formation sur mesure
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Vous avez des besoins spécifiques ? Je propose des formations personnalisées 
                adaptées à votre structure et vos objectifs. Contactez-moi pour établir un devis sur mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  Demander un devis personnalisé
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Voir les modalités
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Formations;