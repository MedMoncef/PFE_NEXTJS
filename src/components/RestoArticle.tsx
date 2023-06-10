import { CardActions, Typography, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import 'tailwindcss/tailwind.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function RestoArticle() {
  const [currentImage, setCurrentImage] = useState(0);
  const [menuAd, setMenuAd] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % menuAd.length);
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [menuAd]);


    const images = [
      '/images/Blog/resto1.jpg',
      '/images/Blog/resto2.jpg',
      '/images/Blog/resto3.jpg',
    ];

    const theme = useTheme();

  return (
    <>
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
    </>
);
}

export default RestoArticle;