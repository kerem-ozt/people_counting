import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { Link, Route, Switch, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      // Handle registration logic here
      console.log('Email:', email);
      console.log('Password:', password);

      try {
        const response = await axios.post('http://localhost:4000/user/register', {
          email: email,
          password: password,
        });

        console.log(response)

        navigate('/girisyap');

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
              Register
            </Typography>
            <form>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleRegister}
                fullWidth
              >
                Kayıt Ol
              </Button>
            </form>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                Hesabın var mı?{' '}
                <Link to="/girisyap">Giriş Yap</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

  export default Register;