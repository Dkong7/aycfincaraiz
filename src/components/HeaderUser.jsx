import React from 'react';
import { getUserTheme } from '../utils/themeUtils';

const HeaderUser = ({ user }) => {
  // Obtenemos el tema basado en el email del usuario actual
  const theme = getUserTheme(user?.email);

  return (
    <div className={\lex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-500 \ border \\}>
      
      {/* 1. LOGO SVG DINÁMICO (Cambia de color según el rol) */}
      <svg 
        viewBox="0 0 100 100" 
        className="h-10 w-auto transition-colors duration-300"
        style={{ fill: theme.iconColor }} 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Aquí va tu Path del logo AYC */}
        <path d="M10 50 L50 10 L90 50 L90 90 L10 90 Z" />
      </svg>

      <div className="flex flex-col">
        {/* 2. BADGE DE RANGO (MAESTRO/MAESTRA/AGENTE) */}
        <span className={\	ext-xs font-black tracking-[0.2em] px-2 py-0.5 rounded uppercase w-fit \\}>
          {theme.role}
        </span>
        
        {/* 3. EMAIL DEL USUARIO */}
        <span className={\	ext-sm font-medium truncate max-w-[150px] \\}>
          {user?.email || 'Invitado'}
        </span>
      </div>

      {/* 4. AVATAR CONCEPTUAL (Placeholder visual) */}
      <div className={\w-10 h-10 rounded-full overflow-hidden border-2 \ bg-white/10 flex items-center justify-center\}>
        {/* Aquí cargaríamos la imagen real de Marilyn/Pixar/Radioacktiva */}
        <span className={\	ext-xs font-bold \\}>
            {theme.role[0]}
        </span>
      </div>
    </div>
  );
};

export default HeaderUser;
