const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: ['new_route', 'change_route', 'apply_pass', 'cancellation', 'complaint', 'other'],
            required: true
        },
        message: {
            type: String,
            required: [true, 'Please add a message or reason'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        adminComments: {
            type: String
        },
        // New fields for Bus Application
        rollNumber: { type: String },
        department: { type: String },
        year: { type: String },
        bus: { type: String },
        route: { type: String },
        name: { type: String }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Request', requestSchema);
