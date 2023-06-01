import Head from 'next/head';
import { Typography, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline, CardActions } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const API_URL = 'http://localhost:7000/rooms';
const ITEMS_PER_PAGE = 6;

export default function Blog() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  interface Room {
    ID_Rooms: String,
    Room_Number: String,
    Floor_Number: String,
    Name: String,
    Image: String,
    Description: String,
    Max: Number,
    View: String,
    Size: String,
    Bed_Number: String,
    Type: String,
    Rating: Number,
    Price: Number,
  }

  const fetchData = async () => {
    const result = await axios(API_URL);
    setTotalPages(Math.ceil(result.data.length / ITEMS_PER_PAGE));
    setRooms(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getDisplayedRooms = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return rooms.slice(startIndex, endIndex);
  };


  return (
    <>
      <Head>
        <title>Rooms</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <div>
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
              <h1>Rooms</h1>
            </div>
          </div>
        </section>

        <div className={styles.about}>
          <h2>HARBOR LIGHT'S ROOMS</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '3% 10%' }}>
              <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                <Grid item xs={6} sm={4} md={3} className={styles.roomsFilter}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                          Standard Room
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} className={styles.roomsFilter}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Deluxe Room
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} className={styles.roomsFilter}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Suite
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} className={styles.roomsFilter}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Executive Room
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={3} className={styles.roomsFilter}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Family Room
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} sm={4} md={3} className={styles.roomsFilter}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Specialty Rooms
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </div>

            <Grid container spacing={2} style={{ margin: '2% 0', display: 'flex', justifyContent: 'center' }}>
          {getDisplayedRooms().map((room: Room, index) => (
            <Card sx={{ maxWidth: 350, margin: '2% 2%' }} key={room.ID_Rooms}>
              <CardMedia
                sx={{ height: 250 }}
                image={`/images/Rooms/${room.Image}`}
                title="Standard Single"
              />
              <CardContent>
                <div className={styles.rooms}>
                  <h1>{room.Name}</h1>
                  <h2>{room.Price}$ per night</h2>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {room.Description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" marginBottom={5}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Box>

      </div>
    </>
  );
};