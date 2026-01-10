// src/components/auth/SecurityModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react";

interface SecurityModalProps {
  msg: string;
  type: "warning" | "error" | "demon";
  theme: string;
  mode: "secret" | "standard";
  onClose: () => void;
  attempts: number;
}

export default function SecurityModal({ msg, type, theme, mode, onClose, attempts }: SecurityModalProps) {
  if (!msg) return null;

  return (
    <AnimatePresence>
        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md px-6"
        >
           {/* MODO DEMONIO */}
           {type === "demon" && (
               <div className="text-center">
                   <motion.div 
                     animate={{ scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] }} 
                     transition={{ duration: 0.3, repeat: Infinity }}
                     className="text-7xl md:text-9xl mb-4 drop-shadow-[0_0_50px_rgba(255,0,0,0.8)]"
                   >
                       👹
                   </motion.div>
                   <h2 className="text-4xl md:text-6xl font-black text-red-600 uppercase tracking-widest glitch-text">
                      {msg}
                   </h2>
               </div>
           )}

           {/* MODO CORPORATIVO */}
           {theme === "agent" && (
               <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border-t-8 border-red-600">
                   <XCircle className="w-12 h-12 md:w-16 md:h-16 text-red-600 mx-auto mb-4" />
                   <h3 className="text-lg md:text-xl font-bold text-[#0A192F] mb-2 uppercase">Error de Autenticación</h3>
                   <p className="text-gray-500 text-sm mb-6">{msg}</p>
                   <button onClick={onClose} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-sm uppercase">Cerrar</button>
               </div>
           )}

           {/* MODO SECRETO (Advertencias) */}
           {mode === "secret" && type !== "demon" && (
               <div className="text-center px-4">
                   <div className="text-6xl md:text-8xl mb-6 animate-bounce">
                       {attempts === 3 ? "👿" : attempts === 2 ? "😠" : "🤨"}
                   </div>
                   <h2 className={`text-2xl md:text-4xl font-black uppercase text-center ${theme === "claudia" ? "text-pink-400" : "text-amber-500"}`}>
                      {msg}
                   </h2>
               </div>
           )}
        </motion.div>
    </AnimatePresence>
  );
}