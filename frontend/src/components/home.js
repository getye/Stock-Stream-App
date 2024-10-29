

import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';
import home1 from '../assets/homeImage1.png'
import home2 from '../assets/homeImage2.png' 
import featured1 from '../assets/featured1.png'
import featured2 from '../assets/featured2.png'
import featured3 from '../assets/featured3.png'

import { useEffect, useState } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
  
   
export const Home =() =>{
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 1,
      autoplay: 3000,
      pagination: {
        el: '.glide__bullets',
        clickable: true,
      },
    });
  
    glide.mount();
  
    return () => glide.destroy(); // Cleanup on unmount
  }, []);


  useEffect(() => {
    const fetchTopRestaurant = async () => {
      try {
        const response = await fetch(`${window.location.origin}/customer/view/restaurant`); 
        const data = await response.json();
        console.log('Menus :', data);
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchTopRestaurant();
  }, []);

return (
    <>
    <Grid 
        container 
        sx={{
            alignItems: 'center', 
            paddingTop: 2, 
            pl: {xs: '1%', sm: '2%', md: '3%', lg: '5%'},
            background: 'linear-gradient(to bottom, #FFFFFF, #F5D58E, #FFFFFF)',
        }}
        >
      <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography 
          sx={{
            background: 'linear-gradient(to right, #FF8C00, #FFCBA4)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: {xs: '1.5rem', sm: '3rem', md: '5rem', lg: '7rem'},
            fontWeight: 'bold',
          }}
        >
          Order us
        </Typography>
        <Typography 
          sx={{
            fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'},
          }}
        >Order Pizzas with different toppings. Select toppings as you went. </Typography>
        <Typography sx={{
           fontSize: {xs: '10px', sm: '12px', md: '14px', lg: '16px'},
           pb:{xs: 1, sm: 2, md: 3, lg: 4}
           }}>Serach Pizzas here.</Typography>
          <Paper
            component="form"
            sx={{
              p: { xs: '8px 2px', sm: '10px 3px', md: '12px 4px', lg: '13px 4px' }, 
              borderRadius: 10,
              display: 'flex',
              width: { xs: '90%', sm: '75%', md: '65%', lg: '60%' }, 
            }}
          >
            <InputBase
              sx={{
                ml: { xs: 1, sm: 2, md: 3, lg: 4}, 
                flex: 1,
                fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' } 
              }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
              type="button"
              sx={{
                bgcolor: '#FF8C00',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '35px', sm: '38px', md: '40px', lg: '45px' }, 
                height: { xs: '35px', sm: '38px', md: '40px', lg: '45px' }, 
                transition: 'background-color 0.3s',
                '&:hover': {
                  bgcolor: '#FF6F00',
                },
              }}
              aria-label="search"
            >
              <SearchIcon sx={{ color: 'white', fontSize: { xs: '18px', sm: '20px', md: '24px', lg: '28px' } }} /> {/* Adjust icon size */}
            </IconButton>
          </Paper>

      </Grid>

      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'end', position: 'relative' }}>
        <img src={home1} alt='Pizza' style={{maxWidth:'65%', maxHeight:'80px'}}/>
        <img src={home2} alt='Pizza' style={{maxWidth:'80%', maxHeight:'80vb'}}/>
      </Grid>
    </Grid>
    <Box sx={{pl: { xs: 1, sm: 2, md: 4, lg: 8}, pt: 5,}}>
        <Typography 
          variant="h5"
          sx={{
            color:'gray',
            }}>Featured Pizza</Typography>
        <Box sx={{ 
          width: { xs: '99%', sm: '92%', md: '80%', lg: '60%'}, 
          height: 'auto', 
          display: 'flex', 
          justifyContent: 'center' 
        }}>
          <div className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {[featured1, featured2, featured3].map((featured, index) => (
                  <li key={index} className="glide__slide">
                    <Grid 
                      container 
                      sx={{ 
                        bgcolor: index === 0 ? '#3D3C3A' : index === 1 ? '#4E5B31' : '#438D80',
                        borderRadius: 10, 
                        pl: { xs: 0, sm: 1, md: 2, lg: 3 }, 
                        alignItems: 'stretch',  // Ensure all slides have equal height
                        minHeight: { xs: 100, sm: 150, md: 200, lg: 250 }, 
                        maxHeight: { xs: 150, sm: 200, md: 250, lg: 300 }
                      }}
                    >
                      <Grid 
                        item 
                        xs={6} 
                        sx={{ 
                          pt: { xs: 1, sm: 2, md: 4, lg: 6 }, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'space-between'  // Ensure content spacing works well in equal height
                        }}
                      >
                        <Typography
                          sx={{ 
                            pb: { xs: 1, sm: 2, md: 3, lg: 4 }, 
                            pl: { xs: 1, sm: 2, md: 3, lg: 4 }, 
                            color: 'white',
                            fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' }
                          }}
                        >
                          Make Your First Order and Get
                          <Typography component="span" sx={{ 
                            color: '#FF8C00', 
                            pl: { xs: 1, sm: 2, md: 3, lg: 4 }, 
                            fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' }
                          }}>
                            50% Off
                          </Typography>
                        </Typography>
                        <Box   sx={{ 
                                display: 'flex',            // Use flexbox layout
                                justifyContent: 'center',    // Center horizontally
                                alignItems: 'center',        // Center vertically
                                height: '100%',              // Ensure the container takes full height
                                pt: { xs: 0, sm: 1, md: 2, lg: 3 }  // Padding for spacing
                              }}>
                          <Button 
                            sx={{ 
                              bgcolor: '#FF6F00', 
                              color: 'white', 
                              borderRadius: 2, 
                              padding: {xs:'3px', sm:'4px', md:'5px', lg:'6px'},  
                              width: {xs:'45%', sm:'40%', md:'35%', lg:'30%'},  
                              display: 'inline-block',
                              textTransform: 'none'  // Maintain original text case without full caps
                              }}>
                            <Typography sx={{ lineHeight: 1, padding: {xs:'1px', sm:'2px', md:'3px', lg:'4px'},  fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' }, textTransform: 'capitalize' }}>
                              Order Now
                            </Typography>
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sx={{ justifyContent: 'end' }}>
                        <img src={featured} alt="Pizza" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50px' }} />
                      </Grid>
                    </Grid>
                  </li>
                ))}
              </ul>
            </div>
            <Box className="glide__bullets" data-glide-el="controls[nav]">
              {Array.from({ length: 3 }).map((_, index) => (
                <Button
                  key={index}
                  className="glide__bullet"
                  data-glide-dir={`=${index}`}
                  sx={{
                    backgroundColor: '#FF8C00',
                    height: 10,
                    width: 10,
                    minWidth: 0,
                    padding: 0,
                    borderRadius: '50%',
                    opacity: 0.5,
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                    },
                    '&.glide__bullet--active': {
                      opacity: 1,
                    },
                  }}
                />
              ))}
            </Box>
          </div>
        </Box>

    </Box>
    <Box sx={{ paddingTop: 5, 
      pl: { xs: 1, sm: 2, md: 4, lg: 8},
      pr: { xs: 1, sm: 2, md: 4, lg: 8},
      }}>
      <Grid container spacing={2}> 
        <Typography variant="h5" sx={{color:'gray', pl:1}}>Top Restaurants</Typography>

        {restaurants.map((data) => (
          <Grid item xs={12} sm={4} key={data.restaurant}> 
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}> {/* Center align text */}
              
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        sx={{ width: 40, height: 40, borderRadius: '50%' }} 
                        image={data.user_profile} 
                        alt={" "}
                      />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                      {data.restaurant}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{mt:1}}/>
                <Typography variant="h6" sx={{ color: '#32CD32', fontWeight: 'bold', display: 'inline' }}>
                  {data.total_orders} 
                </Typography>
                <Typography sx={{ display: 'inline', color: 'inherit', ml:1 }}>
                  Orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
    );
   }