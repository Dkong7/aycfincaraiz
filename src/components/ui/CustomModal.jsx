import React from 'react';
import { X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const CustomModal = ({ isOpen, onClose, type, message, theme }) => {
  if (!isOpen) return null;

  const styles = theme === 'pink' 
    ? { bg: 'bg-pink-50', border: 'border-pink-200', title: 'text-pink-600', btn: 'bg-pink-500 hover:bg-pink-600' }
    : { bg: 'bg-[#0f172a]', border: 'border-blue-500/30', title: 'text-blue-400', btn: 'bg-blue-600 hover:bg-blue-500' };

  const icons = {
    success: <CheckCircle className="text-green-500" size={40} />,
    error: <AlertTriangle className="text-red-500" size={40} />,
    loading: <Loader2 className={`animate-spin ${styles.title}`} size={40} />
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-96 p-6 rounded-2xl border shadow-2xl transform scale-100 transition-all ${styles.bg} ${styles.border}`}>
         <div className="flex flex-col items-center text-center gap-4">
            {icons[type]}
            <h3 className={`text-xl font-black uppercase ${styles.title}`}>
               {type === 'loading' ? 'Procesando...' : type === 'error' ? 'Atención' : 'Éxito'}
            </h3>
            <p className={theme === 'pink' ? 'text-gray-600' : 'text-gray-300'}>{message}</p>
            
            {type !== 'loading' && (
              <button onClick={onClose} className={`mt-4 px-8 py-2 rounded-full text-white font-bold uppercase tracking-widest ${styles.btn}`}>
                 Aceptar
              </button>
            )}
         </div>
      </div>
    </div>
  );
};
export default CustomModal;