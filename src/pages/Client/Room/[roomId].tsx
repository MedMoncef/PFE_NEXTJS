import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios, { all } from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Link, FormControl, FormLabel, Input, Container, CircularProgress, Box, FormHelperText, TextField } from '@mui/material';
import 'tailwindcss/tailwind.css';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Payment from '@/components/Payment';
import Reservation from '@/components/Reservation';

const API_URL = 'http://localhost:7000';
const ROOMS_ENDPOINT = '/rooms';


export default function Room() {
  const router = useRouter();
  const { roomId } = router.query;
  const [room, setRoom] = useState(null);
  const [ID_Rooms, setIdRooms] = useState('');
  const [success, setSuccess] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessageText, setErrorMessageText] = useState('');
  const [priceMessageText, setPriceMessageText] = useState('');
  const [dayPrice, setDayPrice] = useState('');
  const [reservationID, setReservationID] = useState('');
  


  useEffect(() => {
    if (roomId) {
      axios.get(`${API_URL}${ROOMS_ENDPOINT}/${roomId}`).then((res) => {
        setRoom(res.data);
        setIdRooms(Array.isArray(roomId) ? roomId.join(", ") : roomId);
        if (res.data && res.data.Price) {
          setDayPrice(res.data.Price);
        }
      });
    }

  }, [roomId]);
  
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


                <Payment 
                Price={priceMessageText}
                reservationId={reservationID}
                />
              </Box>
          ) : (

            <Reservation
            room={room}
            setRoom={setRoom}
            ID_Rooms={ID_Rooms}
            setIdRooms={setIdRooms}
            setSuccess={setSuccess}
            setUnsuccessful={setUnsuccessful}
            setErrorMessageTitle={setErrorMessageTitle}
            setErrorMessageText={setErrorMessageText}
            setPriceMessageText={setPriceMessageText}
            dayPrice={dayPrice}
            setResID={setReservationID}
            roomId={roomId}
            />
            
          )}
        </Grid>
        </>
    </>
  );
}