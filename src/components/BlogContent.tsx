import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, CardMedia, Grid, CardActions } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';

const API_URL = 'http://localhost:7000/blogs';
  
function BlogContent() {
const [blogs, setBlogs] = useState([]);
const router = useRouter();

  interface Blog {
    _id: string,
    ID_Blog: string,
    Image_B: string,
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
        <Grid container spacing={2} style={{ margin: '2% 0', display: 'flex', justifyContent: 'center' }}>
          {blogs.map((blog: Blog, index) => (
            <Card sx={{ maxWidth: 350, margin: '2% 2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} key={blog.ID_Blog}>
              <CldImage width="400" height="250" src={`/Blog/${blog.Image_B}`} alt={blog.Image_B}/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.Titre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.Content}
                </Typography>
              </CardContent>
              <CardActions style={{ marginTop: 'auto' }}>
              </CardActions>
            </Card>
          ))}
        </Grid>
    </>
  );
}

export default BlogContent;