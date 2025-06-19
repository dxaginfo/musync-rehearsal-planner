const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const bandRoutes = require('./band.routes');
const rehearsalRoutes = require('./rehearsal.routes');
const attendanceRoutes = require('./attendance.routes');
const songRoutes = require('./song.routes');

// Define API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/bands', bandRoutes);
router.use('/rehearsals', rehearsalRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/songs', songRoutes);

// API health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is up and running',
    timestamp: new Date().toISOString()
  });
});

// API documentation redirect
router.get('/docs', (req, res) => {
  res.redirect('/api-docs');
});

module.exports = router;