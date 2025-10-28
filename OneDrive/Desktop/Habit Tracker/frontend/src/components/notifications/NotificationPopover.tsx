import React from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge,
  Typography,
  Box,
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../../services/api';
import { Notification } from '../../types';
import { formatDistanceToNow } from 'date-fns';

export const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.getNotifications
  });

  const markAsRead = useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const deleteNotification = useMutation({
    mutationFn: notificationService.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead.mutate(notification._id);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: 300, maxHeight: 400, overflow: 'auto' }}>
          {notifications.length ? (
            notifications.map((notification: Notification) => (
              <ListItem
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  backgroundColor: notification.read ? 'transparent' : 'action.hover',
                  cursor: 'pointer'
                }}
              >
                <ListItemText
                  primary={notification.message}
                  secondary={
                    <Box
                      component="span"
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography variant="caption">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification.mutate(notification._id);
                        }}
                      >
                        Delete
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};