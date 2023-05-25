import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '@/context/AuthContext';

function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleRoomsClick = () => {
    router.push('/rooms');
  };

  const handleRestaurantClick = () => {
    router.push('/restaurant');
  };

  const handleAboutClick = () => {
    router.push('/about');
  };

  const handleBlogClick = () => {
    router.push('/blog');
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/clients/create');
  };

  const handleRegisterUserClick = () => {
    router.push('/auth/Register');
  };

  const handleReservationClick = () => {
    router.push('/reservation');
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/auth/login');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSmallScreen = useMediaQuery((theme:any) => theme.breakpoints.down('md'));

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 46, 120, 0.900)', boxShadow: 'none'}}>
      <Toolbar>
        {isSmallScreen ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleHomeClick();
                }}
                sx={{
                  fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Home
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleRoomsClick();
                }}
                sx={{
                  fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Our Rooms
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleRestaurantClick();
                }}
                sx={{
                  fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Restaurant
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleAboutClick();
                }}
                sx={{
                  fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                About Us
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleBlogClick();
                }}
                sx={{
                  fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Blog
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleContactClick();
                }}
                sx={{
                  fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Contact
              </MenuItem>

              <MenuItem onClick={() => {
                    handleMenuClose();
                    handleRegisterUserClick();
                  }}
                  sx={{
                    fontSize: '14px',
                    paddingTop: '1.5rem',
                    paddingBottom: '1.5rem',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    fontWeight: 600,
                    '&:hover': {
                      color: '#f5e4c3',
                      transform: 'scale(1.1)',
                    },
                  }}  
                  >
                    Register
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{ fontWeight: 700, fontSize: '24px' }}>Harbor <span style={{ color: '#f5e4c3' }}>Hotel</span></span>
          </Typography>
        )}
        {!isSmallScreen && (
          <>
            <Button color="inherit" onClick={handleHomeClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              Home
            </Button>
            <Button color="inherit" onClick={handleRoomsClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              Our Rooms
            </Button>
            <Button color="inherit" onClick={handleRestaurantClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              Restaurant
            </Button>
            <Button color="inherit" onClick={handleAboutClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              About Us
            </Button>
            <Button color="inherit" onClick={handleBlogClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              Blog
            </Button>
            <Button color="inherit" onClick={handleContactClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              Contact
            </Button>
            <Button color="inherit" onClick={handleLoginClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              Login
            </Button>
            <Button color="inherit" onClick={handleRegisterUserClick} sx={{ fontSize: '14px',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontWeight: 300,
                  '&:hover': {
                    color: '#f5e4c3',
                    transform: 'scale(1.1)',
                  },
                }}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
