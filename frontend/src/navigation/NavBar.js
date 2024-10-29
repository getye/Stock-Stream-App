import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Divider, MenuItem, Link, IconButton, useMediaQuery, Modal, useTheme } from '@mui/material';
import { Profile } from './profile';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import AllInboxSharpIcon from '@mui/icons-material/AllInboxSharp';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import topLeft from '../assets/topLeftPizza.png';






const Footer = ({open, handleClose, handleOpen}) => (
  <Box 
    sx={{ 
      p: 1, 
      textAlign: 'center', 
      backgroundColor: 'black', 
      color:'white',
      zIndex: 1000,
      position: { lg: 'fixed', md:'fixed', sm: 'relative', xs: 'relative' },
      mt: { sm: 'auto', xs: 'auto' },
      bottom: 0, 
      left: 0, 
      right: 0,
    }}
  >
    <Stack 
      direction={'row'}
      spacing={2} 
      justifyContent="space-between" 
      alignItems="center" 
      sx={{ pl:{lg:30, md:15, sm:5, xs:1}, width: '100%'}}
    > 
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} All rights reserved.
        </Typography>
        <Link 
          href="/terms" 
          sx={{ 
            mx: 1, 
            color: 'white',  
            textDecoration: 'none',  
            fontWeight: 'bold',  
            '&:hover': {
              textDecoration: 'none',  
              color: 'secondary.main',  
            },
          }}>
          Terms and Conditions
        </Link>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
      <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FacebookIcon />
      </Link>
      <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </Link>
      <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <TwitterIcon />
      </Link>
      <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <YouTubeIcon />
      </Link>
      <Link onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        Developer
      </Link>

      {/* Modal for Developer Info */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
        }}>
          <Typography variant="h6" component="h2">
            Developer 
          </Typography>
          <Divider/>
          <Typography sx={{ mt: 2 }}>
            Getye Demil<br />
            Full Stack Developer<br />
            getye2008@gmail.com
          </Typography>
          <Link href={'https://getye.github.io/'}>More About</Link>
          <Box textAlign="right" sx={{ mt: 2 }}>
            <IconButton onClick={handleClose} sx={{textTransform:'none'}}>Close</IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
    </Stack>
  </Box>
);


