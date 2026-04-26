import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { 
  Users, 
  PawPrint, 
  Stethoscope, 
  ChevronRight,
  Info,
  CalendarDays,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="card p-6 flex items-center justify-between group hover:border-orange-200 transition-all cursor-default">
    <div className="flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-slate-900">{value.toLocaleString()}</h3>
        {trend && (
          <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
            <span className="text-lg leading-none">↗</span> {trend}
          </p>
        )}
      </div>
    </div>
  </div>
);

function Dashboard() {
  const [stats, setStats] = useState({ owners: 0, pets: 0, appointments: 0 });
  const [reminders, setReminders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ownersRes, petsRes, apptsRes, remindersRes] = await Promise.all([
        api.get('/owners'),
        api.get('/pets'),
        api.get('/appointments'),
        api.get('/pets/feeding-reminders')
      ]);

      setStats({
        owners: ownersRes.data.length,
        pets: petsRes.data.length,
        appointments: apptsRes.data.filter(a => a.status === 'SCHEDULED').length
      });
      
      setReminders(remindersRes.data.slice(0, 3));
      setAppointments(apptsRes.data
        .filter(a => a.status === 'SCHEDULED')
        .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
        .slice(0, 3)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFeed = async (id) => {
    try {
      await api.post(`/pets/${id}/feed`);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to feed pet');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8 pb-10"
    >
      {/* Hero Banner Section */}
      <div className="relative h-[380px] rounded-[40px] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&q=80" 
          alt="Banner" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Glassmorphism Card Overlay */}
        <div className="absolute inset-0 flex items-center px-12">
          <div className="glass-morphism p-10 rounded-[32px] max-w-lg shadow-2xl shadow-black/10">
            <span className="inline-block bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest mb-6">
              Good Morning, Sarah
            </span>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Welcome back to PetCare.
            </h1>
            <p className="text-slate-600 font-medium mb-8 leading-relaxed">
              Your clinic is buzzing today! You have <span className="text-orange-600 font-bold">{stats.appointments} appointments</span> scheduled and <span className="text-orange-600 font-bold">{reminders.length} feeding reminders</span> pending.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/appointments" className="btn-primary px-8 py-3.5 shadow-orange-500/30">
                View Schedule
              </Link>
              <button className="bg-white/80 hover:bg-white text-slate-700 font-bold py-3.5 px-8 rounded-2xl transition-all shadow-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={PawPrint} 
          label="Total Pets" 
          value={stats.pets} 
          trend="+12% this month" 
          color="bg-orange-50 text-orange-500"
        />
        <StatCard 
          icon={Users} 
          label="Registered Owners" 
          value={stats.owners} 
          trend="+5% this month" 
          color="bg-emerald-50 text-emerald-500"
        />
        <StatCard 
          icon={Stethoscope} 
          label="Active Cases" 
          value={stats.appointments} 
          trend="8 urgent needs" 
          color="bg-blue-50 text-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Feeding Reminders - Left Column (3/5) */}
        <div className="lg:col-span-3 card p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Feeding Reminders</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">Scheduled meals for current residents</p>
            </div>
            <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {reminders.length} Pending
            </span>
          </div>

          <div className="space-y-6">
            {reminders.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-400 font-medium">No pending feedings. Good job!</p>
              </div>
            ) : (
              reminders.map((pet) => (
                <div key={pet.id} className="flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-100">
                      <img 
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${pet.name}`} 
                        alt={pet.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{pet.name}</h4>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5 capitalize">
                        {pet.species.toLowerCase()} • <span className="text-orange-500">Overdue 15m</span>
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFeed(pet.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 active:scale-95"
                  >
                    Feed Now
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
            <Link to="/vaccinations" className="text-orange-600 font-bold text-sm hover:underline flex items-center justify-center gap-2 mx-auto">
              View All Feeding Schedules <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Upcoming Visits - Right Column (2/5) */}
        <div className="lg:col-span-2 card p-10">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Upcoming Visits</h2>
            <p className="text-sm text-slate-400 font-medium mt-1">Today's clinical appointments</p>
          </div>

          <div className="space-y-6">
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                  <CalendarDays className="text-slate-300" size={40} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">No more visits today!</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-[240px]">
                  All of your scheduled patients have been seen. Take a moment to catch up on medical records.
                </p>
                <Link to="/appointments" className="mt-8 text-orange-600 font-bold text-sm hover:underline flex items-center gap-2">
                  Check tomorrow's schedule <ChevronRight size={16} />
                </Link>
              </div>
            ) : (
              appointments.map(appt => (
                <div key={appt.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-orange-200 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex flex-col items-center justify-center text-orange-600">
                    <span className="text-[10px] font-bold uppercase leading-none">{format(new Date(appt.dateTime), 'MMM')}</span>
                    <span className="text-lg font-bold leading-none">{format(new Date(appt.dateTime), 'd')}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Dr. {appt.vetName}</h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{appt.reason}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-100 w-fit">
                      <Clock size={10} />
                      {format(new Date(appt.dateTime), 'h:mm a')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-auto pt-10">
            <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100/50 flex items-start gap-4">
              <div className="p-2 rounded-xl bg-white shadow-sm text-orange-500 mt-1">
                <Info size={16} />
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                <span className="font-bold text-slate-700">Pro Tip:</span> You can now sync your clinic calendar with Google or Outlook in the <span className="text-orange-600 underline cursor-pointer">integration settings</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
