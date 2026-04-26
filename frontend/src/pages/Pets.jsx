import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PetCard from '../components/PetCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, X, PawPrint, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Pets() {
  const [petsData, setPetsData] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '', age: '', breed: '', species: 'DOG', ownerId: '',
    walkSchedule: '', trainingNotes: '',
    isIndoor: false, groomingSchedule: '',
    cageSize: '', dailyFlyingMinutes: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const [petsRes, ownersRes] = await Promise.all([
        api.get('/pets'),
        api.get('/owners')
      ]);
      setPetsData(petsRes.data);
      setOwners(ownersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (location.search.includes('add=true')) {
      setShowAddModal(true);
      // Clean up the URL
      navigate('/pets', { replace: true });
    }
  }, [location.search]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this pet?')) {
      try {
        await api.delete(`/pets/${id}`);
        loadData();
      } catch (err) {
        alert('Failed to delete pet');
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        age: parseInt(formData.age),
        breed: formData.breed,
        species: formData.species,
        ownerId: formData.ownerId
      };
      
      if (formData.species === 'DOG') {
        payload.walkSchedule = formData.walkSchedule;
        payload.trainingNotes = formData.trainingNotes;
      } else if (formData.species === 'CAT') {
        payload.isIndoor = formData.isIndoor;
        payload.groomingSchedule = formData.groomingSchedule;
      } else if (formData.species === 'BIRD') {
        payload.cageSize = formData.cageSize;
        payload.dailyFlyingMinutes = parseInt(formData.dailyFlyingMinutes);
      }

      await api.post('/pets', payload);
      setShowAddModal(false);
      setFormData({ name: '', age: '', breed: '', species: 'DOG', ownerId: '', walkSchedule: '', trainingNotes: '', isIndoor: false, groomingSchedule: '', cageSize: '', dailyFlyingMinutes: '' });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to add pet');
    }
  };

  const filteredPets = petsData.filter(p => {
    const matchesFilter = filter === 'ALL' || p.pet.species === filter;
    const matchesSearch = p.pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8 pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pets Directory</h1>
          <p className="text-slate-400 font-medium">Manage your animal friends and their data.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary px-8">
          <Plus size={20} strokeWidth={3} /> Add New Pet
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-[20px] w-fit">
          {['ALL', 'DOG', 'CAT', 'BIRD'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-[14px] text-sm font-bold transition-all ${
                filter === f 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f === 'ALL' ? 'All Pets' : f.charAt(0) + f.slice(1).toLowerCase() + 's'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name or breed..." 
            className="input-field pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPets.map(({pet, healthStatus}) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                healthStatus={healthStatus} 
                onDelete={handleDelete} 
              />
            ))}
          </motion.div>
          
          {filteredPets.length === 0 && (
             <div className="card py-24 text-center border-dashed border-2">
               <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <PawPrint className="text-slate-200" size={48} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">No Pets Found</h3>
               <p className="text-slate-400 font-medium">Try changing your filter or add a new pet to get started.</p>
             </div>
          )}
        </>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-2xl p-10 z-10 relative shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Add New Pet</h2>
                  <p className="text-slate-400 font-medium mt-1">Fill in the details for the new patient.</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAdd} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text">Pet Name</label>
                    <input required className="input-field" placeholder="e.g. Buddy" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="label-text">Age (Years)</label>
                    <input required type="number" className="input-field" placeholder="e.g. 3" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                  </div>
                  <div>
                    <label className="label-text">Breed</label>
                    <input required className="input-field" placeholder="e.g. Golden Retriever" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />
                  </div>
                  <div>
                    <label className="label-text">Owner</label>
                    <select required className="input-field" value={formData.ownerId} onChange={e => setFormData({...formData, ownerId: e.target.value})}>
                      <option value="">Select Owner</option>
                      {owners.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="label-text">Species</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['DOG', 'CAT', 'BIRD'].map(s => (
                      <button 
                        key={s}
                        type="button"
                        onClick={() => setFormData({...formData, species: s})}
                        className={`py-4 rounded-2xl border-2 font-bold transition-all ${
                          formData.species === s 
                            ? 'bg-orange-50 border-orange-500 text-orange-600' 
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                  <h4 className="text-orange-500 font-bold mb-6 text-xs uppercase tracking-widest">{formData.species} Profile Details</h4>
                  
                  {formData.species === 'DOG' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label-text text-slate-500">Walk Schedule</label>
                        <input className="input-field bg-white" placeholder="e.g. 3 times daily" value={formData.walkSchedule} onChange={e => setFormData({...formData, walkSchedule: e.target.value})} />
                      </div>
                      <div>
                        <label className="label-text text-slate-500">Training Notes</label>
                        <input className="input-field bg-white" placeholder="e.g. Potty trained" value={formData.trainingNotes} onChange={e => setFormData({...formData, trainingNotes: e.target.value})} />
                      </div>
                    </div>
                  )}
                  
                  {formData.species === 'CAT' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 pt-8">
                        <input type="checkbox" id="indoor" className="w-6 h-6 rounded-lg border-slate-200 text-orange-500 focus:ring-orange-500" checked={formData.isIndoor} onChange={e => setFormData({...formData, isIndoor: e.target.checked})} />
                        <label htmlFor="indoor" className="text-sm font-bold text-slate-700">Indoor Only?</label>
                      </div>
                      <div>
                        <label className="label-text text-slate-500">Grooming Schedule</label>
                        <input className="input-field bg-white" placeholder="e.g. Every Sunday" value={formData.groomingSchedule} onChange={e => setFormData({...formData, groomingSchedule: e.target.value})} />
                      </div>
                    </div>
                  )}
                  
                  {formData.species === 'BIRD' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label-text text-slate-500">Cage Dimensions</label>
                        <input className="input-field bg-white" placeholder="e.g. 60x60x100cm" value={formData.cageSize} onChange={e => setFormData({...formData, cageSize: e.target.value})} />
                      </div>
                      <div>
                        <label className="label-text text-slate-500">Daily Flight Time (Min)</label>
                        <input type="number" className="input-field bg-white" placeholder="e.g. 30" value={formData.dailyFlyingMinutes} onChange={e => setFormData({...formData, dailyFlyingMinutes: e.target.value})} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary px-8">Cancel</button>
                  <button type="submit" className="btn-primary px-10">Save Pet Profile</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Pets;
