import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Owners from './pages/Owners';
import Pets from './pages/Pets';
import PetDetail from './pages/PetDetail';
import Appointments from './pages/Appointments';
import Vaccinations from './pages/Vaccinations';
import FeedingSchedule from './pages/FeedingSchedule';
import Support from './pages/Support';
import Login from './pages/Login';
import { Search, Bell, Settings } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] flex">
        <Navbar onLogout={() => setIsAuthenticated(false)} />
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* Top Bar */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search pets, owners, or medical records..." 
                className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
              />
            </div>
            
            <div className="flex items-center gap-6">
              <button className="text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-50">
                <Bell size={20} />
              </button>
              <button className="text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-50">
                <Settings size={20} />
              </button>
              
              <div className="h-10 w-[1px] bg-slate-100 mx-2" />
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">Dr. Sarah Miller</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Senior Veterinarian</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white shadow-sm overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Avatar" />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-10 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/owners" element={<Owners />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/pets/:id" element={<PetDetail />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/vaccinations" element={<Vaccinations />} />
                <Route path="/feeding-schedule" element={<FeedingSchedule />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
