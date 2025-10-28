import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Habit } from '../../types';
import { format } from 'date-fns';

interface HabitCardProps {
  habit: Habit;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const HabitCard = ({
  habit,
  onComplete,
  onEdit,
  onDelete,
}: HabitCardProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isCompletedToday = habit.completedDates.some(
    (date) => format(new Date(date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <Card sx={{ 
        mb: 2,
        border: '1px solid rgba(196, 164, 132, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(166, 139, 108, 0.12)'
        }
      }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">{habit.title}</Typography>
            {habit.description && (
              <Typography color="textSecondary" variant="body2">
                {habit.description}
              </Typography>
            )}
          </Box>
          <Box>
            <IconButton onClick={onComplete} disabled={isCompletedToday}>
              <CheckCircleIcon color={isCompletedToday ? 'primary' : 'action'} />
            </IconButton>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
        <Box mt={2}>
          <Chip
            label={`${habit.frequency.charAt(0).toUpperCase()}${habit.frequency.slice(1)}`}
            size="small"
            sx={{ mr: 1 }}
          />
          {habit.streak > 0 && (
            <Chip
              label={`${habit.streak} day streak!`}
              color="primary"
              size="small"
            />
          )}
        </Box>
      </CardContent>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};