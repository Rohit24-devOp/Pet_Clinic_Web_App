import React from 'react';
import { format } from 'date-fns';
import { Syringe, CalendarDays, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function HealthTimeline({ records }) {
  if (!records || records.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center">
        <AlertCircle className="w-8 h-8 mb-4 text-[var(--color-text-muted)] opacity-50" />
        <p className="text-[var(--color-text-muted)] text-sm font-medium">No medical history logged for this patient.</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-1">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/50 via-teal-500/30 to-transparent" />

      <div className="space-y-10">
        {records.map((record, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-16"
          >
            {/* Timeline Marker */}
            <div className={`absolute left-4 top-2 w-4 h-4 rounded-full border-4 border-[var(--color-bg)] z-10 flex items-center justify-center
              ${record.type === 'VACCINATION' ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]'}`} 
            />
            
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 group hover:border-slate-200 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${record.type === 'VACCINATION' ? 'bg-purple-50 text-purple-600' : 'bg-teal-50 text-teal-600'}`}>
                    {record.type === 'VACCINATION' ? <Syringe className="w-4 h-4" /> : <CalendarDays className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-800 tracking-tight">{record.type.replace('_', ' ')}</h4>
                    <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-widest">Medical Record</span>
                  </div>
                </div>
                <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-bold text-slate-600">
                  {format(new Date(record.date), 'MMMM d, yyyy')}
                </div>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                {record.notes}
              </p>
              
              {record.nextDueDate && (
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Next Due Date:</span>
                    <span className="text-xs font-bold text-amber-600">{format(new Date(record.nextDueDate), 'MMMM d, yyyy')}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HealthTimeline;
