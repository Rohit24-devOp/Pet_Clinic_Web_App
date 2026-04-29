import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Syringe, Plus, X, Calendar, FileText, Search, Activity } from 'lucide-react';
import { format } from 'date-fns';

function Vaccinations() {
  const [pets, setPets] = useState([]);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    petId: '', type: 'VACCINATION', date: '', notes: '', nextDueDate: ''
  });

  const loadData = async () => {
    try {
      const petsRes = await api.get('/pets');
      const petList = petsRes.data;
      setPets(petList);
      
      const recordsMap = {};
      for (let p of petList) {
        const recRes = await api.get(`/pets/${p.pet.id}/health-records`);
        if (recRes.data.length > 0) {
          recordsMap[p.pet.id] = {
            pet: p.pet,
            records: recRes.data
          };
        }
      }
      setRecords(recordsMap);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/health-records', formData);
      setShowModal(false);
      setFormData({ petId: '', type: 'VACCINATION', date: '', notes: '', nextDueDate: '' });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to add record');
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
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Health Log</h1>
          <p className="text-[var(--color-text-muted)]">Track vaccinations, checkups, and medical history.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 px-8">
          <Plus className="w-5 h-5" /> Add New Record
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
        <div className="space-y-12">
          {Object.values(records).map(({pet, records: petRecords}) => (
            <motion.div 
              key={pet.id} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-10"
            >
              <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-500/5 flex items-center justify-center text-teal-400 font-heading font-bold text-xl border border-teal-500/20 shadow-lg shadow-teal-500/10">
                    {pet.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-slate-800">{pet.name}</h3>
                    <p className="text-xs font-bold text-[var(--color-text-muted)] tracking-widest uppercase">Patient ID: PET-00{pet.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-tighter">Active Profile</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {petRecords.map(rec => (
                  <motion.div 
                    key={rec.id} 
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:bg-slate-100 hover:border-slate-200 transition-all group"
                  >
                    <div className="flex justify-between items-center mb-5">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md ${
                        rec.type === 'VACCINATION' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' : 'bg-teal-500/20 text-teal-400 border border-teal-500/20'
                      }`}>
                        {rec.type.replace('_', ' ')}
                      </span>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(rec.date), 'MMM d, yyyy')}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-[var(--color-text-muted)] mt-1 shrink-0" />
                        <p className="text-slate-600 text-sm leading-relaxed">{rec.notes}</p>
                      </div>
                      
                      {rec.nextDueDate && (
                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-tight">Next Scheduled Due</span>
                          <span className="text-xs font-bold text-orange-600">{format(new Date(rec.nextDueDate), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
          
          {Object.keys(records).length === 0 && (
             <div className="text-center py-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
               <img 
                 src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80" 
                 alt="No records" 
                 className="w-40 h-40 object-cover rounded-full mx-auto mb-6 opacity-40 grayscale"
               />
               <h3 className="text-xl font-heading font-bold text-slate-800 mb-2">No Medical History</h3>
               <p className="text-[var(--color-text-muted)]">Register health records for your pets to see them here.</p>
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
              className="card w-full max-w-md p-8 z-10 relative"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Syringe className="w-6 h-6" />
                  </div>
                  Add New Record
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAdd} className="space-y-5">
                <div>
                  <label className="label-text">Select Pet Profile</label>
                  <select required className="input-field" value={formData.petId} onChange={e => setFormData({...formData, petId: e.target.value})}>
                    <option value="">Choose a pet...</option>
                    {pets.map(p => (
                      <option key={p.pet.id} value={p.pet.id}>{p.pet.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Record Type</label>
                    <select required className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="VACCINATION">Vaccination</option>
                      <option value="VET_VISIT">Vet Visit</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Log Date</label>
                    <input required type="date" className="input-field" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="label-text">Description / Clinical Notes</label>
                  <textarea required className="input-field min-h-[100px] resize-none" placeholder="e.g. Administered rabies booster shot." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Follow-up Due Date (Optional)</label>
                  <input type="date" className="input-field" value={formData.nextDueDate} onChange={e => setFormData({...formData, nextDueDate: e.target.value})} />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full">Cancel</button>
                  <button type="submit" className="btn-primary w-full text-sm font-bold">Log Record</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Vaccinations;
