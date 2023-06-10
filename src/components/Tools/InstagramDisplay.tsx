import { CardMedia, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

  
function InstagramDisplay() {
  const router = useRouter();
  
  return (
    <>
        <Stack direction="row">
            <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={`/images/Insta/insta-1.jpg`}
            alt="Insta Image 1"
            />
            <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={`/images/Insta/insta-2.jpg`}
            alt="Insta Image 2"
            />
            <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={`/images/Insta/insta-3.jpg`}
            alt="Insta Image 3"
            />
            <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={`/images/Insta/insta-4.jpg`}
            alt="Insta Image 4"
            />
            <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={`/images/Insta/insta-5.jpg`}
            alt="Insta Image 5"
            />
        </Stack>

    </>
  );
}

export default InstagramDisplay;