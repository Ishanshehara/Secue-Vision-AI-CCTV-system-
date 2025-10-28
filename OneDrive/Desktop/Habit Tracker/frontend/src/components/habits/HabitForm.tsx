import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Habit } from '../../types';

interface HabitFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Habit>) => void;
  habit?: Habit;
}

export const HabitForm = ({ open, onClose, onSubmit, habit }: HabitFormProps) => {
  const [title, setTitle] = React.useState(habit?.title || '');
  const [description, setDescription] = React.useState(habit?.description || '');
  const [frequency, setFrequency] = React.useState<'daily' | 'weekly'>(
    habit?.frequency || 'daily'
  );
  const [timeOfDay, setTimeOfDay] = React.useState(habit?.timeOfDay || '');
  const [daysOfWeek, setDaysOfWeek] = React.useState<number[]>(
    habit?.daysOfWeek || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      frequency,
      timeOfDay,
      daysOfWeek: frequency === 'weekly' ? daysOfWeek : undefined,
    });
  };

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{habit ? 'Edit Habit' : 'New Habit'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Frequency</InputLabel>
            <Select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
              label="Frequency"
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Time of Day"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            type="time"
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          {frequency === 'weekly' && (
            <FormGroup sx={{ mt: 2 }}>
              {weekDays.map((day, index) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={daysOfWeek.includes(index)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDaysOfWeek([...daysOfWeek, index]);
                        } else {
                          setDaysOfWeek(daysOfWeek.filter((d) => d !== index));
                        }
                      }}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {habit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};