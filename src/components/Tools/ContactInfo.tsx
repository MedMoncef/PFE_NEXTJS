import { Typography, Link, Card, CardContent, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

  const stylesD = {
    card: {
      backgroundImage: `url(/images/Blog/image_6.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem',
      color: 'white',
    },
  };
  
function ContactInfo() {
  const router = useRouter();
  
  return (
    <>
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
    </>
  );
}

export default ContactInfo;