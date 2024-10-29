import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Alert, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { z } from 'zod';
import {UpdateProfile} from '../components/updateProfile'; 

const passwordSchema = z.object({
  oldPassword: z.string().min(1, { message: "Old Password is Empty" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export const Profile = ({role}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [profileModalOpen, setProfileModalOpen] = useState(false); // Profile modal state
  const anchorRef = useRef(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirm = () => setShowConfirm((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownConfirm = (event) => event.preventDefault();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  // Handle modal open/close
  const handleModalOpen = () => {
    setModalOpen(true);
    setOpen(false); // Close menu when opening modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewPassword('');
    setOldPassword('');    
    setConfirmPassword('');
    setErrors({});
  };

  // Handle profile modal open/close
  const handleProfileModalOpen = () => {
    setProfileModalOpen(true);
    setOpen(false); // Close menu when opening profile modal
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
  };

  // Handle password update
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleUpdatePassword = async () => {
    const result = passwordSchema.safeParse({ oldPassword, newPassword, confirmPassword });

    if (!result.success) {
      const formErrors = result.error.format();
      setErrors({
        oldPassword: formErrors.oldPassword?._errors[0],
        newPassword: formErrors.newPassword?._errors[0],
        confirmPassword: formErrors.confirmPassword?._errors[0],
      });
    } else {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessageType('Error');
          setModalOpen(false); // Close the modal
          setNotificationMessage('Token is expired login again');
          setShowNotification(true);
        }
        const response = await fetch(`${window.location.origin}/user/update/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: newPassword,
            oldPassword: oldPassword,
          }),
        });
        console.log("Respons: ", response)
        // Check if the update was successful
        if (response.ok) {
          setMessageType('Success');
          setModalOpen(false); // Close the modal
          setNotificationMessage('Password Successfully Updated');
          setShowNotification(true);
        } else {
          // Handle error response
          const errorData = await response.json();
          setMessageType('Error');
          setNotificationMessage(`Error: ${errorData.message}`);
          setShowNotification(true);
        }
      } catch (err) {
        setNotificationMessage('An unexpected error occurred');
        setShowNotification(true);
        console.error(err);
      }
    }
  };

  return (
    <>
      <NotificationsActiveIcon />
      <Stack direction="row" spacing={2} sx={{ marginLeft: 2 }}>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar sx={{ color: 'red' }} />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {(role==="Customer")? (
                        <>
                        <MenuItem onClick={handleModalOpen}>Update Password</MenuItem> {/* Open password modal */}
                        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </>
                      ):(
                        <>
                        <MenuItem onClick={handleProfileModalOpen}>My Profile</MenuItem> {/* Open profile modal */}
                        <MenuItem onClick={handleModalOpen}>Update Password</MenuItem> {/* Open password modal */}
                        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </>
                      ) }
                      
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>

      {/* Modal for updating password */}
      <Dialog open={modalOpen} onClose={handleModalClose} >
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <FormControl size='small' sx={{ paddingBottom: 1, width: '100%', mt:2 }} variant="outlined">
              <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
              <OutlinedInput
                id="oldPassword"
                type={showPassword ? 'text' : 'password'}
                name="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                required
                fullWidth
                autoComplete='off'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
              />
              {errors.oldPassword && (
                <Typography style={{ color: 'red', margin: 0 }}>{errors.OldPassword}</Typography>
              )}
          </FormControl>
          <FormControl size='small' sx={{ paddingBottom: 1, width: '100%', mt:2 }} variant="outlined">
              <InputLabel htmlFor="newPassword">New Password</InputLabel>
              <OutlinedInput
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                fullWidth
                autoComplete='off'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
              {errors.newPassword && (
                <Typography style={{ color: 'red', margin: 0 }}>{errors.newPassword}</Typography>
              )}
          </FormControl>
          <FormControl size='small' sx={{ width: '100%', paddingBottom: 2 }} variant="outlined">
              <InputLabel htmlFor="confirm">Confirm Password</InputLabel>
              <OutlinedInput
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                autoComplete='off'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirm}
                      onMouseDown={handleMouseDownConfirm}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              {errors.confirmPassword && (
                <Typography style={{ color: 'red', margin: 0 }}>{errors.confirmPassword}</Typography>
              )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
              onClick={handleModalClose}
              sx={{
                bgcolor: 'red', 
                color: 'white', 
                fontWeight:'bold', 
                textTransform: 'none',
                }}
              >Cancel</Button>
          <Button 
              onClick={handleUpdatePassword} 
              sx={{
                bgcolor: '#FF8C00', 
                color: 'white', 
                fontWeight:'bold', 
                textTransform: 'none',
                }}
              >Update</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowNotification(false)} severity={messageType.toLowerCase()}>
          {notificationMessage}
        </Alert>
      </Snackbar>

      {/* Modal for updating profile */}
      <Dialog open={profileModalOpen} onClose={handleProfileModalClose} >
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <UpdateProfile onClose={handleProfileModalClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileModalClose}sx={{ bgcolor: 'red', color: 'white', fontWeight:'bold', textTransform: 'none', position: 'absolute', bottom: 5}}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


