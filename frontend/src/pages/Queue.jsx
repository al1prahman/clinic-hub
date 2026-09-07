import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Queue() {
  const { user } = useAuth();
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchQueues = async () => {
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const res = await api.get(`/queues${params}`);
      if (res.data.success) setQueues(res.data.data);
    } catch (err) {
      toast.error('Failed to load queues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQueues(); }, [statusFilter]);

  const callQueue = async (id) => {
    try {
      await api.put(`/queues/${id}/call`);
      toast.success('Queue called!');
      fetchQueues();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/queues/${id}/status`, { status });
      toast.success('Status updated');
      fetchQueues();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Antrian Hari Ini</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Semua Status</option>
          <option value="menunggu">Menunggu</option>
          <option value="check_in">Check In</option>
          <option value="pemeriksaan">Pemeriksaan</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>

      <div className="grid gap-4">
        {queues.map((q) => (
          <div key={q.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-blue-600 w-16">{q.queueNumber}</div>
              <div>
                <div className="font-semibold">{q.patient?.name || 'N/A'}</div>
                <div className="text-sm text-gray-500">Poli: {q.doctor?.polyclinic?.name || 'N/A'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded text-sm ${
                q.status === 'menunggu' ? 'bg-gray-100 text-gray-700' :
                q.status === 'check_in' ? 'bg-blue-100 text-blue-700' :
                q.status === 'pemeriksaan' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {q.status === 'menunggu' ? '⏳ Menunggu' :
                 q.status === 'check_in' ? '✅ Check In' :
                 q.status === 'pemeriksaan' ? '🩺 Pemeriksaan' :
                 '✔️ Selesai'}
              </span>
              {q.status === 'menunggu' && (
                <button
                  onClick={() => callQueue(q.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Panggil
                </button>
              )}
              {q.status === 'check_in' && (
                <button
                  onClick={() => updateStatus(q.id, 'pemeriksaan')}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  Periksa
                </button>
              )}
              {q.status === 'pemeriksaan' && (
                <button
                  onClick={() => updateStatus(q.id, 'selesai')}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Selesai
                </button>
              )}
            </div>
          </div>
        ))}
        {queues.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Belum ada antrian hari ini
          </div>
        )}
      </div>
    </div>
  );
}
