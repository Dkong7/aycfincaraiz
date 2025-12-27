import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Loader2, Image, Save } from 'lucide-react';

const SmartModal = ({ isOpen, onClose, config }) => {
  const [inputValue, setInputValue] = useState('');
  if (!isOpen) return null;

  const { type, title, msg, onConfirm, theme = 'blue' } = config;

  // Estilos según tema (Alfonso/Dark vs Claudia/Pink)
  const styles = theme === 'pink' 
    ? { bg: 'bg-pink-50/90', border: 'border-pink-200', text: 'text-pink-900', btn: 'bg-pink-500 hover:bg-pink-600', ring: 'focus:ring-pink-500' }
    : { bg: 'bg-[#0f172a]/90', border: 'border-blue-500/30', text: 'text-white', btn: 'bg-blue-600 hover:bg-blue-500', ring: 'focus:ring-blue-500' };

  const handleConfirm = () => {
    if (type === 'input') onConfirm(inputValue);
    else if (onConfirm) onConfirm();
    setInputValue('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl transform transition-all animate-in zoom-in-95 duration-300 ${styles.bg} ${styles.border}`}>
         
         <div className="flex flex-col items-center text-center gap-4">
            {/* ICONO ANIMADO */}
            <div className={`p-4 rounded-full bg-white/5 border ${styles.border} shadow-lg`}>
                {type === 'loading' && <Loader2 className={`animate-spin ${styles.text}`} size={32} />}
                {type === 'success' && <CheckCircle className="text-green-500 animate-pulse" size={32} />}
                {type === 'error' && <AlertTriangle className="text-red-500 animate-bounce" size={32} />}
                {type === 'input' && <Image className={styles.text} size={32} />}
            </div>

            <h3 className={`text-2xl font-black uppercase tracking-tight ${styles.text}`}>{title}</h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">{msg}</p>
            
            {/* INPUT FIELD (Solo si es tipo input) */}
            {type === 'input' && (
               <input 
                 autoFocus
                 type="text" 
                 placeholder="Pegar URL de la imagen aquí..." 
                 className={`w-full bg-black/30 border border-gray-600 rounded-xl p-4 text-white outline-none focus:ring-2 ${styles.ring} transition-all`}
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
               />
            )}

            {/* BOTONES */}
            {type !== 'loading' && (
              <div className="flex gap-3 w-full mt-4">
                 {type === 'confirm' || type === 'input' ? (
                    <>
                      <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold uppercase text-xs bg-gray-700/50 hover:bg-gray-700 text-gray-300 transition-colors">Cancelar</button>
                      <button onClick={handleConfirm} className={`flex-1 py-3 rounded-xl font-bold uppercase text-xs text-white shadow-lg ${styles.btn} transition-transform active:scale-95`}>Confirmar</button>
                    </>
                 ) : (
                    <button onClick={onClose} className={`w-full py-3 rounded-xl font-bold uppercase text-xs text-white shadow-lg ${styles.btn} transition-transform active:scale-95`}>Entendido</button>
                 )}
              </div>
            )}
         </div>
      </div>
    </div>
  );
};
export default SmartModal;