import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<div className="p-8"><h1 className="text-3xl font-bold text-blue-600">🏥 ClinicHub</h1><p className="mt-2 text-gray-600">Mini Clinic Information System</p></div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
