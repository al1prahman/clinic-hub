import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get('/registrations');
      if (res.data.success) setRegistrations(res.data.data.registrations || res.data.data || []);
    } catch (err) {
      toast.error('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRegistrations(); }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Registrasi Pasien</h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Pasien</th>
                <th className="px-4 py-3 text-left text-sm">Dokter</th>
                <th className="px-4 py-3 text-left text-sm">Poli</th>
                <th className="px-4 py-3 text-left text-sm">Tanggal</th>
                <th className="px-4 py-3 text-left text-sm">Pembayaran</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(registrations) ? registrations : []).map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{r.patient?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{r.doctor?.licenseNumber || 'N/A'}</td>
                  <td className="px-4 py-3">{r.polyclinic?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{r.visitDate ? r.visitDate.split('T')[0] : 'N/A'}</td>
                  <td className="px-4 py-3">{r.paymentType}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      r.status === 'selesai' ? 'bg-green-100 text-green-800' :
                      r.status === 'pemeriksaan' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
