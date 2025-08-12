import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">MP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Dr. Marie Petit</h3>
                <p className="text-sm opacity-80">Psychologue clinicienne</p>
              </div>
            </div>
            <p className="text-sm opacity-75 leading-relaxed">
              Un accompagnement bienveillant et professionnel pour vous aider 
              à surmonter vos difficultés et retrouver votre équilibre de vie.
            </p>
          </div>

          {/* Contact rapide */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 opacity-75" />
                <span className="text-sm">01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 opacity-75" />
                <span className="text-sm">marie.petit@psychologue.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 opacity-75" />
                <span className="text-sm">15 Avenue des Champs, 75008 Paris</span>
              </div>
            </div>
          </div>

          {/* Informations légales */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Informations</h4>
            <div className="space-y-2 text-sm opacity-75">
              <p>N° ADELI: 759365478</p>
              <p>SIRET: 123 456 789 00012</p>
              <p>Diplômée d'État</p>
              <p>Membre du syndicat national des psychologues</p>
            </div>
          </div>
        </div>

        {/* Séparateur et copyright */}
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-75">
              © 2024 Dr. Marie Petit - Tous droits réservés
            </p>
            <div className="flex items-center space-x-4 text-sm opacity-75">
              <a href="#" className="hover:opacity-100 transition-opacity">Mentions légales</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Politique de confidentialité</a>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-4 text-sm opacity-60">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>pour accompagner votre bien-être</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;