import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ medicalRecordId: '', medicationName: '', dosage: '', frequency: '', duration: '', instructions: '' });

  const fetchPrescriptions = async () => {
    try {
      const res = await api.get('/prescriptions');
      if (res.data.success) setPrescriptions(res.data.data);
    } catch (err) {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPrescriptions(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/prescriptions', formData);
      if (res.data.success) {
        toast.success('Prescription created');
        setShowForm(false);
        setFormData({ medicalRecordId: '', medicationName: '', dosage: '', frequency: '', duration: '', instructions: '' });
        fetchPrescriptions();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Resep Obat</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Tambah Resep
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Form Resep</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-600 mb-1">Medical Record ID</label>
              <input type="number" required value={formData.medicalRecordId}
                onChange={(e) => setFormData({...formData, medicalRecordId: e.target.value})} className="w-full border rounded px-3 py-2" /></div>
            <div><label className="block text-sm text-gray-600 mb-1">Nama Obat</label>
              <input required value={formData.medicationName}
                onChange={(e) => setFormData({...formData, medicationName: e.target.value})} className="w-full border rounded px-3 py-2" /></div>
            <div><label className="block text-sm text-gray-600 mb-1">Dosis</label>
              <input required value={formData.dosage}
                onChange={(e) => setFormData({...formData, dosage: e.target.value})} className="w-full border rounded px-3 py-2" /></div>
            <div><label className="block text-sm text-gray-600 mb-1">Frekuensi</label>
              <input required value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})} className="w-full border rounded px-3 py-2" /></div>
            <div><label className="block text-sm text-gray-600 mb-1">Durasi</label>
              <input required value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full border rounded px-3 py-2" /></div>
            <div><label className="block text-sm text-gray-600 mb-1">Instruksi</label>
              <input required value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})} className="w-full border rounded px-3 py-2" /></div>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Simpan</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Batal</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm">No</th>
                <th className="px-4 py-3 text-left text-sm">Nama Obat</th>
                <th className="px-4 py-3 text-left text-sm">Dosis</th>
                <th className="px-4 py-3 text-left text-sm">Frekuensi</th>
                <th className="px-4 py-3 text-left text-sm">Durasi</th>
                <th className="px-4 py-3 text-left text-sm">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(prescriptions) ? prescriptions : []).map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3">{p.medicationName}</td>
                  <td className="px-4 py-3">{p.dosage}</td>
                  <td className="px-4 py-3">{p.frequency}</td>
                  <td className="px-4 py-3">{p.duration}</td>
                  <td className="px-4 py-3">{p.createdAt?.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
