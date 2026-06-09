const Bus = require('../models/busModel');

// @desc    Get all buses
// @route   GET /api/buses
// @access  Private
const getBuses = async (req, res) => {
    try {
        const buses = await Bus.find().populate('driver', 'name').populate('route', 'routeName');
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single bus
// @route   GET /api/buses/:id
// @access  Private
const getBus = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id).populate('driver', 'name').populate('route', 'routeName');
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new bus
// @route   POST /api/buses
// @access  Private/Admin/Manager
const createBus = async (req, res) => {
    try {
        const { busNumber, capacity, model, driver, route } = req.body;
        const bus = await Bus.create({
            busNumber,
            capacity,
            model,
            driver,
            route,
        });
        res.status(201).json(bus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update bus
// @route   PUT /api/buses/:id
// @access  Private/Admin/Manager
const updateBus = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedBus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete bus
// @route   DELETE /api/buses/:id
// @access  Private/Admin/Manager
const deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        await bus.remove();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update bus location
// @route   PUT /api/buses/:id/location
// @access  Private/Driver
const updateBusLocation = async (req, res) => {
    try {
        const { lat, lng } = req.body;
        const bus = await Bus.findById(req.params.id);

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        bus.currentLocation = {
            lat,
            lng,
            lastUpdated: Date.now()
        };

        await bus.save();
        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getBuses,
    getBus,
    createBus,
    updateBus,
    deleteBus,
    updateBusLocation
};
