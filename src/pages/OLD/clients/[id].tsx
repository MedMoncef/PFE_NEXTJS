import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';


const API_URL = 'https://dental.aftercode.tn/api/v1/patients/';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  address: string;
  birthdate: string;
  medical_history: string;
  gender: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeletePatient = async () => {
    try {
      if (patient) {
        await axios.delete(`${API_URL}${patient.id}/`);
        // You may want to handle the successful deletion here (e.g., show a notification)
        router.push('/'); // Redirect to the home page after deletion
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = router.query;
        if (id) {
          const result = await axios(`${API_URL}${id}/`);
          setPatient(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [router.query.id]);

  return (
    <main>
      {patient && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h1>Client details</h1>

          <Card sx={{ maxWidth: 1500 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image="https://cdn-icons-png.flaticon.com/512/6386/6386976.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">{patient.first_name}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patient.last_name}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patient.email}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patient.phone}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patient.address}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patient.birthdate}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patient.medical_history}</Typography>
                <Typography gutterBottom variant="h5" component="div">{patient.gender}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
  variant="contained"
  color="secondary"
  startIcon={<DeleteIcon />}
  onClick={handleClickOpenDeleteDialog}
>
  Delete
</Button>

<Button
  variant="contained"
  color="primary"
  startIcon={<SaveIcon />}
  style={{ marginLeft: '10px' }}
  onClick={() => router.push(`/clients/edit-client?id=${patient.id}`)}
>
  Edit
</Button>
</div>

<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <DialogTitle>Delete client?</DialogTitle>
  <DialogContent>
    <Typography>
      Are you sure you want to delete {patient.first_name} {patient.last_name}?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
    <Button onClick={handleDeletePatient} color="error">
      Delete
    </Button>
  </DialogActions>
</Dialog>
</div>
)
}
</main>
  );
}