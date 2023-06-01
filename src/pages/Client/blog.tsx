import Head from 'next/head';
import { Typography, TextField, Button, Link, Box, Card, CardContent, CardMedia, Grid, CardActions } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import { useClient } from '@/context/ClientContext';
import { z } from 'zod';
import axios from 'axios';

const API_URL = 'http://localhost:7000/blogs';
export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  interface Blog {
    ID_Blog: string,
    Image: string,
    Titre: string,
    Content: string,
    DateU: Date
  }

  const fetchData = async () => {
    const result = await axios(API_URL);
    setBlogs(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
      <Head>
        <title>Contact</title>
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
              <h1>Our Stories</h1>
            </div>
          </div>
        </section>

        <div className={styles.about}>
          <h2>READ BLOG</h2>
          <h1>Recent Blog</h1>
        </div>

     
        <Grid container spacing={2} style={{ margin: '50px', display: 'flex', justifyContent: 'center' }}>

            {blogs.map((blog: Blog, index) => (
              <Grid item xs={12} sm={6} md={4} key={blog.ID_Blog}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={`/images/Images/${blog.Image}`}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.Titre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.Content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            </Grid>
            ))}

        </Grid>



      </div>
    </>
  );
};