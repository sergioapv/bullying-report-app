import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF', // Custom primary color
    },
    secondary: {
      main: '#FF5733', // Custom secondary color
    },
  },
});

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Initialize Supabase Client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // Use VITE_ prefix
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const App = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [timeOfEvent, setTimeOfEvent] = useState('');

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([{ description, location, time_of_event: timeOfEvent }]);

      if (error) throw error;
      console.log('Report submitted:', data);

      // Clear the form fields
      setDescription('');
      setLocation('');
      setTimeOfEvent('');
    } catch (error) {
      console.error('Error inserting report:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <Card style={{ maxWidth: 500, width: '100%', padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: theme.palette.primary.main }}>
            Bullying Report
          </Typography>
          <CardContent>
            <TextField
              label="Describe the incident"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Time of Event"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={timeOfEvent}
              onChange={(e) => setTimeOfEvent(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: '20px' }}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              style={{ padding: '10px', fontSize: '16px' }}
            >
              Submit Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default App;
