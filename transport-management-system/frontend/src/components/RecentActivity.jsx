import { FaHistory, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const RecentActivity = () => {
    // Placeholder data - in a real app, this would come from an API
    const activities = [
        { id: 1, text: 'New route "Route 5 - Salam" added', time: '2 mins ago', type: 'success' },
        { id: 2, text: 'Bus TN-38-N-1234 reported breakdown', time: '1 hour ago', type: 'error' },
        { id: 3, text: 'Student registration approved: John Doe', time: '3 hours ago', type: 'success' },
        { id: 4, text: 'Driver "Ramesh" updated profile', time: '5 hours ago', type: 'info' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                <FaHistory className="text-blue-500" /> Recent Activity
            </h3>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                        <div className="mt-1">
                            {activity.type === 'success' && <FaCheckCircle className="text-green-500" />}
                            {activity.type === 'error' && <FaExclamationCircle className="text-red-500" />}
                            {activity.type === 'info' && <FaHistory className="text-blue-400" />}
                        </div>
                        <div>
                            <p className="text-gray-800 text-sm font-medium">{activity.text}</p>
                            <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
