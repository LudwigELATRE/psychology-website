import { Button } from "@/components/ui/button";
import { Phone, Menu, LogIn } from "lucide-react";
import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { UserMenu } from "@/components/auth/UserMenu";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-gentle">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Nom */}
          <div className="flex items-center space-x-2">
            <a
              href="/app"
              className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <span className="text-primary-foreground font-bold text-xl">MD</span>
            </a>
            <div>
              <a
                href="/app"
                className="text-xl font-bold text-foreground hover:text-primary transition-colors"
              >
                Maëva DIVAD
              </a>
              <p className="text-sm text-muted-foreground">Psychologue clinicienne</p>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Formations
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Documents
            </a>
            <button
              onClick={() => scrollToSection('apropos')}
              className="text-foreground hover:text-primary transition-colors"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Contact rapide et authentification */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <LoginModal>
                <Button variant="default" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </LoginModal>
            ) : (
              <UserMenu />
            )}
          </div>

          {/* Menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Menu mobile ouvert */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border bg-gradient-subtle rounded-lg">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Services
              </button>
              <a
                href="#"
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Formations test
              </a>
              <button
                onClick={() => scrollToSection('apropos')}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
              <div className="px-4 pt-2 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                  <Phone className="w-4 h-4" />
                  <span>01 23 45 67 89</span>
                </div>
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full mb-3"
                  onClick={() => scrollToSection('contact')}
                >
                  Prendre RDV
                </Button>

                {!isAuthenticated ? (
                  <LoginModal>
                    <Button variant="default" size="sm" className="w-full">
                      <LogIn className="w-4 h-4 mr-2" />
                      Connexion
                    </Button>
                  </LoginModal>
                ) : (
                  <div className="flex justify-center">
                    <UserMenu />
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
