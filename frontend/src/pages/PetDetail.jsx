import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import HealthTimeline from '../components/HealthTimeline';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Info, 
  Heart, 
  Clock, 
  Bone, 
  Activity,
  Calendar,
  ShieldCheck,
  Stethoscope,
  Scissors,
  Wind
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petData, setPetData] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [detailRes, healthRes] = await Promise.all([
        api.get(`/pets/${id}`),
        api.get(`/pets/${id}/health-records`)
      ]);
      setPetData(detailRes.data);
      setHealthRecords(healthRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleFeed = async () => {
    try {
      await api.post(`/pets/${id}/feed`);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} 
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-16 h-16 rounded-full border-4 border-[var(--color-primary)] border-t-transparent"
        />
      </div>
    );
  }
  
  if (!petData) return null;

  const { pet, careInstructions, feedingSchedule, healthStatus } = petData;
  const isFedToday = pet.lastFedAt && new Date(pet.lastFedAt).toDateString() === new Date().toDateString();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-20 max-w-6xl mx-auto"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-slate-900 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="glass-card">
        <div className="h-48 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute -bottom-16 left-10 p-1.5 bg-[var(--color-bg)] rounded-3xl">
            <div className="w-32 h-32 bg-[var(--color-surface)] rounded-2xl flex items-center justify-center border-4 border-[var(--color-bg)] shadow-2xl overflow-hidden">
              <img 
                src={
                  pet.species === 'DOG' ? 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80' :
                  pet.species === 'CAT' ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80' :
                  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80'
                } 
                className="w-full h-full object-cover"
                alt={pet.name}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-20 px-10 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-heading font-bold text-slate-900">{pet.name}</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                healthStatus === 'HEALTHY' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                healthStatus === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-200' :
                'bg-amber-50 text-amber-600 border-amber-200'
              }`}>
                {healthStatus.replace('_', ' ')}
              </span>
            </div>
            <p className="text-slate-600 flex items-center gap-4 font-medium">
              <span className="bg-slate-100 px-3 py-1 rounded-md border border-slate-200 capitalize text-slate-700">{pet.species.toLowerCase()}</span>
              <span>{pet.breed}</span>
              <span>•</span>
              <span>{pet.age} Years Old</span>
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleFeed} 
              disabled={isFedToday}
              className={`py-3 px-8 rounded-xl font-heading font-bold transition-all shadow-lg flex items-center gap-3 ${
                isFedToday 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 cursor-default' 
                  : 'btn-primary'
              }`}
            >
              {isFedToday ? <ShieldCheck className="w-5 h-5" /> : <Bone className="w-5 h-5" />}
              {isFedToday ? 'Happily Fed' : 'Feed Buddy Now'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 border-l-4 border-l-[var(--color-accent)] bg-white shadow-sm rounded-2xl">
              <h3 className="text-lg font-heading font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Info className="text-[var(--color-accent)] w-5 h-5" /> Care Guide
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                "{careInstructions}"
              </p>
            </div>
            <div className="glass-card p-6 border-l-4 border-l-[var(--color-secondary)] bg-white shadow-sm rounded-2xl">
              <h3 className="text-lg font-heading font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="text-[var(--color-secondary)] w-5 h-5" /> Feeding Plan
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                "{feedingSchedule}"
              </p>
            </div>
          </div>

          <div className="glass-card p-8 bg-white shadow-sm rounded-3xl">
            <h3 className="text-xl font-heading font-bold text-slate-800 mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Activity className="w-5 h-5" />
              </div>
              Health Journey
            </h3>
            <HealthTimeline records={healthRecords} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 bg-white shadow-sm rounded-3xl border border-slate-100">
            <h3 className="text-lg font-heading font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Detailed Profile</h3>
            <div className="space-y-6">
              {pet.species === 'DOG' && (
                <>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                      <Wind className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Walk Schedule</span>
                      <p className="text-slate-800 font-medium mt-1">{pet.walkSchedule || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Training Notes</span>
                      <p className="text-slate-800 font-medium mt-1">{pet.trainingNotes || 'No notes available'}</p>
                    </div>
                  </div>
                </>
              )}
              {pet.species === 'CAT' && (
                <>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Living Environment</span>
                      <p className="text-slate-800 font-medium mt-1">{pet.isIndoor ? 'Indoor Explorer' : 'Outdoor Adventurer'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Grooming Routine</span>
                      <p className="text-slate-800 font-medium mt-1">{pet.groomingSchedule || 'Minimal grooming'}</p>
                    </div>
                  </div>
                </>
              )}
              {pet.species === 'BIRD' && (
                <>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Cage Size</span>
                      <p className="text-slate-800 font-medium mt-1">{pet.cageSize || 'Standard'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
                      <Wind className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Daily Flight</span>
                      <p className="text-slate-800 font-medium mt-1">{pet.dailyFlyingMinutes ? `${pet.dailyFlyingMinutes} min out of cage` : 'Limited'}</p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Last Fed</span>
                  <p className="text-slate-800 font-medium mt-1">{pet.lastFedAt ? formatDistanceToNow(new Date(pet.lastFedAt), { addSuffix: true }) : 'Never'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PetDetail;
