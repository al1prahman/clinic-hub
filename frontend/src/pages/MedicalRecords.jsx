import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function MedicalRecords() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    registrationId: '',
    complaint: '',
    bloodPressure: '',
    temperature: '',
    weight: '',
    height: '',
    diagnosis: '',
    therapyPlan: ''
  });

  const fetchRecords = async (patientId) => {
    try {
      const res = await api.get(`/medical-records/${patientId || '0'}`);
      if (res.data.success) setRecords(res.data.data);
    } catch (err) {
      toast.error('Failed to load records');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/medical-records', formData);
      if (res.data.success) {
        toast.success('Medical record created');
        setShowForm(false);
        setFormData({ registrationId: '', complaint: '', bloodPressure: '', temperature: '', weight: '', height: '', diagnosis: '', therapyPlan: '' });
        fetchRecords(selectedPatient);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Rekam Medis (SOAP)</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Pemeriksaan
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Form Pemeriksaan Dokter</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Registrasi ID</label>
              <input type="number" required value={formData.registrationId}
                onChange={(e) => setFormData({...formData, registrationId: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Keluhan (Subj)</label>
              <textarea required value={formData.complaint}
                onChange={(e) => setFormData({...formData, complaint: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tekanan Darah</label>
              <input value={formData.bloodPressure}
                onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Suhu (°C)</label>
              <input type="number" step="0.1" value={formData.temperature}
                onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Berat Badan (kg)</label>
              <input type="number" step="0.1" value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tinggi Badan (cm)</label>
              <input type="number" step="0.1" value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Diagnosis</label>
              <textarea required value={formData.diagnosis}
                onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Rencana Terapi</label>
              <textarea required value={formData.therapyPlan}
                onChange={(e) => setFormData({...formData, therapyPlan: e.target.value})}
                className="w-full border rounded px-3 py-2" />
            </div>
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
                <th className="px-4 py-3 text-left text-sm">Pasien</th>
                <th className="px-4 py-3 text-left text-sm">Keluhan</th>
                <th className="px-4 py-3 text-left text-sm">Diagnosis</th>
                <th className="px-4 py-3 text-left text-sm">Tanggal</th>
                <th className="px-4 py-3 text-left text-sm">Terapi</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(records) ? records : []).map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{r.patient?.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm">{r.complaint}</td>
                  <td className="px-4 py-3 text-sm">{r.diagnosis}</td>
                  <td className="px-4 py-3 text-sm">{r.examinationDate?.split('T')[0]}</td>
                  <td className="px-4 py-3 text-sm">{r.therapyPlan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
