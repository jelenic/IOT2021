const express = require('express');
const userRoutes = require('./auth');
const sensorRoutes = require('./sensor');
const router = express.Router();

router.use('/auth', userRoutes);
router.use('/sensor', sensorRoutes);

module.exports = router;