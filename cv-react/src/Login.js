import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { Link, Route, Switch, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Handle login logic here

    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        email: username,
        password: password,
      });

      const token = response.data.message.token; // Assuming the token is present in the response data

      sessionStorage.setItem('token', token); // Store the token in session storage

      // Redirect to desired route
      if (token !== undefined) {
        navigate('/'); // Replace '/dashboard' with the desired route
      }
      else {
          alert(response.data.message.code);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            Giriş Ekranı
          </Typography>
          <form>
            <TextField
              label="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
            >
              Giriş Yap
            </Button>
          </form>
          <Box mt={2}>
            <Typography variant="body2" align="center">
              Hesabın yok mu?{' '}
              <Link to="/kayitol">Kayıt Ol</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

