import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '@/context/AuthContext';
import jwt_decode from 'jwt-decode';

function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateN: '',
    email: '',
    image: '',
    id_post: ''
  });
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: {
          email?: string;
          nom?: string;
          image?: string;
          dateN?: string;
          prenom?: string;
          id_post?: string;
        } = jwt_decode(token);
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: decoded.email || '',
          nom: decoded.nom || '',
          image: decoded.image || '',
          dateN: decoded.dateN || '',
          prenom: decoded.prenom || '',
          id_post: decoded.id_post || ''
        }));
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [isLoggedIn]);

  console.log(formData.nom);

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleRoomsClick = () => {
    router.push('/Client/Room/rooms');
  };

  const handleRestaurantClick = () => {
    router.push('/Client/restaurant');
  };

  const handleAboutClick = () => {
    router.push('/Client/about');
  };

  const handleBlogClick = () => {
    router.push('/Client/Blog/blogs');
  };

  const handleContactClick = () => {
    router.push('/Client/contact');
  };

  const handleLoginClick = () => {
    router.push('/auth/login');
  };
  const handleRegisterUserClick = () => {
    router.push('/auth/Register');
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/auth/login');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <AppBar position="static" sx={{ backgroundColor: hasScrolled ? 'rgba(0, 98, 255, 0.400)' : 'transparent', boxShadow: 'none' }}>
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
                  sx={menuItemStyles}
                >
                  Home
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleRoomsClick();
                  }}
                  sx={menuItemStyles}
                >
                  Our Rooms
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleRestaurantClick();
                  }}
                  sx={menuItemStyles}
                >
                  Restaurant
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleAboutClick();
                  }}
                  sx={menuItemStyles}
                >
                  About Us
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleBlogClick();
                  }}
                  sx={menuItemStyles}
                >
                  Blog
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleContactClick();
                  }}
                  sx={menuItemStyles}
                >
                  Contact
                </MenuItem>

                {isLoggedIn ? (
                  <div style={{border: '1', borderRadius: '1'}}>
                    <MenuItem sx={menuItemStyles}>{formData.prenom}</MenuItem>
                    <MenuItem onClick={() => {
                      handleMenuClose();
                      handleLogoutClick();
                    }} sx={menuItemStyles}>Logout</MenuItem>
                  </div>
                ) : (
                  <>
                    <MenuItem onClick={() => {
                      handleMenuClose();
                      handleRegisterUserClick();
                    }} sx={menuItemStyles}>Register</MenuItem>
                    <MenuItem onClick={() => {
                      handleMenuClose();
                      handleLoginClick();
                    }} sx={menuItemStyles}>Login</MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <span style={{ fontWeight: 700, fontSize: '24px' }}>Harbor <span style={{ color: '#f5e4c3' }}>Hotel</span></span>
            </Typography>
          )}
          {!isSmallScreen && (
            <>
              <Button color="inherit" onClick={handleHomeClick} sx={buttonStyles}>Home</Button>
              <Button color="inherit" onClick={handleRoomsClick} sx={buttonStyles}>Our Rooms</Button>
              <Button color="inherit" onClick={handleRestaurantClick} sx={buttonStyles}>Restaurant</Button>
              <Button color="inherit" onClick={handleAboutClick} sx={buttonStyles}>About Us</Button>
              <Button color="inherit" onClick={handleBlogClick} sx={buttonStyles}>Blog</Button>
              <Button color="inherit" onClick={handleContactClick} sx={buttonStyles}>Contact</Button>
              {isLoggedIn ? (
                <>
                  <Button color="inherit" onClick={handleLogoutClick} sx={buttonStyles}>Logout</Button>
                  <Avatar alt="Remy Sharp" src={formData.image} />
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={handleLoginClick} sx={buttonStyles}>Login</Button>
                  <Button color="inherit" onClick={handleRegisterUserClick} sx={buttonStyles}>Register</Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const menuItemStyles = {
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
};

const buttonStyles = {
  fontSize: '14px',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  paddingLeft: '20px',
  paddingRight: '20px',
  fontWeight: 300,
  '&:hover': {
    color: '#f5e4c3',
    transform: 'scale(1.1)',
  },
};

export default Navbar;