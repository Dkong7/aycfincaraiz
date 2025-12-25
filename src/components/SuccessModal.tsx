import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal = ({ isOpen, onClose, message }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-2 border-green-500/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,255,0,0.2)] text-center transform transition-all scale-100 max-w-sm w-full relative overflow-hidden">
        
        {/* EFECTO DE FONDO (Humo/Luz) */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none"></div>

        {/* LOGO A&C ANIMADO (Custom #AYC) */}
        <div className="relative z-10 mb-6">
           <img 
             src="/ayclogo.svg" 
             alt="A&C Success" 
             className="h-20 w-auto mx-auto brightness-0 invert drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] animate-pulse" 
           />
        </div>

        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2 relative z-10">
          ¡Operación Exitosa!
        </h2>
        <p className="text-slate-400 text-sm mb-6 relative z-10">{message}</p>

        <button 
          onClick={onClose} 
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider shadow-lg transition-all transform hover:scale-105 relative z-10"
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;