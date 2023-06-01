import { Link } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';

function Banner() {
  return (
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
);
}

export default Banner;