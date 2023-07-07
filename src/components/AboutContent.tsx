import { Typography, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline } from '@mui/material';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:7000/testimonies';

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

  const stylesD = {
    card: {
      backgroundImage: `url(/images/Blog/image_6.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem',
      color: 'white',
    },
  };
  
function AboutContent() {
  const router = useRouter();
  const [testimonies, setTestimonies] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);


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
                        <Button variant="contained" color="secondary" onClick={() => router.push(`/Client/Room/rooms`)}>
                        Reserve Your Room Now
                        </Button>
                    </div>
                    </div>
                </Container>
                <Container maxWidth="sm">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <img src="https://res.cloudinary.com/dv5o7w2aw/image/upload/v1688154995/About/about-1.jpg" alt="Image 1" style={{ width: '50%', height: 'auto' }} />
                    <img src="https://res.cloudinary.com/dv5o7w2aw/image/upload/v1688154990/About/about-2.jpg" alt="Image 2" style={{ width: '50%', height: 'auto' }} />
                    </div>
                </Container>
                </React.Fragment>

                <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" style={{ marginTop: '40px', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#2f89fc' }}>
                    <img src="https://res.cloudinary.com/dv5o7w2aw/image/upload/v1688154995/About/testimony-img.jpg" alt="Image 3" style={{ width: '70%', height: 'auto' }} />
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
                </Grid>
            </section>
        </ThemeProvider>
    </>
  );
}

export default AboutContent;