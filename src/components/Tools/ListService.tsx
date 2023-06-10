import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SpaIcon from '@mui/icons-material/Spa';
import KingBedIcon from '@mui/icons-material/KingBed';
import NotificationsIcon from '@mui/icons-material/Notifications';

function ListService() {
  return (
    <>
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
    </>
  );
}

export default ListService;