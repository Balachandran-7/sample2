import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import { FaBus, FaRoute, FaUsers, FaUserTie } from 'react-icons/fa';
import AnalyticsCharts from '../../components/AnalyticsCharts';
import RecentActivity from '../../components/RecentActivity';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        buses: 0,
        students: 0,
        drivers: 0,
        routes: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const busesRes = await api.get('/buses');
                const routesRes = await api.get('/routes');
                const usersRes = await api.get('/users');

                const students = usersRes.data.filter(u => u.role === 'student').length;
                const drivers = usersRes.data.filter(u => u.role === 'driver').length;

                setStats({
                    buses: busesRes.data.length,
                    routes: routesRes.data.length,
                    students,
                    drivers
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Buses', count: stats.buses, icon: <FaBus />, color: 'bg-blue-500' },
        { title: 'Active Routes', count: stats.routes, icon: <FaRoute />, color: 'bg-green-500' },
        { title: 'Students', count: stats.students, icon: <FaUsers />, color: 'bg-purple-500' },
        { title: 'Drivers', count: stats.drivers, icon: <FaUserTie />, color: 'bg-yellow-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Navbar role="Admin" />
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Administrator Overview</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {cards.map((card, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex items-center transform transition duration-300 hover:scale-105">
                            <div className={`p-4 rounded-full text-white text-2xl mr-4 ${card.color} shadow-md`}>
                                {card.icon}
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{card.title}</h3>
                                <p className="text-3xl font-bold text-gray-800">{card.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Analytics & Activity Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
                    <div className="xl:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">System Analytics</h2>
                        <AnalyticsCharts stats={stats} />
                    </div>
                    <div>
                        <RecentActivity />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Quick Management</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                            Manage Buses
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                            Manage Routes
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                            Manage Users
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                            Transport Requests
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
