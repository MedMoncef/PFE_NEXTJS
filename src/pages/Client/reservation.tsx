import Head from 'next/head';
import { Typography, TextField, Button, Box, Link, FormLabel } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useClient } from '@/context/ClientContext';
import styles from '@/styles/Home.module.css';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { z } from 'zod';

const reservationSchema = z.object({
  nom: z.string().nonempty('Nom is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  dateDebut: z.string().nonempty('Date debut is required'),
  dateFin: z.string().nonempty('Date fin is required'),
  people: z.number().min(1, 'Invalid number of people'),
});

export default function Reservation() {
  const { submitReservationForm } = useClient();
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [people, setPeople] = useState('');

  const resetForm = () => {
    setNom('');
    setEmail('');
    setDateDebut('');
    setDateFin('');
    setPeople('');
  };

  const handleReservation = (event) => {
    event.preventDefault();

    try {
      reservationSchema.parse({
        nom,
        email,
        dateDebut,
        dateFin,
        people,
      });

      const formData = {
        ID_Reservation: '', // Assign an ID if needed
        ID_Rooms: '', // Set the ID of the room
        Nom: nom,
        Email: email,
        Date_Debut: dateDebut,
        Date_Fin: dateFin,
        People: parseInt(people),
        Duree: 0, // Set the duration if needed
      };

      submitReservationForm(formData);
      // Optional: Show success message or redirect to a success page
    } catch (error) {
      console.log('error submit');
    }
  };

  return (
    <>
      <Head>
        <title>Reservation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section style={{ margin: '100px', }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '5%',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <div
                style={{
                  height: '550px',
                  backgroundImage: `url(/images/Rooms/room-6.jpg)`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              ></div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '50px', background: 'white' }}>
                <form onSubmit={handleReservation}>
                  <FormLabel htmlFor="checkin_date">Nom</FormLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="string"
                    value={nom}
                    onChange={(event) => setNom(event.target.value)}
                    className="mb-4"
                  />
                    <FormLabel htmlFor="checkin_date">Email</FormLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mb-4"
                  />
                    <FormLabel htmlFor="checkin_date">Date Debut</FormLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="date"
                    value={dateDebut}
                    onChange={(event) => setDateDebut(event.target.value)}
                    className="mb-4"
                  />
                    <FormLabel htmlFor="checkin_date">Date Fin</FormLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="date"
                    value={dateFin}
                    onChange={(event) => setDateFin(event.target.value)}
                    className="mb-4"
                  />
                    <FormLabel htmlFor="checkin_date">Number of People</FormLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={people}
                    onChange={(event) => setPeople(event.target.value)}
                    className="mb-4"
                  />
                  <div className="flex justify-between" style={{ marginTop: '25px' }}>
                    <Button variant="contained" color="primary" type="submit">
                      Réserver
                    </Button>
                    <Button variant="outlined" onClick={resetForm}>
                      Réinitialiser
                    </Button>
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </section>
    </>
  );
}