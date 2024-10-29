import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Snackbar, Alert, Grid, Box, Typography, TextField, Button, FormControlLabel, Checkbox, Divider } from '@mui/material';
import sideFrame from '../assets/sideFrame.png'
import pizza from '../assets/pizza.png'

export const Signin = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const formdata = { password: password, user_email: email };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${window.location.origin}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userRole', responseData.user_role);
        setIsAuthenticated(true); // Update the authentication state

        if (responseData.user_role === "Super Admin") {
          navigate("/superadmin/view/earnings");
        }else if (responseData.user_role === "Restaurant Register") {
          navigate("/admin/reports");
        } else if (responseData.user_role === "Kitchen Manager") {
          navigate("/kichen-manager/dashboard");
        } else if (responseData.user_role === "Branch Manager") {
          navigate("/branch-manager/dashboard");
        } else if (responseData.user_role === "Customer") {
          navigate("/customer/view/orders");
        }else if (responseData.user_role === "Cashier") {
          navigate("/cashier/view/orders");
        }else {
          navigate("/");
        }

        console.log('Successfully signed in as ' + responseData.user_role);
      } else {
        // Handle error response
        setNotificationMessage('Wrong email or password'); // Set the error message
        setShowNotification(true); // Show the notification
        console.log('Error:', response.status);
      }
    } catch (error) {
      // Handle fetch error
      setNotificationMessage('An error occurred. Please try again.'); // Set a generic error message
      setShowNotification(true); // Show the notification
      console.log('Error:', error);
    }
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <Grid container sx={{ paddingTop: 4, 
              width: {xs: '100%', sm: '95%', md: '85%', lg: '65%'},
              ml: {xs: '1%', sm: '5%', md: '10%', lg: '15%'},
              mr: {xs: '1%', sm: '5%', md: '10%', lg: '15%'},
              mb: {xs: 1, sm: 2, md: 3, lg: 4},
      }}>
        <Grid item xs={6} sx={{  height: '70vh', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
        <img src={sideFrame} alt='Pizza' width={'90%'} />
        </Grid>
        <Grid item xs={6} sx={{ paddingLeft: 0 }}>
          <Box sx={{ paddingLeft: 1, maxWidth:'80%' }}>
            <img src={pizza} alt='Pizza'/>
            <Typography component="h1" variant="h5" sx={{paddingTop:2}}>
              Login
            </Typography>
            <Divider fullWidth/>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              size="small"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              size="small"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth  
              sx={{
                bgcolor:'#FF8C00', 
                paddingLeft:3,
                paddingRight:3,
                borderRadius:1,
                color:'white',
                textTransform: 'none',
                '&:hover': {
                        bgcolor: '#FF6700',
                        opacity: 0.9,
                  },}}
                >
              Login
            </Button>
            <Grid className="footer">
              <Typography component="h5">
                Don't have an account? <Link to={'/signup'}>Register</Link>
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity={notificationMessage.includes('successfully') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};