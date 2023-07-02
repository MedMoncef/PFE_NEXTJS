import { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface ContactFormData {
  ID_Contact: string;
  Nom: string;
  Email: string;
  Sujet: string;
  Message: string;
}

interface ReservationFormData {
  firstName: String,
  lastName: String,
  Email: String,
  CIN: String,
  ID_Rooms: string;
  Date_Debut: string;
  Date_Fin: string;
  Duree: Number;
  Prix: Number;
}

interface BlogFormData {
  ID_Blog: string;
  Image: string;
  Titre: string;
  Content: string;
  DateU: string;
}

interface PaymentFormData {
  idReservation: String;
  cardNumber: Number;
  expiryDate: String;
  cvv: String;
  nameOnCard: String;
  amount: Number;
}

interface AuthContextType {
  submitContactForm: (nom: string, email: string, sujet: string, message: string) => void;
  submitReservationForm: (formData: ReservationFormData) => void;
  submitBlogForm: (formData: BlogFormData) => void;
  submitPaymentForm: (formData: PaymentFormData) => void;
  updateReservation: (id: string, updateData: {Paid: string}) => void;
  dayPrice: number;
  setDayPrice: (price: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  submitContactForm: () => {},
  submitReservationForm: () => {},
  submitBlogForm: () => {},
  submitPaymentForm: () => {},
  updateReservation: () => {},
  dayPrice: 0,
  setDayPrice: () => {}
});

export const useClient = () => useContext(AuthContext);

export const ClientProvider: React.FC = ({ children }) => {

  const [dayPrice, setDayPrice] = useState<number>(0);

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
      const response = await axios.post('http://localhost:7000/create_reservation', formData);
      console.log('Reservation form submitted successfully');
      return response;
      // Handle success, show confirmation message, etc.
    } catch (error) {
      console.error('Reservation form submission failed:', error);
      return null;
      // Handle submission failure, show error message, etc.
    }
  };

  const submitBlogForm = async (formData: BlogFormData) => {
    try {
      // Make an HTTP request to submit the blog form data
      await axios.post('http://localhost:7000/blogs', formData);
      console.log('Blog form submitted successfully');
      // Handle success, show confirmation message, etc.
    } catch (error) {
      console.error('Blog form submission failed:', error);
      // Handle submission failure, show error message, etc.
    }
  };

  const submitPaymentForm = async (formData: PaymentFormData) => {
    try {
      // Make an HTTP request to submit the blog form data
      await axios.post('http://localhost:7000/create_payment', formData);
      console.log('Payment form submitted successfully');
      // Handle success, show confirmation message, etc.
    } catch (error) {
      console.error('Payment form submission failed:', error);
      // Handle submission failure, show error message, etc.
    }
  };

  const updateReservation = async (idReservation: string, updateData: {Paid: string}) => {
    try {
      // Make an HTTP request to update the reservation data
      await axios.patch(`http://localhost:7000/reservations/${idReservation}`, updateData);
      console.log('Reservation updated successfully');
      // Handle success, show confirmation message, etc.
    } catch (error) {
      console.error('Reservation update failed:', error);
      // Handle submission failure, show error message, etc.
    }
  };

  return (
    <AuthContext.Provider value={{ 
        submitContactForm, 
        submitReservationForm, 
        submitBlogForm, 
        submitPaymentForm, 
        updateReservation, 
        dayPrice, 
        setDayPrice 
      }}>
      {children}
    </AuthContext.Provider>
  );
};