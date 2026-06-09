const Request = require('../models/requestModel');

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private/Admin/Manager
const getRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('student', 'name email studentId');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get requests by student
// @route   GET /api/requests/myrequests
// @access  Private/Student
const getMyRequests = async (req, res) => {
    try {
        const requests = await Request.find({ student: req.user.id });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new request
// @route   POST /api/requests
// @access  Private/Student
const createRequest = async (req, res) => {
    try {
        const { type, message, rollNumber, department, year, bus, route, name } = req.body;
        const request = await Request.create({
            student: req.user.id,
            type,
            message,
            rollNumber,
            department,
            year,
            bus,
            route,
            name
        });
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private/Admin/Manager
const updateRequestStatus = async (req, res) => {
    try {
        const { status, adminComments } = req.body;
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.status = status || request.status;
        request.adminComments = adminComments || request.adminComments;

        const updatedRequest = await request.save();
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getRequests,
    getMyRequests,
    createRequest,
    updateRequestStatus
};
