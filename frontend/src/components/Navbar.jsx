import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PawPrint, 
  Utensils, 
  BarChart3, 
  ClipboardList, 
  LifeBuoy,
  LogOut,
  Plus,
  Heart
} from 'lucide-react';

function Navbar({ onLogout }) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Pet Directory', icon: PawPrint, path: '/pets' },
    { name: 'Owners', icon: Users, path: '/owners' },
    { name: 'Feeding Schedule', icon: Utensils, path: '/feeding-schedule' },
    { name: 'Clinic Stats', icon: BarChart3, path: '/appointments' }, // Proxying
    { name: 'Medical Records', icon: ClipboardList, path: '/vaccinations' },
    { name: 'Support', icon: LifeBuoy, path: '/support' },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col px-6 py-8">
      {/* Logo */}
      <div className="mb-12 px-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center text-orange-500">
            <Heart className="w-10 h-10" fill="currentColor" />
            <PawPrint className="w-5 h-5 text-white absolute" />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <Plus className="w-3 h-3 text-orange-600 font-bold" strokeWidth={4} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-orange-600">
              PetCare Pro
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Clinic Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="mt-auto pt-8 border-t border-slate-100 space-y-6">
        <Link to="/pets?add=true" className="btn-primary w-full py-4">
          <Plus size={20} strokeWidth={3} />
          Add New Pet
        </Link>
        
        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Navbar;
