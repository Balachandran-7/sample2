import { useState } from 'react';
import api from '../utils/api';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const RequestModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        type: 'change_route',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/requests', formData);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFormData({ type: 'change_route', message: '' });
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-fadeIn">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <FaPaperPlane /> Submit Request
                    </h3>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="text-green-500 text-5xl mb-4 flex justify-center">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">Request Sent!</h4>
                            <p className="text-gray-500 mt-2">We will review your request shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Request Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                >
                                    <option value="change_route">Route Change</option>
                                    <option value="apply_pass">Apply for Bus Pass</option>
                                    <option value="cancellation">Cancel Transport</option>
                                    <option value="complaint">Complaint/Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {formData.type === 'apply_pass' && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                                placeholder="Full Name"
                                                value={formData.name || ''}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Roll Number</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                                placeholder="Roll No"
                                                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                                placeholder="Dept (e.g. BCA)"
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                                            <select
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            >
                                                <option value="">Select Year</option>
                                                <option value="I">I Year</option>
                                                <option value="II">II Year</option>
                                                <option value="III">III Year</option>
                                                <option value="IV">IV Year</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Bus Route</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                                            placeholder="Preferred Route / Bus"
                                            onChange={(e) => setFormData({ ...formData, route: e.target.value, bus: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Message / Details</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition h-24 resize-none"
                                    placeholder={formData.type === 'apply_pass' ? "Any additional details..." : "Please provide specific details..."}
                                    required={formData.type !== 'apply_pass'}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}`}
                            >
                                {loading ? 'Submitting...' : (formData.type === 'apply_pass' ? 'Apply Now' : 'Send Request')}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestModal;
