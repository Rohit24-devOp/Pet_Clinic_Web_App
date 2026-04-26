import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, CheckCircle2, Clock, Plus, X } from 'lucide-react';
import { format } from 'date-fns';

function FeedingSchedule() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ petId: '', schedule: '' });

  const loadData = async () => {
    try {
      const res = await api.get('/pets');
      setPets(res.data);
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
      alert(err.response?.data?.message || err.message || 'Failed to feed pet');
    }
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    if (!formData.petId) {
      alert('Please select a pet');
      return;
    }
    try {
      await api.put(`/pets/${formData.petId}/feeding-schedule`, { schedule: formData.schedule });
      setShowModal(false);
      setFormData({ petId: '', schedule: '' });
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to update schedule');
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
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Feeding Schedule</h1>
          <p className="text-[var(--color-text-muted)]">Track and manage daily feeding routines for all pets.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 px-8">
          <Plus className="w-5 h-5" /> Add New Schedule
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pets.map(({ pet }) => {
            const isFedToday = pet.lastFedAt && new Date(pet.lastFedAt).toDateString() === new Date().toDateString();
            
            return (
              <motion.div 
                key={pet.id} 
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 border border-slate-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all bg-white"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 font-heading font-bold text-xl border border-orange-100">
                    {pet.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-slate-900">{pet.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pet.species}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Utensils className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{pet.feedingSchedule || 'Standard schedule'}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Last fed: {pet.lastFedAt ? format(new Date(pet.lastFedAt), 'MMM d, yyyy h:mm a') : 'Never'}</span>
                  </div>
                </div>

                {isFedToday ? (
                  <div className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 font-bold text-sm border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" />
                    Fed Today
                  </div>
                ) : (
                  <button 
                    onClick={() => handleFeed(pet.id)}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                  >
                    <Utensils className="w-4 h-4" />
                    Feed Now
                  </button>
                )}
              </motion.div>
            );
          })}

          {pets.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-400">No pets registered yet.</p>
            </div>
          )}
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
              className="glass-card w-full max-w-md p-8 z-10 relative bg-white"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                    <Utensils className="w-6 h-6" />
                  </div>
                  Add New Schedule
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateSchedule} className="space-y-5">
                <div>
                  <label className="label-text">Select Pet</label>
                  <select required className="input-field" value={formData.petId} onChange={e => setFormData({...formData, petId: e.target.value})}>
                    <option value="">Choose a pet...</option>
                    {pets.map(p => (
                      <option key={p.pet.id} value={p.pet.id}>{p.pet.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-text">Custom Feeding Schedule</label>
                  <textarea required className="input-field min-h-[100px] resize-none" placeholder="e.g. Feed 3 times a day with specific dietary food." value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})} />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full">Cancel</button>
                  <button type="submit" className="btn-primary w-full text-sm font-bold">Save Schedule</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FeedingSchedule;
