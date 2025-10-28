import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NotificationPopover } from '../notifications/NotificationPopover';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
        <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: 'background.default',
      backgroundImage: 'linear-gradient(45deg, rgba(196, 164, 132, 0.05) 25%, transparent 25%, transparent 75%, rgba(196, 164, 132, 0.05) 75%, rgba(196, 164, 132, 0.05)), linear-gradient(45deg, rgba(196, 164, 132, 0.05) 25%, transparent 25%, transparent 75%, rgba(196, 164, 132, 0.05) 75%, rgba(196, 164, 132, 0.05))',
      backgroundSize: '60px 60px',
      backgroundPosition: '0 0, 30px 30px'
    }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Habit Tracker
          </Typography>
          <NotificationPopover />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};