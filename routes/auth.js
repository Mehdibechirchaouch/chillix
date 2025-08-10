const express = require('express');
const router = express.Router();
const { login, signup ,getAllUsers,getUserById,updateUser,deleteUser} = require('../controllers/authController');

router.post('/login', login);
router.post('/signup', signup);

// Get all users (admin only)
router.get('/',getAllUsers);

// Get user by ID (admin only)
router.get('/:id',getUserById);

// Update user by ID (admin only)
router.put('/:id',updateUser);

// Delete user by ID (admin only)
router.delete('/:id', deleteUser);


module.exports = router;
