import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NotificationPopover } from '../notifications/NotificationPopover';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledLogo = styled(TrackChangesIcon)(({ theme }) => ({
  fontSize: '2rem',
  color: theme.palette.primary.main,
  animation: 'pulse 2s infinite',
  filter: 'drop-shadow(0 2px 4px rgba(166, 139, 108, 0.2))',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const BrandName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <LogoContainer sx={{ flexGrow: 1 }}>
          <StyledLogo />
          <BrandName variant="h6">
            HabitFlow
          </BrandName>
        </LogoContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationPopover />
          <Button color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};