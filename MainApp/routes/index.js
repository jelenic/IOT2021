const express = require('express');
const userRoutes = require('./auth');
const router = express.Router();

router.use('/auth', userRoutes);

module.exports = router;