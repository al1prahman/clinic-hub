import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: '📊 Dashboard' },
  { to: '/patients', label: '👤 Pasien' },
  { to: '/registrations', label: '📋 Registrasi' },
  { to: '/queue', label: '🚶 Antrian' },
  { to: '/medical-records', label: '🩺 Rekam Medis' },
  { to: '/prescriptions', label: '💊 Resep Obat' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">🏥 ClinicHub</h1>
          <p className="text-xs text-blue-300 mt-1">Mini Clinic Information System</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block px-4 py-2 rounded text-sm transition ${
                  isActive ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <div className="text-sm text-blue-300 mb-2">
            <div className="font-medium text-white">{user?.full_name || user?.username}</div>
            <div className="text-xs capitalize">{user?.role?.replace('_', ' ')}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
