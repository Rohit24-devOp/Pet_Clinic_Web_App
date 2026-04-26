import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MessageSquare, Phone, Mail, 
  HelpCircle, Plus, Minus, Bug, Lightbulb,
  ArrowRight
} from 'lucide-react';

function Support() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { id: 1, question: "How to manage feeding schedules?", answer: "Navigate to the Feeding Schedule tab. You can view all pets, click 'Add New Schedule' to set a custom schedule, or click 'Feed Now' to log a feeding." },
    { id: 2, question: "How to add new patients?", answer: "Go to the Pet Directory and click the '+ Add New Pet' button. Fill out the pet's details including species, breed, and owner information." },
    { id: 3, question: "Integrating third-party lab results", answer: "Currently, lab results can be manually entered in the Medical Records section. Automatic integration with third-party labs is coming in our next major update." },
    { id: 4, question: "Exporting monthly billing reports", answer: "You can generate billing reports from the Clinic Stats page. Click on the 'Export' button in the top right corner to download as CSV or PDF." }
  ];

  const toggleFaq = (id) => {
    if (activeFaq === id) {
      setActiveFaq(null);
    } else {
      setActiveFaq(id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-12 pb-20 max-w-6xl mx-auto"
    >
      {/* Header & Search */}
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-heading font-bold text-slate-700">How can we help you, Dr. Sarah?</h1>
        
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Ask a question or search for help articles..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-slate-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none shadow-sm text-lg"
          />
        </div>
      </div>

      {/* Support Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Live Chat */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-[#ea580c] rounded-2xl p-8 text-white shadow-lg shadow-orange-500/20"
        >
          <MessageSquare className="w-8 h-8 mb-6 text-white/90 fill-white/20" />
          <h3 className="text-xl font-heading font-bold mb-2">Live Chat</h3>
          <p className="text-orange-100 mb-6 font-medium">Average wait time: 2 mins</p>
          <button className="bg-white text-orange-600 font-bold py-2.5 px-6 rounded-xl hover:bg-orange-50 transition-colors shadow-sm">
            Start Chat
          </button>
        </motion.div>

        {/* Call Support */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl p-8 text-slate-800 border border-slate-100 shadow-sm"
        >
          <Phone className="w-8 h-8 mb-6 text-orange-500" />
          <h3 className="text-xl font-heading font-bold mb-2 text-slate-700">Call Support</h3>
          <p className="text-slate-500 mb-6 font-medium">Available 24/7 for urgent care</p>
          <p className="text-orange-600 font-bold text-lg">+1 (800) PET-PROS</p>
        </motion.div>

        {/* Email Us */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl p-8 text-slate-800 border border-slate-100 shadow-sm"
        >
          <Mail className="w-8 h-8 mb-6 text-orange-500" />
          <h3 className="text-xl font-heading font-bold mb-2 text-slate-700">Email Us</h3>
          <p className="text-slate-500 mb-6 font-medium">Get a response within 24 hours</p>
          <p className="text-orange-600 font-bold text-lg">support@petcarepro.com</p>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 text-slate-700">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-heading font-semibold">Frequently Asked Questions</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            {faqs.map((faq, index) => (
              <div key={faq.id} className={`${index !== faqs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <button 
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-700">{faq.question}</span>
                  {activeFaq === faq.id ? (
                    <Minus className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {activeFaq === faq.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-500 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div>
            <a href="#" className="inline-flex items-center gap-1 text-orange-600 font-bold text-sm hover:text-orange-700 transition-colors">
              View all 50+ articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Improve PetCare Pro Section */}
        <div className="bg-[#111827] rounded-3xl p-8 text-white relative overflow-hidden">
          {/* Decorative background elements could go here */}
          
          <div className="relative z-10">
            <h2 className="text-xl font-heading font-bold mb-4">Improve PetCare Pro</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Your feedback helps us build better tools for your practice. Found a bug or have a feature request?
            </p>
            
            <div className="space-y-3">
              <button className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Bug className="w-4 h-4" /> Report a Bug
              </button>
              
              <button className="w-full bg-[#1f2937] hover:bg-[#374151] border border-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Lightbulb className="w-4 h-4" /> Submit Feedback
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}

export default Support;
