import { useAuth } from '../context/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import StudentDashboard from './student/StudentDashboard';
// import DriverDashboard from './driver/DriverDashboard';
// import ManagerDashboard from './manager/ManagerDashboard';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>;

    switch (user.role) {
        case 'admin':
            return <AdminDashboard />;
        case 'student':
        case 'parent':
            return <StudentDashboard />;
        // case 'driver':
        //   return <DriverDashboard />;
        // case 'manager':
        //   return <ManagerDashboard />;
        default:
            return <div className="p-4">Unknown Role: {user.role}</div>;
    }
};

export default Dashboard;
