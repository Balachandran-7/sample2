const express = require('express');
const router = express.Router();
const {
    getBuses,
    getBus,
    createBus,
    updateBus,
    deleteBus,
    updateBusLocation
} = require('../controllers/busController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getBuses)
    .post(protect, authorize('admin', 'manager'), createBus);

router.route('/:id')
    .get(protect, getBus)
    .put(protect, authorize('admin', 'manager'), updateBus)
    .delete(protect, authorize('admin', 'manager'), deleteBus);

router.put('/:id/location', protect, authorize('driver', 'admin'), updateBusLocation);

module.exports = router;
