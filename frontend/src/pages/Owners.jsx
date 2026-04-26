import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  X, 
  Search, 
  MoreVertical, 
  SlidersHorizontal,
  ArrowUpRight,
  Edit2,
  Trash2
} from 'lucide-react';

function Owners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', gender: 'Male' });

  const loadOwners = async () => {
    try {
      setLoading(true);
      const res = await api.get('/owners');
      setOwners(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOwners();
    
    // Close menu when clicking outside
    const handleClickOutside = () => setActiveMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleRegisterOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/owners/${editingId}`, formData);
      } else {
        await api.post('/owners', formData);
      }
      closeModal();
      loadOwners();
    } catch (err) {
      alert(err.message || 'Failed to process request');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this owner? This action cannot be undone.')) {
      try {
        await api.delete(`/owners/${id}`);
        loadOwners();
      } catch (err) {
        alert(err.message || 'Failed to delete owner');
      }
    }
  };

  const openEditModal = (e, owner) => {
    e.stopPropagation();
    setIsEditMode(true);
    setEditingId(owner.id);
    setFormData({
      name: owner.name,
      email: owner.email,
      phone: owner.phone,
      address: owner.address,
      gender: owner.gender || 'Male'
    });
    setShowModal(true);
    setActiveMenu(null);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ name: '', email: '', phone: '', address: '', gender: 'Male' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingId(null);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const filteredOwners = owners.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-10 pb-20"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Pet Owners</h1>
          <p className="text-slate-500 font-medium text-lg">Manage your community of dedicated pet parents and their contact details.</p>
        </div>
        <button onClick={openAddModal} className="btn-primary px-8 py-3.5 text-base shadow-orange-500/30">
          <UserPlus size={20} strokeWidth={2.5} /> Register New Owner
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="input-field pl-14 py-4 text-base bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 font-bold py-4 px-8 rounded-2xl flex items-center gap-3 shadow-sm hover:bg-slate-50 transition-all">
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOwners.map(owner => (
            <motion.div 
              key={owner.id} 
              whileHover={{ y: -8 }}
              className="card p-10 bg-white hover:border-orange-200 transition-all group relative"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${owner.name}`} 
                      alt={owner.name} 
                      className="w-16 h-16 rounded-full bg-slate-100 border-2 border-white shadow-sm"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{owner.name}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">ID: PW-00{owner.id}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={(e) => toggleMenu(e, owner.id)}
                    className="text-slate-300 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-50"
                  >
                    <MoreVertical size={20} />
                  </button>
                  
                  <AnimatePresence>
                    {activeMenu === owner.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20"
                      >
                        <button 
                          onClick={(e) => openEditModal(e, owner)}
                          className="w-full px-4 py-3 flex items-center gap-3 text-slate-600 hover:text-orange-600 hover:bg-orange-50 font-bold text-sm transition-all"
                        >
                          <Edit2 size={16} /> Edit Details
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, owner.id)}
                          className="w-full px-4 py-3 flex items-center gap-3 text-slate-600 hover:text-red-600 hover:bg-red-50 font-bold text-sm transition-all"
                        >
                          <Trash2 size={16} /> Delete Owner
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-slate-500 font-medium">
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-orange-500 transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm truncate">{owner.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 font-medium">
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-orange-500 transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm">{owner.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 font-medium">
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-orange-500 transition-colors">
                    <MapPin size={16} />
                  </div>
                  <span className="text-sm truncate">{owner.address}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Pet1" alt="Pet" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-500">
                    +1
                  </div>
                </div>
                <button className="text-orange-600 font-bold text-sm hover:underline flex items-center gap-2">
                  View Pets <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Promotional Card */}
          <div className="lg:col-span-2 card p-0 overflow-hidden bg-[#fff7ed] border-orange-100 flex flex-col md:flex-row relative">
            <div className="p-12 flex-1 relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">Grow Your Pet Community</h2>
              <p className="text-slate-600 font-medium mb-10 leading-relaxed max-w-sm">
                Invite more owners to the PetPulse platform to centralize pet records, health tracking, and scheduling in one place.
              </p>
              
              <div className="flex items-center gap-12">
                <div>
                  <h4 className="text-4xl font-bold text-orange-600 mb-1">{owners.length + 124}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Owners</p>
                </div>
                <div className="w-[1px] h-10 bg-orange-200" />
                <div>
                  <h4 className="text-4xl font-bold text-orange-600 mb-1">8</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[400px] h-[300px] md:h-auto relative overflow-hidden flex items-center justify-center p-8">
               <img 
                 src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80" 
                 alt="Community" 
                 className="w-full h-full object-cover rounded-3xl shadow-xl rotate-3 scale-110"
               />
            </div>
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
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-lg p-10 z-10 relative shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{isEditMode ? 'Edit Owner' : 'Register Owner'}</h2>
                  <p className="text-slate-400 font-medium mt-1">
                    {isEditMode ? 'Update owner information in the database.' : 'Add a new pet parent to the database.'}
                  </p>
                </div>
                <button onClick={closeModal} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleRegisterOrUpdate} className="space-y-6">
                <div>
                  <label className="label-text">Full Name</label>
                  <input required className="input-field" placeholder="e.g. John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Email Address</label>
                  <input required type="email" className="input-field" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Phone Number</label>
                  <input className="input-field" placeholder="e.g. +1 234 567 890" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="label-text">Gender</label>
                  <div className="flex gap-3 mt-2">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border ${
                          formData.gender === g 
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20' 
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-text">Residential Address</label>
                  <textarea className="input-field min-h-[100px] resize-none" placeholder="e.g. 123 Pet Lane, NYC" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={closeModal} className="btn-secondary w-full py-4">Cancel</button>
                  <button type="submit" className="btn-primary w-full py-4 text-base">
                    {isEditMode ? 'Update Owner' : 'Register Owner'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Owners;
