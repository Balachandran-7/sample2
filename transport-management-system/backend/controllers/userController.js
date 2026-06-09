const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get users by role
// @route   GET /api/users/role/:role
// @access  Private/Admin/Manager
const getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile (admin can update anyone)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        user.profileImage = req.body.profileImage || user.profileImage;
        // Update specific fields based on role if needed
        if (req.body.licenseNumber) user.licenseNumber = req.body.licenseNumber;
        if (req.body.studentId) user.studentId = req.body.studentId;
        if (req.body.routeId) user.routeId = req.body.routeId;
        if (req.body.stopId) user.stopId = req.body.stopId;


        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUsersByRole,
    deleteUser,
    updateUser,
};
