const mongoose = require('mongoose');

const busSchema = mongoose.Schema(
    {
        busNumber: {
            type: String,
            required: [true, 'Please add a bus number'],
            unique: true,
        },
        capacity: {
            type: Number,
            required: [true, 'Please add bus capacity'],
        },
        model: {
            type: String,
            required: [true, 'Please add bus model'],
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // specific to drivers
        },
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Route',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'maintenance'],
            default: 'active',
        },
        currentLocation: {
            lat: Number,
            lng: Number,
            lastUpdated: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Bus', busSchema);
