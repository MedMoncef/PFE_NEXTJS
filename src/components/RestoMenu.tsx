import Head from 'next/head';
import { CardActions, Typography, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import RestoArticle from '@/components/RestoArticle';

const API_URL = 'http://localhost:7000/menus';

function RestoMenu() {
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
  
      const theme = useTheme();

  return (
    <>
        <Grid container spacing={2} style={{ margin: '2% 0', display: 'flex', justifyContent: 'center' }}>

            {menus.map((menu: Menu, index) => (
            <Card sx={{ maxWidth: 350, margin: '2% 2%' }} key={menu.ID_Menu} style={{ alignSelf: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={`/images/Menu/${menu.Image}`}
                alt="Menu Item"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {menu.Nom}
                        <div style={{ display: 'flex', width: '80px', color: '#2f89fc', textAlign: 'right', fontSize: '20px', fontWeight: '600' }}>
                        $ {menu.Prix}
                        </div>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {menu.Description}
                    </Typography>
                    </CardContent>
                </Box>
            </Card>
            ))}

            </Grid>
    </>
    );
}

export default RestoMenu;