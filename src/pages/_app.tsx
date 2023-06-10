import { useContext,useState,useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Partials/Navbar';
import Footer from '@/components/Partials/Footer';
import Banner from '@/components/Payment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/context/AuthContext';
import { ClientProvider } from '@/context/ClientContext';

const theme = createTheme();

//create context api instance
// const theme2 = useContext(ThemeContext);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <ClientProvider>
        <CssBaseline />
        <Navbar />
          <Component {...pageProps} />
        <Footer />
        <ToastContainer />
      </ClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}