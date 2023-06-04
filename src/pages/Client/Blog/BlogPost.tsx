import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function BlogPost({ post }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.date}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
}