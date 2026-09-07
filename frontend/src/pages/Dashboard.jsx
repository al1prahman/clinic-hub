import React from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = React.useState(null);

  const fetchStats = async () => {
    try {
      const res = await api.get('/dashboard/stats');
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch stats');
    }
  };

  React.useEffect(() => { fetchStats(); }, []);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.full_name || user?.username}</p>
          <p className="text-sm text-gray-500">Role: {user?.role}</p>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {!stats ? (
        <div className="text-center py-10 text-gray-500">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Pasien</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalPatients || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Pasien Hari Ini</p>
            <p className="text-2xl font-bold text-green-600">{stats.totalPatientsToday || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Antrean Hari Ini</p>
            <p className="text-2xl font-bold text-orange-600">{stats.totalQueuesToday || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Pasien Selesai</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalServedToday || 0}</p>
          </div>
        </div>
      )}
    </div>
  );
}
