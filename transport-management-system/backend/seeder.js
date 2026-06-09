const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Bus = require('./models/busModel');
const Route = require('./models/routeModel');
const Request = require('./models/requestModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const routeData = [
    { name: 'Erode - College', buses: 20, startLat: 11.3410, startLng: 77.7172 },
    { name: 'Sathyamangalam-College', buses: 2, startLat: 11.5034, startLng: 77.2444 },
    { name: 'Gobi - College', buses: 6, startLat: 11.4546, startLng: 77.4373 },
    { name: 'Athani- College', buses: 2, startLat: 11.5300, startLng: 77.5000 }, // Approx
    { name: 'Anthiyur- College', buses: 2, startLat: 11.5786, startLng: 77.5878 },
    { name: 'Komarapalayam- College', buses: 2, startLat: 11.4447, startLng: 77.7289 },
    { name: 'Bhavani - College', buses: 2, startLat: 11.4478, startLng: 77.6897 },
    { name: 'Ammapettai - College', buses: 1, startLat: 11.6000, startLng: 77.7000 }, // Approx
    { name: 'Edapadi- College', buses: 1, startLat: 11.5833, startLng: 77.8500 },
    { name: 'Sankagiri- College', buses: 2, startLat: 11.4770, startLng: 77.8732 },
    { name: 'Tiruchengode- College', buses: 3, startLat: 11.3768, startLng: 77.8973 },
    { name: 'SPB Colony - College', buses: 2, startLat: 11.3300, startLng: 77.7500 }, // Approx near Erode
    { name: 'Kodumudi- College', buses: 1, startLat: 11.0833, startLng: 77.8833 },
    { name: 'Vellakovil- College', buses: 1, startLat: 10.9388, startLng: 77.7118 },
    { name: 'Kangeyam- College', buses: 3, startLat: 11.0044, startLng: 77.5623 },
    { name: 'Palladam- College', buses: 1, startLat: 10.9997, startLng: 77.2882 },
    { name: 'Tiruppur - College', buses: 13, startLat: 11.1085, startLng: 77.3411 },
    { name: 'Avinashi- College', buses: 1, startLat: 11.1925, startLng: 77.2687 },
    { name: 'Nambiyur- College', buses: 1, startLat: 11.3667, startLng: 77.3167 },
    { name: 'Appakoodal -College', buses: 1, startLat: 11.5500, startLng: 77.6000 },
    { name: 'Chennimalai- College', buses: 2, startLat: 11.1667, startLng: 77.6167 },
    { name: 'Sivagiri - College', buses: 2, startLat: 9.3375, startLng: 77.4311 }, // Caution: There are multiple Sivagiris
    { name: 'Nathakadiyur- College', buses: 1, startLat: 11.0500, startLng: 77.6500 }, // Approx
    { name: 'Thandapalayam- College', buses: 1, startLat: 11.3000, startLng: 77.5000 }, // Approx
    { name: 'Getticheviyur- College', buses: 1, startLat: 11.4000, startLng: 77.4000 }, // Approx
    { name: 'Perundurai Bus Stand - College', buses: 7, startLat: 11.2750, startLng: 77.5800 }
];

const COLLEGE_LOC = { name: 'KASC College', lat: 11.2740, lng: 77.6070 };

const importData = async () => {
    try {
        await User.deleteMany();
        await Bus.deleteMany();
        await Route.deleteMany();
        await Request.deleteMany();

        console.log('Old Data Cleared...'.cyan);

        // 1. Create Users (Admin, Manager, Drivers, Students)
        const salt = await bcrypt.genSalt(10);
        const hashedAdminPassword = await bcrypt.hash('admin123', salt);
        const hashedDriverPassword = await bcrypt.hash('driver123', salt);
        const hashedStudentPassword = await bcrypt.hash('student123', salt);

        const users = [
            { name: 'Admin User', email: 'admin@kasc.ac.in', password: hashedAdminPassword, role: 'admin' },
            { name: 'Transport Manager', email: 'manager@kasc.ac.in', password: hashedAdminPassword, role: 'manager' },
            { name: 'Student One', email: 'student1@kasc.ac.in', password: hashedStudentPassword, role: 'student', studentId: '23BCA001' },
            { name: 'Student Two', email: 'student2@kasc.ac.in', password: hashedStudentPassword, role: 'student', studentId: '23BSC002' }
        ];

        // Create drivers dynamically later, but we need some initial users
        const createdUsers = await User.insertMany(users);
        console.log(`Created ${createdUsers.length} base users`.green);

        // 2. Create Routes & Buses
        let busCountTotal = 0;
        let routeDocs = [];

        for (const data of routeData) {
            // Create Route
            const route = await Route.create({
                routeName: data.name,
                startPoint: { name: data.name.split('-')[0].trim(), lat: data.startLat, lng: data.startLng },
                endPoint: COLLEGE_LOC,
                distance: Math.floor(Math.random() * 30) + 10, // Approx distance
                estimatedTime: Math.floor(Math.random() * 40) + 20,
                stops: [
                    { name: 'Stop 1', lat: data.startLat + 0.01, lng: data.startLng + 0.01, arrivalTime: '07:30 AM' },
                    { name: 'Stop 2', lat: data.startLat + 0.02, lng: data.startLng + 0.02, arrivalTime: '07:45 AM' }
                ]
            });
            routeDocs.push(route);

            // Create Buses and Drivers for this route
            for (let i = 1; i <= data.buses; i++) {
                // Create a driver for this bus
                const driverName = `Driver ${data.name.split('-')[0].trim()} ${i}`;
                const driverEmail = `driver.${busCountTotal + 1}@kasc.ac.in`;

                const driver = await User.create({
                    name: driverName,
                    email: driverEmail,
                    password: hashedDriverPassword,
                    role: 'driver',
                    licenseNumber: `TN${38 + i}DL${2000 + busCountTotal}`
                });

                // Create Bus
                const busNumber = `TN-${30 + (busCountTotal % 50)}-CS-${1000 + busCountTotal}`;
                await Bus.create({
                    busNumber: busNumber,
                    capacity: 50,
                    model: 'Ashok Leyland',
                    driver: driver._id,
                    route: route._id,
                    currentLocation: { lat: data.startLat, lng: data.startLng },
                    status: 'active'
                });

                busCountTotal++;
            }
        }

        console.log(`Imported ${routeDocs.length} Routes and ${busCountTotal} Buses!`.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Bus.deleteMany();
        await Route.deleteMany();
        await Request.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
