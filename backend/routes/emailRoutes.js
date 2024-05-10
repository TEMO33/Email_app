const express = require('express');
const { createEmail, getEmailsByCategory, getEmailById, updateEmail, deleteEmail } = require('../controllers/emailController');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, asyncHandler(createEmail));
router.get('/c/:emailCategory', protect, asyncHandler(getEmailsByCategory));
router.get('/:emailId', protect, asyncHandler(getEmailById));
router.patch('/:emailId', protect, asyncHandler(updateEmail));
router.delete('/:emailId', protect, asyncHandler(deleteEmail));

module.exports = router;
