import { TextField, Grid, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useClient } from '@/context/ClientContext';
import { z } from 'zod';
import 'react-toastify/dist/ReactToastify.css';

const contactSchema = z.object({
    nom: z.string().nonempty('Nom is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    sujet: z.string().nonempty('sujet is required'),
    message: z.string().nonempty('message is required'),
  });
  
  const stylesD = {
    card: {
      backgroundImage: `url(/images/Blog/image_6.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem',
      color: 'white',
    },
  };
  
function ContactContent() {
    const { submitContactForm } = useClient();
    const router = useRouter();
    const [title, setTitle] = useState('Welcome, please register!');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [sujet, setSujet] = useState('');
    const [message, setMessage] = useState('');
  
    const resetForm = (event) => {
      event.preventDefault();
      setNom('');
      setEmail('');
      setSujet('');
      setMessage('');
    };
  
    const handleContact = async (event) => {
      event.preventDefault();
      try {
        contactSchema.parse({
          nom,
          email,
          sujet,
          message,
        });
    
        await submitContactForm(nom, email, sujet, message);

        toast.success("Message sent successfully!", {
            position: toast.POSITION.TOP_RIGHT
          });
      
        resetForm(event);

      } catch (error) {
        console.log("error submit");
        toast.error("Failed to send the message. Please try again.", {
            position: toast.POSITION.TOP_RIGHT
        });
      }
    };
  
  return (
    <>
        <Grid container justifyContent="center" alignItems="center" sx={{ mb: '5%' }}>
        <Grid item xs={12} md={6} lg={5}>
            <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12837.362651451496!2d10.724349!3d36.4493228!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130299a2da4fe895%3A0x81375888b980e5d8!2sIMSET%20NABEUL!5e0!3m2!1sfr!2stn!4v1684870791988!5m2!1sfr!2stn"
                width="100%"
                height="550"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ ml: '5rem', backgroundColor: 'white', p: '2rem', width: '100%' }}>
            <form onSubmit={handleContact}>
            <div style={{ marginBottom: '1rem' }}>
                <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                type="string"
                value={nom}
                onChange={(event) => setNom(event.target.value)}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <TextField
                label="Sujet"
                variant="outlined"
                fullWidth
                type="string"
                value={sujet}
                onChange={(event) => setSujet(event.target.value)}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <TextField
                label="Message"
                multiline
                rows={7}
                variant="outlined"
                fullWidth
                type="string"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                />
            </div>
            <div>
                <Button fullWidth variant="contained" color="primary" type="submit">
                Envoyer
                </Button>
                <p>‎</p>
                <Button fullWidth variant="outlined" onClick={resetForm}>
                Reset
                </Button>
            </div>
            </form>
        </Grid>
        </Grid>
    </>
  );
}

export default ContactContent;