import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios, { all } from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Link, FormControl, FormLabel, Input, Container, CircularProgress, Box, FormHelperText, TextField } from '@mui/material';
import 'tailwindcss/tailwind.css';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { useClient } from '@/context/ClientContext';
import { z } from 'zod';

const API_URL = 'http://localhost:7000';
const ROOMS_ENDPOINT = '/rooms';
const RESERVATIONS_ENDPOINT = '/reservation';

const ReservationSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  Email: z.string().email('Invalid email address').nonempty('Email is required'),
  CIN: z.string().nonempty('CIN is required'),
  Date_Debut: z.string().nonempty('Check-in date is required'),
  Date_Fin: z.string().nonempty('Check-out date is required'),
});

export default function Room() {
  const router = useRouter();
  const { roomId } = router.query;
  const { submitReservationForm } = useClient();
  const [room, setRoom] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [CIN, setCIN] = useState('');
  const [ID_Rooms, setIdRooms] = useState('');
  const [Date_Debut, setCheckinDate] = useState('');
  const [Date_Fin, setCheckoutDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessageText, setErrorMessageText] = useState('');
  
  const resetForm = (event) => {
    event.preventDefault();
    setFirstName('');
    setLastName('');
    setEmail('');
    setCIN('');
    setCheckinDate('');
    setCheckoutDate('');
  };

  const handleReservation = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      ReservationSchema.parse({
        firstName,
        lastName,
        Email,
        CIN,
        ID_Rooms,
        Date_Debut,
        Date_Fin,
      });
      setErrors({}); // Clear out any previous errors
  
      const formData = {
        firstName,
        lastName,
        Email,
        CIN,
        ID_Rooms,
        Date_Debut,
        Date_Fin,
      };
  
      const response = await axios.get(`${API_URL}${RESERVATIONS_ENDPOINT}`, {
        params: { ID_Rooms: ID_Rooms },
      });
      const reservations = response.data;
      
      let hasOverlap = false;
      for (let reservation of reservations) {
        const existingStartDate = new Date(reservation.Date_Debut);
        const existingEndDate = new Date(reservation.Date_Fin);
        const newStartDate = new Date(Date_Debut);
        const newEndDate = new Date(Date_Fin);
      
        if (
          (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
          (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
          (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
        ) {
          hasOverlap = true;
          break;
        }
      }      

      if (availableRooms <= 0) {
        if (hasOverlap) {
          setErrorMessageTitle("No Rooms available at that time!");
          setErrorMessageText(
            "We are sorry for the inconvenience, please choose a different room or come back again another time."
          );
          await setUnsuccessful(true);
        } else {
          await submitReservationForm(formData);
          setErrorMessageTitle("Reservation Successful!");
          setErrorMessageText(
            "We have received your reservation. You will get an email confirmation soon."
          );
          await setSuccess(true);
        }
      } else {
        await submitReservationForm(formData);
        setErrorMessageTitle("Reservation Successful!");
        setErrorMessageText(
          "We have received your reservation. You will get an email confirmation soon."
        );
        await setSuccess(true);
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {}));
      } else {
        console.log('error submit');
      }
    }
    setIsSubmitting(false);
  };
        


  useEffect(() => {
    if (roomId) {
      axios.get(`${API_URL}${ROOMS_ENDPOINT}/${roomId}`).then((res) => {
        setRoom(res.data);
        setIdRooms(Array.isArray(roomId) ? roomId.join(", ") : roomId);
      });
    }
  }, [roomId]);

  useEffect(() => {
    if (room) {
      const fetchAvailableRooms = async () => {
        try {
          const response = await axios.get(`${API_URL}${RESERVATIONS_ENDPOINT}`, {
            params: { type: room.Type },
          });
          const reservations = response.data;
          const reservedRoomIds = reservations.map((reservation) => reservation.roomId);
          const availableRooms = room.Max - reservedRoomIds.length;
          setAvailableRooms(availableRooms);
        } catch (error) {
          console.error('Error fetching available rooms:', error);
        }
      };

      fetchAvailableRooms();
    }
  }, [room]);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handlePayment = (event) => {
    event.preventDefault();
    // Perform payment processing logic here
    // You can use a payment gateway library or make an API request to handle the payment
    console.log('Processing payment...');
  };
 return (
    <>
      <Head>
        <title>Room Details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

            <section className={styles.banner} style={{ height: '600px' }}>
            <div
                style={{
                height: '600px',
                backgroundImage: `url(/images/bg_3.jpg)`,
                display: 'block',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                }}
            >
                <div className={styles.bannerContent}>
                <h2><Link style={{ color: '#f5e4c3' }} href="/">Home</Link></h2>
                <h1>Room Details</h1>
                </div>
            </div>
            </section>


            <div className={styles.about}>
                <h2>HARBOR LIGHT'S Reservation</h2>
            </div>
            
        <>
        <Grid>
          <Grid container spacing={0} className="bg-blue-50" sx={{ maxWidth: 2000, margin: '2% auto' }}>
          <Grid item xs={12} md={6}>
            <Card>
              {room && (
                <CardMedia sx={{ height: 450 }} image={`/images/Rooms/${room.Image}`} title={room.Name} />
              )}
            </Card>
          </Grid>

            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  {room && (
                    <>
                      <div>
                        <Typography gutterBottom variant="h5" component="div" className="text-blue-700" sx={{ marginBottom: '1rem' }}>
                          {room.Name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1.5rem' }}>
                          {room.Description}
                        </Typography>
                      </div>

                      <div>
                        <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                          <strong>Max:</strong> {room.Max} people
                        </Typography>

                        <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                          <strong>Size:</strong> {room.Size} sqm
                        </Typography>

                        <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                          <strong>Bed Number:</strong> {room.Bed_Number}
                        </Typography>

                        <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                          <strong>Price:</strong> ${room.Price} per night
                        </Typography>

                        <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                          <strong>View:</strong> {room.View}
                        </Typography>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div className={styles.about}>
            <h2>Reserve this room</h2>
          </div>

          { unsuccessful? (
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{margin: '5% 0'}}>
              <Typography variant="h4" color="primary" gutterBottom>
                {errorMessageTitle}
              </Typography>
              <Typography variant="subtitle1">
                {errorMessageText}
              </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      flex: '1 0 auto',
                      fontSize: '16px',
                      fontFamily: 'Nunito Sans, Arial, sans-serif',
                      position: 'relative',
                      letterSpacing: '4px',
                      color: '#f5e4c3',
                      textTransform: 'uppercase',
                      mt: 2
                    }}
                    onClick={() => setUnsuccessful(false)} // Add the onClick event handler
                  >
                    Try again
                  </Button>
                  
            </Box>
          ) :success ? (

            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{margin: '5% 0'}}>
            <Typography variant="h4" color="primary" gutterBottom>
              {errorMessageTitle}
            </Typography>
            <Typography variant="subtitle1">
              {errorMessageText}
            </Typography>


            <Grid item xs={12} md={6} style={{margin: '5%'}}>
              <h2>Payment</h2>
              <form onSubmit={handlePayment}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Expiry Date"
                      variant="outlined"
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name on Card"
                      variant="outlined"
                      fullWidth
                      value={name}
                      onChange={(event) => setName(event.target.value)}
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
                >
                  {isSubmitting ? <CircularProgress size={24}/> : "Payez Maintenant"}
                </Button>

                <Button
                  onClick={resetForm}
                  variant="contained"
                  color="primary"
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
                >
                  Reset
                </Button>

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
                >
                  {isSubmitting ? <CircularProgress size={24}/> : "Payer Plus Tard"}
                </Button>
              </form>
        </Grid>

          </Box>

          ) : (

          <Grid item xs={12} md={6} style={{margin: '5% 0'}}>
            <form onSubmit={handleReservation} style={{ padding: '40px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '25px',
              }}
              >
                <FormControl fullWidth>
                  <FormLabel htmlFor="first_name">First Name</FormLabel>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor="last_name">Last Name</FormLabel>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email (Optional)</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor="cin">CIN</FormLabel>
                  <Input
                    id="cin"
                    type="text"
                    placeholder="CIN"
                    value={CIN}
                    onChange={(event) => setCIN(event.target.value)}
                  />
                </FormControl>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 20px',
                    gap: '25px',
                  }}
                >
                  <FormControl fullWidth>
                    <FormLabel htmlFor="checkin_date">Check-in Date</FormLabel>
                    <Input
                      id="checkin_date"
                      type="date"
                      placeholder="Check-in date"
                      value={Date_Debut}
                      onChange={(event) => setCheckinDate(event.target.value)}
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <FormLabel htmlFor="checkout_date">Check-out Date</FormLabel>
                    <Input
                      id="checkout_date"
                      type="date"
                      placeholder="Check-out date"
                      value={Date_Fin}
                      onChange={(event) => setCheckoutDate(event.target.value)}
                    />
                  </FormControl>
                </div>

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
                >
                  {isSubmitting ? <CircularProgress size={24}/> : "Reserve"}
                </Button>

                <Button
                  onClick={resetForm}
                  variant="contained"
                  color="primary"
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
                >
                  Reset
                </Button>
                </div>
              </form>
            </Grid>
          )}
        </Grid>
        </>
    </>
  );
}