require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const routes = require('./routes');
const { sequelize } = require('./models');

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_band', (bandId) => {
    socket.join(`band_${bandId}`);
    console.log(`User ${socket.id} joined band ${bandId}`);
  });
  
  socket.on('leave_band', (bandId) => {
    socket.leave(`band_${bandId}`);
    console.log(`User ${socket.id} left band ${bandId}`);
  });
  
  socket.on('rehearsal_update', (data) => {
    io.to(`band_${data.bandId}`).emit('rehearsal_changed', data);
  });
  
  socket.on('attendance_update', (data) => {
    io.to(`band_${data.bandId}`).emit('attendance_changed', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// API routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

module.exports = { app, httpServer };