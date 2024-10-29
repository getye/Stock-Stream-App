import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Snackbar, IconButton, FormLabel } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export const UpdateProfile = ({handleProfileModalClose}) => {
  const [profile, setProfile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');



  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfile(file);
    }
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(profile!==null){
    try {

        const formData = new FormData();
        formData.append('picture', profile);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, please log in');
        return;
      }
      const response = await fetch(`${window.location.origin}/users/update/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData,
      });
      console.log("Data: ", profile)
      console.log("Rsponse: ", response)
      if (response.status === 200) {
        setMessageType("Success");
        setNotificationMessage('Profile Successfully updated');
        setShowNotification(true);
        setProfile(null); 

        handleProfileModalClose();
      } else {
        setMessageType("Error");
        setNotificationMessage('Error in Updating Profile');
        setShowNotification(true);
      }
    } catch (err) {
      console.error(err);
      setMessageType("Error");
      setNotificationMessage('An unexpected error occurred');
      setShowNotification(true);
    }
}else{
    setMessageType("Error");
    setNotificationMessage('Please Upload Profile Picture');
    setShowNotification(true);

}
  };

  return (
    <>
      <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            accept="image/*"
            id="picture"
            name="picture"
            type="file"
            required
            onChange={handlePictureUpload}
            style={{ display: 'none' }}
          />
          <Box
            sx={{
              border: 1,
              width: '100%',
              borderColor: 'gray',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
              marginTop: 1,
            }}
            required
          >
            <FormLabel htmlFor="picture">
              <IconButton
                component="span"
                sx={{
                  color: '#FF8C00',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <FileDownloadOutlinedIcon />
                {profile ? profile.name : ' Upload Profile Picture'}
              </IconButton>
            </FormLabel>
          </Box>
        </Box>
      <Button onClick={handleSubmit} 
        sx={{ 
          bgcolor: '#FF8C00', 
          color: 'white', 
          fontWeight:'bold', 
          textTransform: 'none', 
          position: 'absolute',    
          bottom: 5,              
          left: 6,             
          }}>Update</Button>

      <Snackbar
        open={showNotification}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity={String(messageType).includes('Success') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
  </>
  );
};
