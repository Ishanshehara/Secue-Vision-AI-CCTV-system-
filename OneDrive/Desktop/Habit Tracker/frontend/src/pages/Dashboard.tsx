import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { habitService } from '../services/api';
import { HabitCard } from '../components/habits/HabitCard';
import { HabitForm } from '../components/habits/HabitForm';
import { Habit } from '../types';

export const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedHabit, setSelectedHabit] = React.useState<Habit | undefined>();
  const queryClient = useQueryClient();

  const { data: habits = [] as Habit[], isLoading } = useQuery({
    queryKey: ['habits'],
    queryFn: habitService.getHabits
  });

  const createHabit = useMutation({
    mutationFn: (habit: Omit<Habit, '_id' | 'streak' | 'completedDates' | 'createdAt'>) =>
      habitService.createHabit(habit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      setIsFormOpen(false);
    },
  });

  const updateHabit = useMutation({
    mutationFn: (params: { id: string; habit: Partial<Habit> }) =>
      habitService.updateHabit(params.id, params.habit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      setIsFormOpen(false);
      setSelectedHabit(undefined);
    },
  });

  const deleteHabit = useMutation({
    mutationFn: (id: string) => habitService.deleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const completeHabit = useMutation({
    mutationFn: (id: string) => habitService.markComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const handleSubmit = (data: Partial<Habit>) => {
    if (selectedHabit) {
      updateHabit.mutate({ id: selectedHabit._id, habit: data });
    } else {
      createHabit.mutate(data as Habit);
    }
  };

  const handleEdit = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedHabit(undefined);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Your Habits</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Habit
        </Button>
      </Box>

      <Grid container spacing={3}>
        {habits.map((habit: Habit) => (
          <Grid key={habit._id} sx={{ gridColumn: { xs: '1 / -1', md: 'span 6' } }}>
            <HabitCard
              habit={habit}
              onComplete={() => completeHabit.mutate(habit._id)}
              onEdit={() => handleEdit(habit)}
              onDelete={() => deleteHabit.mutate(habit._id)}
            />
          </Grid>
        ))}
      </Grid>

      <HabitForm
        open={isFormOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        habit={selectedHabit}
      />
    </Container>
  );
};