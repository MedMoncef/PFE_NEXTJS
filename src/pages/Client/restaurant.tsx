import Head from 'next/head';
import { Typography, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Pagination from '@mui/material/Pagination';

const API_URL = 'http://localhost:7000/menus';

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [menuAd, setMenuAd] = useState([]);
  const [menus, setMenus] = useState([]);

  interface Menu {
    ID_Menu: string,
    Image: string,
    Nom: string,
    Description: string,
    Prix: Number,
    Type: string
  }

  const fetchData = async () => {
    const result = await axios(API_URL);
    setMenus(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % menuAd.length);
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [menuAd]);


    const images = [
      '/images/Resto/resto1.jpg',
      '/images/Resto/resto2.jpg',
      '/images/Resto/resto3.jpg',
    ];

    const theme = useTheme();

  return (
    <>
      <Head>
        <title>About Us</title>
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
              <h1>Restaurant</h1>
            </div>
          </div>
        </section>
        
        <ThemeProvider theme={theme}>
          <section style={{ padding: '50px' }}>
            <Grid container spacing={2}>

            <React.Fragment>
              <CssBaseline />
              <Container maxWidth="sm" style={{ marginBottom: '1%', marginTop: '1%' }}>
                <div className={styles.about}>
                  <Typography variant="h2" style={{ textAlign: 'left' }}>
                    ABOUT HARBOR LIGHTS HOTEL
                  </Typography>
                  <Typography variant="h4" style={{ textAlign: 'left', marginTop: '20px' }}>
                    Harbor Lights Hotel Restaurants
                  </Typography>
                  <p style={{ textAlign: 'left', marginTop: '25px' }}>
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                    
                    A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                  </p>
                  <div style={{ textAlign: 'left', marginTop: '50px' }}>
                    <Button variant="contained" color="secondary">
                      More Info
                    </Button>
                  </div>
                </div>
              </Container>
              <Container maxWidth="sm">
                <Carousel showArrows={false} showStatus={false} showThumbs={false} autoPlay interval={3000} infiniteLoop>
                  {images.map((image, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10%' }}>
                      <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                  ))}
                </Carousel>
              </Container>
            </React.Fragment>

            </Grid>
          </section>
        </ThemeProvider>


        <div style={{backgroundColor: '#f8f9fa', padding: '3% 0'}}>
          <div className={styles.about}>
            <h2>HARBORLIGHTS RESTO MENU</h2>
            <h1>Our Specialties</h1>
          </div>

          <Grid container spacing={2} style={{ margin: '2% 0', display: 'flex', justifyContent: 'center' }}>

            {menus.map((menu: Menu, index) => (
              <Card sx={{ display: 'flex', margin: '2% 2%', width: '40%' }} key={menu.ID_Menu}>
              <CardMedia
                  component="img"
                  sx={{ width: 150, height: 150, backgroundColor: 'black' }} // Adjust the width and height as desired
                  image={`/images/Menu/${menu.Image}`}
                  alt="Menu Item"
                />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {menu.Nom}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {menu.Description}
                      </Typography>
                      <Typography component="div" variant="h6">
                        {menu.Prix}
                      </Typography>
                    </CardContent>
                  </Box>
              </Card>
          ))}

        </Grid>

        </div>
      </div>
    </>
  );
}