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
const RESERVATIONS_ENDPOINT = '/reservation';


const ReservationSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  Email: z.string().email('Invalid email address').nonempty('Email is required'),
  CIN: z.string().nonempty('CIN is required'),
  Date_Debut: z.string().nonempty('Check-in date is required'),
  Date_Fin: z.string().nonempty('Check-out date is required'),
});


function Reservation({
  room,
  setRoom,
  ID_Rooms,
  setIdRooms,
  setSuccess,
  setUnsuccessful,
  setErrorMessageTitle,
  setErrorMessageText,
  setPriceMessageText,
  dayPrice,
  setResID,
  roomId,
}) {
  const router = useRouter();
  const { submitReservationForm } = useClient();
  const [availableRooms, setAvailableRooms] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [CIN, setCIN] = useState('');
  const [Date_Debut, setCheckinDate] = useState('');
  const [Date_Fin, setCheckoutDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = (event) => {
    event.preventDefault();
    setFirstName('');
    setLastName('');
    setEmail('');
    setCIN('');
    setCheckinDate('');
    setCheckoutDate('');
  };

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
      setErrors({});
  
      const startDate = new Date(Date_Debut);
      const endDate = new Date(Date_Fin);
      const durationMs = endDate.getTime() - startDate.getTime();
      const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
      const Duree = durationDays;
      const fullPrice = Duree*dayPrice
      console.log(fullPrice);
      
      const formData = {
        firstName,
        lastName,
        Email,
        CIN,
        ID_Rooms,
        Date_Debut,
        Date_Fin,
        Duree
      };
  
      const response = await axios.get(`${API_URL}${RESERVATIONS_ENDPOINT}`, {
        params: { ID_Rooms: ID_Rooms },
      });
      const reservations = response.data;
  
      let hasOverlap = false;
      for (let reservation of reservations) {
        if (reservation.ID_Rooms !== ID_Rooms) {
          continue;
        }
  
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
          const reservationResponse = await submitReservationForm(formData);
          if (reservationResponse) {
            const reservationId = reservationResponse.data.id; // Adjust this based on the actual response structure
            setResID(reservationId);
        }
          setErrorMessageTitle("Reservation Successful!");
          setErrorMessageText(
            "We have received your reservation. You will get an email confirmation soon."
          );
          setPriceMessageText(fullPrice);
          await setSuccess(true);
        }
      } else {
        const reservationResponse = await submitReservationForm(formData);
        if (reservationResponse) {
          const reservationId = reservationResponse.data.id; // Adjust this based on the actual response structure
          setResID(reservationId);
      }
        setErrorMessageTitle("Reservation Successful!");
        setErrorMessageText(
          "We have received your reservation. You will get an email confirmation soon."
        );
        setPriceMessageText(fullPrice);
        await setSuccess(true);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {})
        );
      } else {
        console.log("error submit");
      }
    }
    setIsSubmitting(false);
  };          


  return (
    <>

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
    </>
);
}

export default Reservation;