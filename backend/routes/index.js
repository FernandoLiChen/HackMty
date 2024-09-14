const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoute');

router.use('/userRoute', userRoutes);

module.exports = router;