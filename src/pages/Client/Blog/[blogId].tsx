import * as React from 'react';
import Head from 'next/head';
import { Typography, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline, CardActions, FormControl, FormLabel, Input, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';


const hotelTheme = createTheme({
  palette: {
    primary: {
      main: '#5A9', // A sophisticated dark green
    },
    secondary: {
      main: '#FFA500', // A warm gold
    },
  },
});


const SearchInput = styled(Input)({
  padding: '0.5rem',
  border: 'none',
  borderRadius: '0.25rem',
});

const defaultTheme = createTheme();

export default function Blog() {
  const router = useRouter();
  return (
<>
      <Head>
        <title>Hotel Blog</title>
        <meta name="description" content="Welcome to our Hotel Blog" />
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
              <h1>Discover Luxury & Comfort</h1>
              <Button variant="contained" color="secondary" onClick={() => router.push(`/Client/Room/${room._id}`)}>Book Now</Button>
            </div>
          </div>
        </section>

      <div className={styles.about}>
        <h2>EXPLORE OUR STORIES</h2>
      </div>

      <ThemeProvider theme={hotelTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ my: 2 }}>
          </Box>
          <main>
            {/* ... rest of your components */}
          </main>
        </Container>
      </ThemeProvider>
    </>  );
}