import { createContext, useContext } from 'react';
import axios from 'axios';

interface ContactFormData {
  ID_Contact: string;
  Nom: string;
  Email: string;
  Sujet: string;
  Message: string;
}

interface ReservationFormData {
  ID_Reservation: string;
  ID_Rooms: string;
  People: number;
  Date_Debut: string;
  Date_Fin: string;
  Duree: number;
}

interface AuthContextType {
  submitContactForm: (nom: string, email: string, sujet: string, message: string) => void;
  submitReservationForm: (formData: ReservationFormData) => void;
}

const AuthContext = createContext<AuthContextType>({
  submitContactForm: () => {},
  submitReservationForm: () => {},
});

export const useClient = () => useContext(AuthContext);

export const ClientProvider: React.FC = ({ children }) => {
  const submitContactForm = async (nom: string, email: string, sujet: string, message: string) => {
    const formData: ContactFormData = {
      ID_Contact: '',
      Nom: nom,
      Email: email,
      Sujet: sujet,
      Message: message,
    };

    try {
      // Make an HTTP request to submit the contact form data
      await axios.post('http://localhost:7000/contacts', formData);
      console.log('Contact form submitted successfully');
      // Handle success, show confirmation message, etc.
    } catch (error) {
      console.error('Contact form submission failed:', error);
      // Handle submission failure, show error message, etc.
    }
  };

  const submitReservationForm = async (formData: ReservationFormData) => {
    try {
      // Make an HTTP request to submit the reservation form data
      await axios.post('http://localhost:7000/reservation', formData);
      console.log('Reservation form submitted successfully');
      // Handle success, show confirmation message, etc.
    } catch (error) {
      console.error('Reservation form submission failed:', error);
      // Handle submission failure, show error message, etc.
    }
  };

  return (
    <AuthContext.Provider value={{ submitContactForm, submitReservationForm }}>
      {children}
    </AuthContext.Provider>
  );
};