const express = require('express');
const { registration, login, status, logout } = require('../controllers/userController');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.post('/registration', asyncHandler(registration));
router.post('/login', asyncHandler(login));
router.get('/status', asyncHandler(status));
router.delete('/logout', asyncHandler(logout));

module.exports = router;
