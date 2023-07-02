import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, FormLabel, Input, CircularProgress, TextField } from '@mui/material';
import 'tailwindcss/tailwind.css';
import { useClient } from '@/context/ClientContext';
import { z } from 'zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentSchema = z.object({
  cardNumber: z.string().nonempty('Card number is required'),
  expiryDate: z.string().nonempty('Expiry date is required'),
  cvv: z.string().nonempty('CVV is required'),
  nameOnCard: z.string().nonempty('Name on card is required'),
});


function Payment({Price, reservationId, setUnsuccessful, setSuccess}) {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [amount, setAmount] = useState(Price);
  const [idReservation, setIDReservation] = useState(reservationId);  
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessageText, setErrorMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { submitPaymentForm, updateReservation } = useClient();
  const [showExtraFields, setShowExtraFields] = useState(false);


  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      PaymentSchema.parse({
        cardNumber,
        expiryDate,
        cvv,
        nameOnCard,
        amount,
      });
      setErrors({});
      const formData = {
        idReservation,
        cardNumber,
        expiryDate,
        cvv,
        nameOnCard,
        amount,
      };

      const updateData = {
        Paid: "Valid",
      }
  
      // assuming submitPaymentForm returns true if payment is successful
        await submitPaymentForm(formData);
  
        // Call updateReservation to update the "Paid" status of reservation
        await updateReservation(idReservation, updateData);
  
        // Optional: Show success message or redirect to a success page
        toast.success("Payment successful! Reservation updated.", {
          position: toast.POSITION.TOP_RIGHT,
        });
    } catch (error) {
      // Show error toast
      toast.error("Payment failed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };
  
  const resetForm = (event) => {
    event.preventDefault();
    setCardNumber('');
    setNameOnCard('');
    setExpiryDate('');
    setCvv('');
  };


  return (
    <>
      <Grid item xs={12} md={6} style={{margin: '5%'}}>
          <h2>Payment : {Price}$</h2>
          <form onSubmit={handlePayment}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Card Number (Numbers Only)"
                  variant="outlined"
                  fullWidth
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name On Card"
                  variant="outlined"
                  fullWidth
                  value={nameOnCard}
                  onChange={(event) => setNameOnCard(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormLabel htmlFor="Expiry_Date">Expiry Date</FormLabel>
                <Input
                  id="Expiry_Date"
                  type="date"
                  fullWidth
                  value={expiryDate}
                  onChange={(event) => setExpiryDate(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value)}
                />
              </Grid>
            </Grid>
            
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  width: '100%',
                  flex: '1 0 auto',
                  fontSize: '16px',
                  fontFamily: 'Nunito Sans, Arial, sans-serif',
                  position: 'relative',
                  letterSpacing: '4px',
                  color: '#f5e4c3',
                  textTransform: 'uppercase',
                  mt: 2
                }}
                disabled={isSubmitting}
                onClick={async () => {
                  setShowExtraFields(true);
                }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Payez Maintenant"}
              </Button>


            <center>
            <Button
              onClick={resetForm}
              variant="contained"
              color="primary"
              sx={{
                width: '40%',
                flex: '1 0 auto',
                fontSize: '16px',
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                position: 'relative',
                letterSpacing: '4px',
                color: '#f5e4c3',
                margin: '0 10%',
                textTransform: 'uppercase',
                mt: 2
              }}
              disabled={isSubmitting}
            >
              Reset
            </Button>

            <Button
                variant="contained"
                color="primary"
                sx={{
                  width: '40%',
                  flex: '1 0 auto',
                  fontSize: '16px',
                  fontFamily: 'Nunito Sans, Arial, sans-serif',
                  position: 'relative',
                  letterSpacing: '4px',
                  color: '#f5e4c3',
                  margin: '0 10%',
                  textTransform: 'uppercase',
                  mt: 2
                }}
                disabled={isSubmitting}
                onClick={async () => {
                  router.push('/');
                }}
              >
                {isSubmitting ? <CircularProgress size={24}/> : "Pay Later"}
              </Button>

            </center>
          </form>
      </Grid>
    
    {showExtraFields && (

      <Button
      onClick={async () => {
        router.push('/');
      }}
        variant="contained"
        color="primary"
        sx={{
          width: '40%',
          flex: '1 0 auto',
          fontSize: '16px',
          fontFamily: 'Nunito Sans, Arial, sans-serif',
          position: 'relative',
          letterSpacing: '4px',
          color: '#f5e4c3',
          margin: '0 10%',
          textTransform: 'uppercase',
          mt: 2
        }}
        disabled={isSubmitting}
      >
        Go Back Home
      </Button>    

    )}
    </>
);
}

export default Payment;