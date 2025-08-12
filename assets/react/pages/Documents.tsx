import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Lock, Gift, BookOpen, Brain, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Documents = () => {
  const documentsGratuits = [
    {
      title: "Guide de gestion de l'anxiété",
      description: "Techniques pratiques pour gérer l'anxiété au quotidien",
      type: "PDF",
      pages: "12 pages",
      category: "Anxiété"
    },
    {
      title: "Exercices de respiration",
      description: "5 exercices de respiration pour retrouver le calme",
      type: "PDF",
      pages: "8 pages",
      category: "Relaxation"
    },
    {
      title: "Journal de gratitude",
      description: "Template pour tenir un journal de gratitude",
      type: "PDF",
      pages: "6 pages",
      category: "Bien-être"
    },
    {
      title: "Checklist hygiène de vie",
      description: "Liste des bonnes pratiques pour un équilibre mental",
      type: "PDF",
      pages: "4 pages",
      category: "Prévention"
    }
  ];

  const documentsPayants = [
    {
      title: "Programme TCC Anxiété Complète",
      description: "Programme thérapeutique complet de 12 semaines avec exercices pratiques",
      type: "Pack PDF + Audio",
      pages: "80 pages + 6 audio",
      price: "49€",
      category: "TCC"
    },
    {
      title: "Guide Neuropsychologie Clinique",
      description: "Manuel complet d'évaluation et de réhabilitation neuropsychologique",
      type: "PDF + Outils",
      pages: "150 pages + tests",
      price: "89€",
      category: "Neuropsychologie"
    },
    {
      title: "Protocoles d'intervention en traumatisme",
      description: "Protocoles thérapeutiques pour le traitement des traumatismes",
      type: "PDF + Vidéos",
      pages: "60 pages + 4 vidéos",
      price: "75€",
      category: "Traumatisme"
    },
    {
      title: "Outils d'évaluation psychologique",
      description: "Collection d'outils d'évaluation validés scientifiquement",
      type: "Pack PDF",
      pages: "200 pages",
      price: "129€",
      category: "Évaluation"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Anxiété":
      case "TCC":
        return <Heart className="w-4 h-4" />;
      case "Neuropsychologie":
      case "Évaluation":
        return <Brain className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Documents & <span className="bg-gradient-hero bg-clip-text text-transparent">Ressources</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Accédez à une bibliothèque de ressources thérapeutiques, guides pratiques 
                et outils professionnels pour votre pratique et votre bien-être.
              </p>
            </div>
          </div>
        </section>

        {/* Documents Tabs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="gratuits" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="gratuits" className="flex items-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Documents Gratuits</span>
                </TabsTrigger>
                <TabsTrigger value="payants" className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Documents Premium</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gratuits">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documentsGratuits.map((doc, index) => (
                    <Card key={index} className="bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            {getCategoryIcon(doc.category)}
                            <span>{doc.category}</span>
                          </Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Gratuit
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-foreground">{doc.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {doc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>{doc.pages}</span>
                        </div>
                        <Button className="w-full group" variant="outline">
                          <Download className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                          Télécharger gratuitement
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payants">
                <div className="grid md:grid-cols-2 gap-6">
                  {documentsPayants.map((doc, index) => (
                    <Card key={index} className="bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="default" className="flex items-center space-x-1">
                            {getCategoryIcon(doc.category)}
                            <span>{doc.category}</span>
                          </Badge>
                          <div className="text-xl font-bold text-primary">{doc.price}</div>
                        </div>
                        <CardTitle className="text-xl text-foreground">{doc.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {doc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>{doc.pages}</span>
                        </div>
                        <Button className="w-full group">
                          <Lock className="w-4 h-4 mr-2" />
                          Acheter et télécharger
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-card">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Besoin d'un document personnalisé ?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Je peux créer des documents sur mesure adaptés à vos besoins spécifiques. 
                Protocoles thérapeutiques, guides d'évaluation, supports pédagogiques...
              </p>
              <Button size="lg" className="group">
                Demander un document personnalisé
                <FileText className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Documents;