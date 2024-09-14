const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
    
router.post('/users', userController.saveUserToDB);
router.put('/coins', userController.updateUserCoins);
router.post('/items', userController.addItemToUser);

module.exports = router;
