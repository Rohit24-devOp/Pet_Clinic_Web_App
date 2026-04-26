import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Stethoscope, AlertCircle, Plus, X, Search } from 'lucide-react';
import { format } from 'date-fns';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
    petId: '', dateTime: '', vetName: '', reason: ''
  });

  const loadData = async () => {
    try {
      const [apptsRes, petsRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/pets')
      ]);
      setAppointments(apptsRes.data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)));
      setPets(petsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSchedule = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await api.post('/appointments', formData);
      setShowModal(false);
      setFormData({ petId: '', dateTime: '', vetName: '', reason: '' });
      loadData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to schedule appointment');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900 mb-2">Vet Visits</h1>
          <p className="text-[var(--color-text-muted)]">Keep track of all upcoming and past medical consultations.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 px-8">
          <Plus className="w-5 h-5" /> Schedule New Visit
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} 
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-12 h-12 rounded-full border-4 border-[var(--color-primary)] border-t-transparent"
          />
        </div>
      ) : (
        <div className="glass-card shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[var(--color-text-muted)]">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50 border-b border-white/5">
                  <th className="px-8 py-5 font-bold">Date & Time</th>
                  <th className="px-8 py-5 font-bold">Pet Identity</th>
                  <th className="px-8 py-5 font-bold">Veterinarian</th>
                  <th className="px-8 py-5 font-bold">Reason</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appointments.map(appt => (
                  <tr key={appt.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                          <CalendarIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block font-heading font-bold text-white">{format(new Date(appt.dateTime), 'MMM d, yyyy')}</span>
                          <span className="text-xs text-[var(--color-text-muted)] group-hover:text-slate-300 transition-colors">{format(new Date(appt.dateTime), 'h:mm a')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-xs font-bold text-white">#{appt.petId}</span>
                    </td>
                    <td className="px-8 py-6 font-medium text-white">Dr. {appt.vetName}</td>
                    <td className="px-8 py-6 text-slate-400">{appt.reason}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                        appt.status === 'SCHEDULED' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' :
                        appt.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                        'bg-red-500/20 text-red-400 border border-red-500/20'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <img 
                          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&q=80" 
                          alt="No visits" 
                          className="w-32 h-32 object-cover rounded-full mb-6 opacity-40 grayscale"
                        />
                        <p className="text-[var(--color-text-muted)] font-medium">No medical visits scheduled yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-md p-8 z-10 relative bg-[#1a1a2e]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  New Appointment
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {errorMsg && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}
              
              <form onSubmit={handleSchedule} className="space-y-6">
                <div>
                  <label className="label-text">Select Pet</label>
                  <select required className="input-field" value={formData.petId} onChange={e => setFormData({...formData, petId: e.target.value})}>
                    <option value="">Choose a pet...</option>
                    {pets.map(p => (
                      <option key={p.pet.id} value={p.pet.id}>{p.pet.name} (ID: {p.pet.id})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-text">Visit Date & Time</label>
                  <input required type="datetime-local" className="input-field" value={formData.dateTime} onChange={e => setFormData({...formData, dateTime: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Veterinarian Name</label>
                  <input required className="input-field" placeholder="e.g. Dr. Smith" value={formData.vetName} onChange={e => setFormData({...formData, vetName: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Reason for Visit</label>
                  <input required className="input-field" placeholder="e.g. Annual Vaccination" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full">Cancel</button>
                  <button type="submit" className="btn-primary w-full text-sm">Schedule Now</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Appointments;
