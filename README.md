# MuSync Rehearsal Planner

A comprehensive web application designed to help bands and music groups efficiently organize their rehearsal schedules, track member attendance, and optimize rehearsal time.

## 🎵 Features

- **User Authentication** - Secure login and registration system with role-based access control
- **Band Management** - Create and manage multiple bands with different member roles
- **Rehearsal Scheduling** - Create single or recurring rehearsal events with location and time details
- **Smart Scheduling** - Get suggestions for optimal rehearsal times based on member availability
- **Attendance Tracking** - Members can RSVP and provide reasons for absence
- **Real-time Updates** - Instant notifications for schedule changes and member availability
- **Setlist Integration** - Attach songs and setlists to rehearsals for focused practice
- **Analytics** - Track attendance patterns and rehearsal productivity

## 🚀 Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI for responsive design
- Redux with Redux Toolkit for state management
- FullCalendar.js for scheduling interface
- Socket.io client for real-time updates

### Backend
- Node.js & Express.js
- JWT authentication
- PostgreSQL database with Sequelize ORM
- Redis for caching and session management
- Socket.io for WebSockets

### DevOps
- Docker & Docker Compose
- AWS deployment ready (EC2, RDS, S3)

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL
- Redis
- Docker (optional)

## ⚙️ Installation & Setup

### Using Docker (Recommended)

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/musync-rehearsal-planner.git
   cd musync-rehearsal-planner
   ```

2. Create a `.env` file in the root directory with the necessary environment variables (see `.env.example`)

3. Start the application using Docker Compose
   ```bash
   docker-compose up -d
   ```

4. Access the application at http://localhost:3000

### Manual Setup

#### Backend

1. Navigate to the server directory
   ```bash
   cd server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the necessary environment variables (see `.env.example`)

4. Run database migrations
   ```bash
   npm run db:migrate
   ```

5. Start the server
   ```bash
   npm run dev
   ```

#### Frontend

1. Open a new terminal and navigate to the client directory
   ```bash
   cd client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the React application
   ```bash
   npm start
   ```

4. Access the application at http://localhost:3000

## 📱 Mobile Responsiveness

The application is designed to be fully responsive, providing an optimal experience on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security

- JWT-based authentication with refresh tokens
- Secure password hashing with bcrypt
- Input validation on all API endpoints
- Protection against common web vulnerabilities

## 🧪 Testing

Run tests using the following commands:

```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

## 📄 API Documentation

API documentation is available at `/api-docs` when the server is running.

## 🛣️ Roadmap

- Mobile applications (iOS/Android)
- Integration with music streaming services
- Audio recording capabilities for rehearsals
- Virtual rehearsal rooms for remote collaboration
- AI-powered practice recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## 🔗 Project Links

- **Project Plan Document**: [Google Docs](https://docs.google.com/document/d/1BYX_ZtNfJIdoIkRhTdw79P06OB8JisClcC-Lh3CfZog)
- **Development Tracking Sheet**: [Google Sheets](https://docs.google.com/spreadsheets/d/1BrxFlkpXL7LjWAnPalZiULkxhOk5EzsIfHxvwh0rOgU)