export const NavBar = (props) => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const { window } = props;
  // State to control the mobile drawer
  const [open, setOpen] = React.useState(false);
  const [isCollapsed, setCollapsed] = React.useState(false);

  const theme = useTheme();

  const toggleDrawer = () => {
      setCollapsed(!isCollapsed);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const verySmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));





 

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/')
  };

  const navWidth = 240
  const drawer = (
    <List sx={{ height: 'auto', borderColor: 'gray' }}>
      {(isCollapsed )? (
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}>
              <MenuOpenIcon />
          </IconButton> 
      ):(
        <>
        <Stack justifyContent={'space-between'} padding={1.5} direction="row" gap={3}>
          <Stack direction="row" gap={2}>
            <Typography variant="h6">Pizza</Typography>
          </Stack>
            <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer}>
                  <MenuOpenIcon />
              </IconButton>     
        </Stack>
        <Divider />

        <img src={topLeft} alt='Pizza' width={'100%'} />
        
        {/* Super Admin Links */}
        {userRole === "Super Admin" && (
            <>
            <ListItem disablePadding onClick={() => { navigate("/superadmin/earnings") }}>
              <ListItemButton >
                <ListItemIcon>
                  <SummarizeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => { navigate("/superadmin/admins") }}>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admins" />
                </ListItemButton>
              </ListItem>

            </>
          )}

        {/* Restaurant Register/Admin Links */}
        {userRole === "Restaurant Register" && (
          <>
          <ListItem disablePadding onClick={() => { navigate("/admin/reports") }}>
              <ListItemButton >
                <ListItemIcon>
                  <SummarizeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => { navigate("/admin/roles") }}>
              <ListItemButton >
                <ListItemIcon>
                  <Person2OutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Role" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => { navigate("/admin/users") }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>

          </>
        )}

        {/* Kichen manager Links */}
        {userRole === "Kitchen Manager" && (
          <>
            <ListItem disablePadding onClick={() => { navigate("/kichen-manager/dashboard") }}>
              <ListItemButton>
                <ListItemIcon>
                  <SpaceDashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => { navigate("/kichen-manager/menu") }}>
              <ListItemButton>
                <ListItemIcon>
                  <LocalPizzaOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Add Menu" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={() => { navigate("/kichen-manager/orders") }}>
              <ListItemButton>
                <ListItemIcon>
                  <AllInboxSharpIcon/>
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {/* Branch manager Links */}
        {userRole === 'Branch Manager' && (
          <>
            <ListItem disablePadding onClick={() => { navigate("/branch-manager/dashboard") }}>
              <ListItemButton>
                <ListItemIcon>
                  <SpaceDashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={() => { navigate("/branch-manager/orders") }}>
              <ListItemButton>
                <ListItemIcon>
                  <AllInboxSharpIcon/>
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>

          </>
        )}

              {/* Cashier Links */}
        {userRole === 'Cashier' && (
          <>
            <ListItem disablePadding onClick={() => { navigate("/cashier/orders") }}>
              <ListItemButton>
                <ListItemIcon>
                  <SpaceDashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {/* Customer Links */}
        {userRole === 'Customer' && (
          <>
            <ListItem disablePadding onClick={() => { navigate("/customer/orders") }}>
              <ListItemButton>
                <ListItemIcon>
                  <SpaceDashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={() => { navigate("/customer/menu") }}>
              <ListItemButton>
                <ListItemIcon>
                  <LocalPizzaIcon />
                </ListItemIcon>
                <ListItemText primary="Menu" />
              </ListItemButton>
            </ListItem>

          </>
        )}
        <Divider/>
          <ListItem disablePadding onClick={ handleSignOut } sx={{maxWidth:'80%', marginLeft:3, paddingTop:2}}>
              <ListItemButton sx={{marginLeft:2}}>
                <ListItemIcon>
                  <LogoutOutlinedIcon sx={{color:'red'}}/>
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{color:'red'}}/>
              </ListItemButton>
          </ListItem>
        </>
      ) }
              
    </List>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '56px' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: '100%', backgroundColor: 'white', color: 'black', padding: { xs: '0 8px', sm: '0 16px' } }}>

          {(!userRole) ? (
          <Toolbar sx={{ justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
            {(!isMobile) && (
              <>
              <Typography>Online Trading App</Typography>
              <Box sx={{ justifyContent: 'flex-end', display:'inline-list-item'}}>
                <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
                <MenuItem onClick={() => navigate('/about')}>About</MenuItem>
                <MenuItem onClick={() => navigate('/signin')}>Login</MenuItem>
              </Box>
              </>
            )}
            {(isMobile)&&(

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <MenuItem title='Home' sx={{width:'60px'}} onClick={() => navigate('/')}><HomeIcon/></MenuItem>
                  <MenuItem title='About' sx={{width:'60px'}} onClick={() => navigate('/about')}><InfoIcon/></MenuItem>
                  <MenuItem title='Order' sx={{width:'60px'}} onClick={() => navigate('/orders')}><ShoppingCartIcon/></MenuItem>
                  <MenuItem title='Sign in' sx={{width:'60px'}} onClick={() => navigate('/signin')}><LoginIcon/></MenuItem>
              </Box>
            )}
          </Toolbar>
          ) : (
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
              <Profile role={userRole}/>
            </Toolbar>
          )}
        
      </AppBar>
      {(userRole) && (
        <Box component="nav" 
            sx={{ 
              width: navWidth}} 
              aria-label="mailbox folders">
            
            {(isMobile || verySmall)? (
                  <>
                  {/* Drawer for mobile */}
                  <Drawer
                         container={container}
                         variant="persistent"
                         open
                         sx={{
                          width: isCollapsed ? '40px' : '180px',  
                          transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                          }),
                          '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: isCollapsed ? '40px' : '180px',
                          },
                         }}
                       >
                         {drawer}
                    </Drawer>
                  </>
                  ):(
                    <>
                  {/* Permanent Drawer for desktop */}
                  <Drawer
                      variant="persistent"
                      open
                      sx={{
                        width: isCollapsed ? '60px' : navWidth,  
                        transition: theme.transitions.create('width', {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.enteringScreen,
                        }),
                        '& .MuiDrawer-paper': {
                          boxSizing: 'border-box',
                          width: isCollapsed ? '60px' : navWidth,
                        },
                      }}
                      >
                  {drawer}
                </Drawer>
                </>
                  )}
 
        </Box>
      )}
      <Box sx={{ flexGrow: 1}} />
          <Footer 
            open={open} 
            handleClose={handleClose} 
            handleOpen={handleOpen}
            isMobile={isMobile}/>
    </Box>
  );
};

NavBar.propTypes = {
  window: PropTypes.func,
};