# MuSync Rehearsal Planner

A comprehensive web application designed for bands and music groups to efficiently organize rehearsals, track attendance, send reminders, and suggest optimal rehearsal times based on member availability.

## 🎵 Features

### User Management
- Secure authentication system
- Role-based access control (Admin, Band Leader, Member)
- Personalized profiles with instrument specification

### Rehearsal Management
- Create, edit, and delete rehearsal events
- Set recurring rehearsal schedules
- Location and time slot management
- Detailed notes and requirements for each session

### Availability Tracking
- RSVP functionality for all band members
- Absence management for planned time off
- Visual calendar showing availability across the band

### Smart Scheduling
- Algorithm to suggest optimal rehearsal times
- Conflict detection and resolution
- Priority settings for essential band members

### Notifications
- Automated email and in-app reminders
- Schedule change alerts
- Attendance confirmation prompts

### Setlist Integration
- Link rehearsals to specific setlists
- Track practice progress on individual songs
- Share song details with all members

### Mobile Responsiveness
- Fully functional on smartphones and tablets
- Simplified interface for on-the-go updates

### Analytics
- Attendance history and patterns
- Rehearsal frequency metrics
- Song practice coverage

## 🚀 Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI components
- Redux for state management
- FullCalendar.js for interactive scheduling
- Socket.io for real-time updates

### Backend
- Node.js with Express.js
- RESTful API architecture
- JWT authentication
- bcrypt for password hashing

### Database
- PostgreSQL for relational data
- Redis for caching
- Sequelize ORM

### DevOps
- Docker containerization
- AWS deployment (EC2, RDS)
- GitHub Actions for CI/CD
- Sentry for error tracking

## 📋 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Redis (optional, for caching)

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/musync-rehearsal-planner.git
cd musync-rehearsal-planner
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Configure environment variables
```bash
# In the server directory, create a .env file
cp .env.example .env
# Edit the .env file with your database credentials and JWT secret
```

4. Initialize the database
```bash
cd server
npm run db:migrate
npm run db:seed  # Optional: adds sample data
```

5. Start the development servers
```bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd client
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## 🐳 Docker Deployment

We provide Docker configuration for easy deployment:

```bash
# Build and start all services
docker-compose up -d

# To stop all services
docker-compose down
```

## 📖 API Documentation

API documentation is available at `/api/docs` when running the development server, or in the [API.md](./docs/API.md) file.

## 🤝 Contributing

Contributions are welcome! Please check out our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Project Roadmap](./docs/ROADMAP.md)
- [System Architecture](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE.md)

## 📞 Support

If you encounter any issues or have questions, please file an issue on our [GitHub Issues page](https://github.com/dxaginfo/musync-rehearsal-planner/issues).