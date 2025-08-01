const express = require('express');
const router = express.Router();
const { approveUser, listSubAdmins } = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.put('/approve/:id', authenticate, isAdmin, approveUser);
router.get('/sub-admins', authenticate, isAdmin, listSubAdmins);

module.exports = router;
