import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#C4A484', // Warm cream brown
      light: '#D4BC9C',
      dark: '#A68B6C',
    },
    secondary: {
      main: '#E6CCB2', // Light cream
      light: '#F7E6D4',
      dark: '#BFA98F',
    },
    background: {
      default: '#FDF5E6', // Old lace (cream background)
      paper: '#FFFAF0', // Floral white
    },
    text: {
      primary: '#5C4033', // Rich brown
      secondary: '#8B7355', // Lighter brown
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});