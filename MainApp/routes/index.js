const express = require('express');
const userRoutes = require('./auth');
const sensorRoutes = require('./sensor');
const getDataRoutes = require('./getData');
const router = express.Router();

router.use('/auth', userRoutes);
router.use('/sensor', sensorRoutes);
router.use('/getData', getDataRoutes);

module.exports = router;