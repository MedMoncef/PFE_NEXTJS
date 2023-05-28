import Head from 'next/head';
import { Typography, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SpaIcon from '@mui/icons-material/Spa';
import KingBedIcon from '@mui/icons-material/KingBed';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

const API_URL = 'http://localhost:7000/testimony';

const stylesD = {
  card: {
    backgroundImage: `url(/images/Images/image_6.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2rem',
    color: 'white',
  },
};
// Custom theme with water-themed colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0', // Blue color for primary elements
    },
    secondary: {
      main: '#4dd0e1', // Teal color for secondary elements
    },
  },
});

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [testimonies, setTestimonies] = useState([]);

  interface Testimony {
    IdTestimony: string,
    comment: string,
    name: string,
    image: string,
    title: string
  }

  const fetchData = async () => {
    const result = await axios(API_URL);
    setTestimonies(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % testimonies.length);
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [testimonies]);

  const handleRadioChange = (index) => {
    setCurrentImage(index);
  };


  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
              <h1>About Us</h1>
            </div>
          </div>
        </section>
        
        <div className={styles.about}>
          <h2>WELCOME TO HARBOR LIGHTS HOTEL</h2>
          <h1>You'll Never Want To Leave</h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <NotificationsIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Friendly Service
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <LocalDiningIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Get Breakfast
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <AirportShuttleIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Transfer Services
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <SpaIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Suits & SPA
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <KingBedIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Cozy Rooms
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>

            
        <ThemeProvider theme={theme}>
          <section style={{ padding: '50px' }}>
            <Grid container spacing={2}>

            <React.Fragment>
              <CssBaseline />
              <Container maxWidth="sm" style={{ marginBottom: '40px' }}>
                <div className={styles.about}>
                  <Typography variant="h2" style={{ textAlign: 'left' }}>
                    ABOUT HARBOR LIGHTS HOTEL
                  </Typography>
                  <Typography variant="h4" style={{ textAlign: 'left', marginTop: '20px' }}>
                    Harbor Lights Hotel the Most Recommended Hotel All Over the World
                  </Typography>
                  <p style={{ textAlign: 'left', marginTop: '50px' }}>
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                  </p>
                  <div style={{ textAlign: 'left', marginTop: '50px' }}>
                    <Button variant="contained" color="secondary">
                      Reserve Your Room Now
                    </Button>
                  </div>
                </div>
              </Container>
              <Container maxWidth="sm">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <img src="/images/About/about-1.jpg" alt="Image 1" style={{ width: '50%', height: 'auto' }} />
                  <img src="/images/About/about-2.jpg" alt="Image 2" style={{ width: '50%', height: 'auto' }} />
                </div>
              </Container>
            </React.Fragment>

            <React.Fragment>
              <CssBaseline />
              <Container maxWidth="sm" style={{ marginTop: '40px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#2f89fc' }}>
                  <img src="/images/About/testimony-img.jpg" alt="Image 3" style={{ width: '70%', height: 'auto' }} />
                </div>
              </Container>
              <Container maxWidth="sm">
                <div className={styles.about}>
                  <Typography variant="h2" style={{ textAlign: 'left' }}>
                    TESTIMONY
                  </Typography>
                  <Typography variant="h4" style={{ textAlign: 'left', marginTop: '20px' }}>
                    Happy Customer
                  </Typography>

                  {testimonies.map((testimony: Testimony, index) => (
                    <div key={testimony.IdTestimony} style={{display: index === currentImage ? 'block' : 'none',}}>
                          <Card sx={{ display: 'flex', marginBottom: '5%', marginTop: '20%' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={`/images/Users/${testimony.image}`}
                              alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                  {testimony.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                 {testimony.title}
                                </Typography>
                              </CardContent>
                            </Box>
                          </Card>

                            <p style={{ textAlign: 'left', marginTop: '50px' }}>
                                &quot;{testimony.comment}&quot;
                            </p>
                    </div>
                  ))}

                </div>
              </Container>
            </React.Fragment>


        <Grid item xs={12} md={12}>
          <Card style={stylesD.card}>
            <CardContent style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <Typography variant="h4" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> 123 Ocean Avenue, Waterfront City
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> +1 123 456 7890
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> info@harborhotel.com
              </Typography>
              <Typography variant="body1">
                <strong>Follow us:</strong>{' '}
                <Link href="#" color="secondary">
                  Facebook
                </Link>{' '}
                |{' '}
                <Link href="#" color="secondary">
                  Instagram
                </Link>{' '}
                |{' '}
                <Link href="#" color="secondary">
                  Twitter
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

            </Grid>
          </section>
        </ThemeProvider>
      </div>
    </>
  );
}