const mongoose = require('mongoose');

const stopSchema = mongoose.Schema({
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    arrivalTime: { type: String }, // Estimated arrival time e.g., "08:30 AM"
});

const routeSchema = mongoose.Schema(
    {
        routeName: {
            type: String,
            required: [true, 'Please add a route name'],
            unique: true,
        },
        startPoint: {
            name: String,
            lat: Number,
            lng: Number,
        },
        endPoint: {
            name: String,
            lat: Number,
            lng: Number,
        },
        stops: [stopSchema],
        distance: {
            type: Number, // in km
        },
        estimatedTime: {
            type: Number, // in minutes
        },
        buses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bus',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Route', routeSchema);
