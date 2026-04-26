import React, { useState, useEffect, useRef } from 'react';
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
import { Search, Bell, Settings, User, Lock, HelpCircle, LogOut, X } from 'lucide-react';
import api from './api/axios';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [reminders, setReminders] = useState([]);
  
  // Doctor Profile States
  const [doctorName, setDoctorName] = useState('Dr. Sarah Miller');
  const [doctorTitle, setDoctorTitle] = useState('Senior Veterinarian');
  const [doctorGender, setDoctorGender] = useState('female');
  const [tempDoctorName, setTempDoctorName] = useState(doctorName);
  const [tempDoctorTitle, setTempDoctorTitle] = useState(doctorTitle);
  const [tempDoctorGender, setTempDoctorGender] = useState(doctorGender);

  const notifRef = useRef();
  const settingsRef = useRef();

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/pets/feeding-reminders').then(res => setReminders(res.data)).catch(console.error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setDoctorName(tempDoctorName);
    setDoctorTitle(tempDoctorTitle);
    setDoctorGender(tempDoctorGender);
    setShowProfileModal(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // Avatar URL Generator
  const getAvatarUrl = (name, gender) => {
    const seed = encodeURIComponent(name + gender);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9&topType=${gender === 'male' ? 'shortHair,frizzle,shaggy,sides' : 'longHair,bob,curly,dreads'}`;
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex transition-colors duration-300 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <Navbar onLogout={() => setIsAuthenticated(false)} />
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* Top Bar */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-20 transition-colors duration-300">
            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search pets, owners, or medical records..." 
                className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
              />
            </div>
            
            <div className="flex items-center gap-6">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-50"
                >
                  <Bell size={20} />
                  {reminders.length > 0 && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  )}
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">{reminders.length} New</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto p-2">
                        {reminders.length === 0 ? (
                          <div className="p-4 text-center text-sm text-slate-500">No new reminders!</div>
                        ) : (
                          reminders.map(pet => (
                            <div key={pet.id} className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex gap-3">
                              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                <Bell size={16} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">Feeding Reminder</p>
                                <p className="text-xs text-slate-500 mt-0.5">Time to feed {pet.name} ({pet.species})</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Settings */}
              <div className="relative" ref={settingsRef}>
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-50"
                >
                  <Settings size={20} />
                </button>
                <AnimatePresence>
                  {showSettings && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Settings</h3>
                      </div>
                      <div className="p-2 space-y-1">
                        <button 
                          onClick={() => {
                            setTempDoctorName(doctorName);
                            setTempDoctorTitle(doctorTitle);
                            setTempDoctorGender(doctorGender);
                            setShowProfileModal(true);
                            setShowSettings(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left text-sm font-medium text-slate-700"
                        >
                          <User size={16} /> Account Profile
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left text-sm font-medium text-slate-700">
                          <Lock size={16} /> Security & Privacy
                        </button>
                        <div className="h-px bg-slate-100 my-1 mx-2" />
                        <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left text-sm font-medium text-slate-700">
                          <HelpCircle size={16} /> Help Center
                        </button>
                        <button 
                          onClick={() => setIsAuthenticated(false)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-colors text-left text-sm font-bold text-red-600"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="h-10 w-[1px] bg-slate-100 mx-2 transition-colors duration-300" />
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{doctorName}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{doctorTitle}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white shadow-sm overflow-hidden transition-colors duration-300">
                  <img src={getAvatarUrl(doctorName, doctorGender)} alt="Avatar" />
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

      {/* Account Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600" />
              
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Doctor Profile</h2>
                <button onClick={() => setShowProfileModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-emerald-500 border-4 border-slate-50 shadow-xl overflow-hidden mb-4">
                  <img src={getAvatarUrl(tempDoctorName, tempDoctorGender)} alt="Avatar" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{tempDoctorName}</h3>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">{tempDoctorTitle}</p>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={tempDoctorName}
                    onChange={(e) => setTempDoctorName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                    placeholder="e.g. Dr. Sarah Miller"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Specialization / Title</label>
                  <input 
                    type="text" 
                    value={tempDoctorTitle}
                    onChange={(e) => setTempDoctorTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                    placeholder="e.g. Senior Veterinarian"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Gender</label>
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setTempDoctorGender('male')}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${tempDoctorGender === 'male' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                    >
                      Male
                    </button>
                    <button 
                      type="button"
                      onClick={() => setTempDoctorGender('female')}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${tempDoctorGender === 'female' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
