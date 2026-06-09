const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUsersByRole,
    deleteUser,
    updateUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getUsers);

router.route('/role/:role')
    .get(protect, authorize('admin', 'manager'), getUsersByRole);

router.route('/:id')
    .delete(protect, authorize('admin'), deleteUser)
    .put(protect, authorize('admin'), updateUser);

module.exports = router;
