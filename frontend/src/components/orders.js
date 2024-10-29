import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
    const navigate = useNavigate();
  const [menus, setMenus] = useState([]);

  // Fetch menu items when the component mounts
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(`${window.location.origin}/customer/view/menus`); 
        const data = await response.json();
        console.log('Menus :', data);
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <Box sx={{ paddingTop: 5, 
      ml: {xs: '2%', sm: '5%', md: '10%', lg: '15%'},
      mr: {xs: '2%', sm: '5%', md: '10%', lg: '15%'},
      mb: {xs: 1, sm: 2, md: 3, lg: 4},
    }}>
      <Grid container spacing={3}> 
        {menus.map((menu) => (
          <Grid item xs={12} sm={4} key={menu.menu_id}> 
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, borderRadius: '50%', marginTop: 2 }} // Make image circular and position it at the top
                image={menu.photo} 
                alt={menu.menu_name}
              />
              <CardContent sx={{ textAlign: 'center' }}> {/* Center align text */}
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>{menu.menu_name}</Typography>
                <Typography variant="body2">
                  {Array.isArray(menu.topping) ? menu.topping.join(', ') : (typeof menu.topping === 'string' ? JSON.parse(menu.topping).join(', ') : '')}
                </Typography>
                <Typography variant="h5" sx={{ color: '#32CD32', fontWeight: 'bold', display: 'inline' }}>
                  {menu.price}
                </Typography>
                <Typography sx={{ display: 'inline', color: 'inherit' }}>
                  <sup>Birr</sup>
                </Typography>
                <Button 
                    onClick={() => navigate('/signin')} 
                    sx={{ bgcolor: '#FF8C00', color: 'white', fontWeight: 'bold', marginLeft: 1, pl:2, pr:2, borderRadius:2, textTransform: 'none' }}>
                        Order Now
                </Button>

                <Divider sx={{mt:2}}/>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        sx={{ width: 40, height: 40, borderRadius: '50%' }} 
                        image={menu.user_profile} 
                        alt={" "}
                      />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                      {menu.restaurant}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
