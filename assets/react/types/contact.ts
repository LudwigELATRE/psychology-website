export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consultationType: string;
  message: string;
  confidentialityAccepted: boolean;
}

export interface ContactApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  consultationType: string;
  message?: string;
  confidentialityAccepted: boolean;
  createdAt: string;
  processed: boolean;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  consultationType?: string;
  message?: string;
  confidentialityAccepted?: string;
  general?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';