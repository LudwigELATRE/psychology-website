import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType, LoginFormData, RegisterFormData } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérification du token au chargement
  useEffect(() => {
    const checkAuth = async () => {
      // Vérifier d'abord les paramètres URL pour l'auth Google
      const urlParams = new URLSearchParams(window.location.search);
      const authSuccess = urlParams.get('auth_success');
      const urlToken = urlParams.get('token');
      const urlUserData = urlParams.get('user');

      if (authSuccess === '1' && urlToken && urlUserData) {
        console.log('🔍 Détection auth Google:', { authSuccess, urlToken: urlToken.substring(0, 20) + '...', urlUserData: urlUserData.substring(0, 50) + '...' });
        try {
          // Décoder les données utilisateur
          const userData = JSON.parse(atob(decodeURIComponent(urlUserData)));
          console.log('✅ Données utilisateur décodées:', userData);
          
          // Sauvegarder le token et les données utilisateur
          localStorage.setItem('auth_token', urlToken);
          localStorage.setItem('user_data', JSON.stringify(userData));
          console.log('💾 Token et données sauvegardés');
          
          setUser(userData);
          console.log('👤 Utilisateur défini dans le state');
          
          // Nettoyer l'URL
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
          console.log('🧹 URL nettoyée');
          
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('❌ Erreur lors du traitement des données Google:', error);
        }
      }

      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await fetch('/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token invalide, nettoyer le localStorage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          }
        } catch (error) {
          // Erreur réseau, utiliser les données en cache
          const cachedUserData = localStorage.getItem('user_data');
          if (cachedUserData) {
            setUser(JSON.parse(cachedUserData));
          }
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const responseData = await response.json();
      
      // Sauvegarder le token et les données utilisateur
      localStorage.setItem('auth_token', responseData.token);
      localStorage.setItem('user_data', JSON.stringify(responseData.user));
      
      setUser(responseData.user);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData): Promise<void> => {
    setIsLoading(true);
    try {
      // Validation côté client
      if (data.password !== data.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur d\'inscription');
      }

      const responseData = await response.json();
      
      // Sauvegarder le token et les données utilisateur
      localStorage.setItem('auth_token', responseData.token);
      localStorage.setItem('user_data', JSON.stringify(responseData.user));
      
      setUser(responseData.user);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erreur d\'inscription');
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  // Debug log
  console.log('🔐 AuthContext state:', { user: user ? `${user.firstName} ${user.lastName}` : null, isAuthenticated: !!user, isLoading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};