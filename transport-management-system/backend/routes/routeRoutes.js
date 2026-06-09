const express = require('express');
const router = express.Router();
const {
    getRoutes,
    getRoute,
    createRoute,
    updateRoute,
    deleteRoute
} = require('../controllers/routeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getRoutes)
    .post(protect, authorize('admin', 'manager'), createRoute);

router.route('/:id')
    .get(protect, getRoute)
    .put(protect, authorize('admin', 'manager'), updateRoute)
    .delete(protect, authorize('admin', 'manager'), deleteRoute);

module.exports = router;
