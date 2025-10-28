# Habit Tracker Application

A full-stack application for tracking daily and weekly habits with progress reports and notifications. This application helps users build and maintain positive habits through an intuitive interface, progress visualization, and smart notifications.

## Key Features

### Habit Management
- Create and track daily or weekly habits
- Set preferred time of day for habits
- Add descriptions and custom goals
- Track completion streaks and progress

### Progress Visualization
- Visual streak counters
- Progress history and trends
- Achievement badges
- Weekly and monthly statistics

### Smart Notifications
- Customizable reminders
- Achievement notifications
- Streak milestone alerts
- Email notifications for important updates

### User Experience
- Clean, intuitive interface
- Mobile-responsive design
- Quick habit completion
- Real-time updates

- User authentication
- Daily/weekly habit tracking
- Visual progress with streak counters
- Email and in-app notifications
- Interactive dashboard

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Community Edition
- npm or yarn

## Setup Instructions

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community

2. Clone the repository and install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:

Backend (.env file in backend folder):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

Frontend (.env file in frontend folder):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development servers:

In the backend directory:
```bash
npm run dev
```

In the frontend directory:
```bash
npm start
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Technical Architecture

### Frontend Architecture

#### Components
- **Habit Management**
  - `HabitCard`: Displays individual habit with completion status and streak
  - `HabitForm`: Form for creating and editing habits
  - `Dashboard`: Main view displaying all habits and progress

- **Notifications**
  - `NotificationPopover`: Displays in-app notifications
  - `NotificationsList`: List of all user notifications
  - `NotificationBadge`: Shows unread notification count

- **Authentication**
  - `LoginForm`: User login interface
  - `RegisterForm`: New user registration
  - `AuthGuard`: Protected route wrapper

#### State Management
- React Query for server state management
- Custom hooks for local state
- TypeScript interfaces for type safety

### Backend Architecture

#### Core Modules
- **Authentication**: JWT-based user authentication
- **Habit Management**: CRUD operations and progress tracking
- **Notification System**: In-app and email notifications

#### Data Models
- **User**: Authentication and profile data
- **Habit**: Habit tracking and progress data
- **Notification**: System and custom notifications

### Technologies Used
- **Frontend**: 
  - React 18 with TypeScript
  - Material-UI for components
  - React Query for state management
  - Axios for API requests
  - Date-fns for date handling

- **Backend**: 
  - Node.js with Express
  - TypeScript for type safety
  - MongoDB with Mongoose
  - JWT for authentication
  - Nodemailer for emails

- **Development Tools**:
  - ESLint for code quality
  - Prettier for code formatting
  - ts-node-dev for development
  - Jest for testing

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Habits
- GET /api/habits - Get user's habits
- POST /api/habits - Create new habit
- PUT /api/habits/:id - Update habit
- DELETE /api/habits/:id - Delete habit
- POST /api/habits/:id/complete - Mark habit as complete

### Notifications
- GET /api/notifications - Get user's notifications
- PUT /api/notifications/:id/read - Mark notification as read
- DELETE /api/notifications/:id - Delete notification