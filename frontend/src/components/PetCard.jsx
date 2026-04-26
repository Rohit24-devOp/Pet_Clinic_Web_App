import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Heart, ShieldCheck, AlertCircle, ShieldAlert, Utensils } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const speciesImages = {
  DOG: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
  CAT: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
  BIRD: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80'
};

function PetCard({ pet, healthStatus, onDelete }) {
  
  const getStatusInfo = () => {
    switch(healthStatus) {
      case 'HEALTHY':
        return { 
          label: 'Healthy', 
          color: 'bg-emerald-500', 
          textColor: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          icon: <ShieldCheck className="w-3 h-3" />
        };
      case 'NEEDS_ATTENTION':
        return { 
          label: 'Needs Care', 
          color: 'bg-amber-500', 
          textColor: 'text-amber-600',
          bgColor: 'bg-amber-50',
          icon: <AlertCircle className="w-3 h-3" />
        };
      case 'CRITICAL':
        return { 
          label: 'Critical', 
          color: 'bg-red-500', 
          textColor: 'text-red-600',
          bgColor: 'bg-red-50',
          icon: <ShieldAlert className="w-3 h-3" />
        };
      default:
        return { label: 'Unknown', color: 'bg-slate-500', textColor: 'text-slate-600', bgColor: 'bg-slate-50' };
    }
  };

  const status = getStatusInfo();
  const timeSinceFed = pet.lastFedAt ? formatDistanceToNow(new Date(pet.lastFedAt), { addSuffix: true }) : 'Never';

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="card flex flex-col group h-full bg-white shadow-sm border border-slate-100 hover:border-orange-200 transition-all"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={speciesImages[pet.species] || speciesImages.DOG} 
          alt={pet.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/50 ${status.bgColor} ${status.textColor}`}>
            <span className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
            {status.label}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-slate-900 group-hover:text-orange-600 transition-colors">{pet.name}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>{pet.breed}</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span>{pet.age} Years</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Utensils size={14} className="text-orange-500" />
          <span>Last fed: <strong className="text-slate-700">{timeSinceFed}</strong></span>
        </div>

        <div className="mt-auto pt-4 flex gap-3">
          <Link 
            to={`/pets/${pet.id}`} 
            className="flex-1 py-3 px-4 bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-center text-xs font-bold rounded-2xl border border-slate-100 hover:border-orange-100 transition-all flex items-center justify-center gap-2"
          >
            <Heart size={14} />
            View Profile
          </Link>
          <button 
            onClick={(e) => { e.preventDefault(); onDelete(pet.id); }}
            className="w-12 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl border border-red-100 transition-all"
            title="Remove Pet"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PetCard;
