import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const API_URL = 'https://dental.aftercode.tn/api/v1/patients/';

export default function EditClient() {
  const router = useRouter();
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const { id } = router.query;
    try {
      const response = await axios.get(`${API_URL}${id}/`);
      setPatient(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}${patient.id}/`, patient);
      setLoading(false);
      router.push(`/clients/${patient.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Client
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="first_name"
          label="First Name"
          value={patient.first_name || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="last_name"
          label="Last Name"
          value={patient.last_name || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          value={patient.email || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="phone"
          label="Phone"
          value={patient.phone || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="address"
          label="Address"
          value={patient.address || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="birthdate"
          label="Birthdate"
          value={patient.birthdate || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="medical_history"
          label="Medical History"
          value={patient.medical_history || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="gender"
          label="Gender"
          value={patient.gender || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </div>
  );
}