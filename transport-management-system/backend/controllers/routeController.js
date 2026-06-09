const Route = require('../models/routeModel');

// @desc    Get all routes
// @route   GET /api/routes
// @access  Private
const getRoutes = async (req, res) => {
    try {
        const routes = await Route.find().populate('buses', 'busNumber');
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single route
// @route   GET /api/routes/:id
// @access  Private
const getRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id).populate('buses', 'busNumber');
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new route
// @route   POST /api/routes
// @access  Private/Admin/Manager
const createRoute = async (req, res) => {
    try {
        const { routeName, startPoint, endPoint, stops, distance, estimatedTime } = req.body;
        const route = await Route.create({
            routeName,
            startPoint,
            endPoint,
            stops,
            distance,
            estimatedTime
        });
        res.status(201).json(route);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update route
// @route   PUT /api/routes/:id
// @access  Private/Admin/Manager
const updateRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete route
// @route   DELETE /api/routes/:id
// @access  Private/Admin/Manager
const deleteRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        await route.remove();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getRoutes,
    getRoute,
    createRoute,
    updateRoute,
    deleteRoute
};
