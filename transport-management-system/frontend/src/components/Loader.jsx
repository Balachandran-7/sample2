import { useEffect, useState } from 'react';

const Loader = ({ loading }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => setShow(false), 500); // Smooth transition
        } else {
            setShow(true);
        }
    }, [loading]);

    if (!show) return null;

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-pulse flex flex-col items-center">
                {/* Kongu Arts and Science College Logo Placeholder - Replace src with actual URL if available */}
                <div className="w-32 h-32 mb-4 relative">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/23/Kongu_Arts_and_Science_College_logo.png"
                        alt="Kongu Arts and Science College Logo"
                        className="w-full h-full object-contain drop-shadow-lg"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150?text=KASC";
                        }}
                    />
                    <div className="absolute inset-0 rounded-full border-4 border-t-yellow-400 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
                </div>
                <h2 className="text-2xl font-bold text-blue-900 tracking-wider">KONGU ARTS AND SCIENCE COLLEGE</h2>
                <p className="text-gray-500 mt-2 text-sm italic">Transport Management System</p>
            </div>
        </div>
    );
};

export default Loader;
