import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginNavComp from './LoginNavComp';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      DKGH Enterprises
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function AdminLoginComp() {
  const nav = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    let email = data.get('email');
    let password = data.get('password');
    axios.get("http://localhost:8888/admin").then((res) => {
      let userData = res.data;
      const data = userData.filter((val) => { return val.admin_email === email && val.admin_password === password })
      if (data.length > 0) {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("loggedin", true);
        nav("/admindashboard"); // Change here 
      }
      else {
        console.log("Login Failed")
      }
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container 
        component="main" 
        maxWidth="xs"
        sx={{
          backgroundImage: 'url(https://www.vecteezy.com/vector-art/21553487-illustration-with-kids-and-teacher-in-a-classroom-education-illustration-vector-interior-teacher-with-pupils-in-a-classroom-primary-school-kids-children-listen-to-teacher)', // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 4, // Add some padding at the top for spacing
        }}
      >
        <LoginNavComp />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%', // Ensure the box takes the full width of the container
            maxWidth: 400, // Add a max width to avoid it stretching too much
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="adminsignup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default AdminLoginComp;
