const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');
const usersController = require('../controllers/users.controller');

router.post('/register', imageUpload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.get('/user', usersController.infoUser);
router.delete('/logout', authMiddleware, authController.logout);

module.exports = router;
