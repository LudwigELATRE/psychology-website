import { useState } from 'react';
import type { ContactFormData, FormErrors, FormStatus } from '@/types/contact';

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  consultationType: 'Thérapie individuelle',
  message: '',
  confidentialityAccepted: false,
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
    }

    // Validation nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez saisir un email valide';
    }

    // Validation téléphone (optionnel mais format si renseigné)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Veuillez saisir un numéro de téléphone valide';
      }
    }

    // Validation type de consultation
    const validTypes = [
      'Thérapie individuelle',
      'Thérapie de couple',
      'Psychologie de l\'enfant',
      'Accompagnement professionnel',
      'Évaluation psychologique',
      'Autre'
    ];
    if (!validTypes.includes(formData.consultationType)) {
      newErrors.consultationType = 'Veuillez sélectionner un type de consultation valide';
    }

    // Validation confidentialité
    if (!formData.confidentialityAccepted) {
      newErrors.confidentialityAccepted = 'Vous devez accepter les conditions de confidentialité';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
      }

      setStatus('success');
      setFormData(initialFormData); // Reset form
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setErrors({
        general: error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue lors de l\'envoi du formulaire'
      });
      setStatus('error');
      return false;
    }
  };

  const updateField = <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setStatus('idle');
  };

  return {
    formData,
    errors,
    status,
    updateField,
    submitForm,
    resetForm,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};