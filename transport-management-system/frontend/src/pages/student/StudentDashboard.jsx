import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import MapComponent from '../../components/MapComponent';
import { FaMapMarkerAlt, FaBus, FaIdCard, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import RequestModal from '../../components/RequestModal';

const StudentDashboard = () => {
    const [buses, setBuses] = useState([]);
    const { user } = useAuth();
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const { data } = await api.get('/buses');
                setBuses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBuses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar role={user.role === 'parent' ? 'Parent' : 'Student'} />
            <div className="container mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Live Transport Tracking
                    </h1>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full mt-2 md:mt-0">
                        Live Updates Active
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Map Section */}
                    <div className="lg:col-span-2 bg-white p-2 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" /> Real-time Bus Map
                            </h2>
                        </div>
                        <div className="h-[500px] w-full relative z-0">
                            <MapComponent buses={buses} />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-6">
                        {/* Student Profile Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaUser className="text-blue-600 text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 flex items-center gap-2"><FaIdCard /> Student ID</span>
                                    <span className="font-semibold text-gray-800">{user.studentId || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600 flex items-center gap-2"><FaBus /> Assigned Bus</span>
                                    <span className="font-semibold text-gray-800">Waitlist</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                            <h2 className="text-xl font-bold mb-4">Transport Status</h2>
                            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm mb-4">
                                <p className="text-sm opacity-80">Current Status</p>
                                <p className="text-xl font-bold">No active trip</p>
                            </div>
                            <button
                                onClick={() => setIsRequestModalOpen(true)}
                                className="w-full bg-white text-purple-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition shadow-md"
                            >
                                I'm Here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <RequestModal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} />
        </div>
    );
};

export default StudentDashboard;
