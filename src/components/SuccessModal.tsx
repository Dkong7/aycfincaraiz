import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Home } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const SuccessModal = ({ isOpen, onClose, message }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Verde */}
            <div className="bg-[#009B4D] h-24 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               
               <motion.div 
                 initial={{ scale: 0 }} 
                 animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                 transition={{ 
                    scale: { type: "spring", delay: 0.2 },
                    rotate: { type: "tween", duration: 0.5, delay: 0.3 }
                 }}
                 className="bg-white p-4 rounded-full shadow-lg z-10 relative"
               >
                  <Home size={32} className="text-[#009B4D]" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }} // CORREGIDO AQUÍ
                    className="absolute -bottom-1 -right-1 bg-[#0A192F] rounded-full p-1 border-2 border-white"
                  >
                    <Check size={12} className="text-white" strokeWidth={4} />
                  </motion.div>
               </motion.div>
            </div>

            <div className="p-8">
               <h2 className="text-2xl font-black text-[#0A192F] mb-2 uppercase">¡Operación Exitosa!</h2>
               <p className="text-gray-500 text-sm mb-8 font-medium leading-relaxed">{message}</p>
               
               <button 
                 onClick={onClose} 
                 className="w-full bg-[#0A192F] text-white font-bold py-4 rounded-xl hover:bg-[#0A192F]/90 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95"
               >
                 CONTINUAR
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};