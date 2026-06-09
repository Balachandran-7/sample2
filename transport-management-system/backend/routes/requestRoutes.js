const express = require('express');
const router = express.Router();
const {
    getRequests,
    getMyRequests,
    createRequest,
    updateRequestStatus
} = require('../controllers/requestController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getRequests)
    .post(protect, authorize('student', 'parent'), createRequest);

router.get('/myrequests', protect, getMyRequests);

router.put('/:id', protect, authorize('admin', 'manager'), updateRequestStatus);

module.exports = router;
