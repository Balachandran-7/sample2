import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaBus } from 'react-icons/fa';

const Navbar = ({ role }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/dashboard" className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 tracking-tight hover:opacity-80 transition">
                    <FaBus className="text-3xl" />
                    <span>KASC<span className="text-gray-800">Transport</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-sm font-bold text-gray-800">{user?.name}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{role}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                    >
                        <FaSignOutAlt />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
