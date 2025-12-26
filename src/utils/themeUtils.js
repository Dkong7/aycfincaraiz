export const getUserTheme = (email) => {
  const safeEmail = email ? email.toLowerCase() : '';

  // CASO 1: CLAUDIA (Maestra / Marilyn / Pastel)
  if (safeEmail.includes('cla')) {
    return {
      role: 'MAESTRA',
      // Paleta Pastel: Fondo Rosa Suave, Texto Rosa Fuerte
      classes: {
        bg: 'bg-[#FFF0F5]', 
        text: 'text-[#D81B60]',
        border: 'border-[#F8BBD0]',
        badge: 'bg-[#FCE4EC] text-[#D81B60]'
      },
      avatarConcept: 'Marilyn Monroe Style',
      iconColor: '#D81B60' 
    };
  }

  // CASO 2: ALFONSO/DKONG (Maestro / Pixar / Neon Tech)
  if (safeEmail.includes('alf') || safeEmail.includes('dkong')) {
    return {
      role: 'MAESTRO',
      // Paleta Matrix/Tech: Fondo Oscuro, Texto Verde Neón
      classes: {
        bg: 'bg-gray-950', 
        text: 'text-[#39FF14]',
        border: 'border-[#39FF14]',
        badge: 'bg-[#39FF14]/10 text-[#39FF14]'
      },
      avatarConcept: 'Pixar 3D Character',
      iconColor: '#39FF14'
    };
  }

  // CASO 3: AGENTES (Radioacktiva / Rock / Naranja)
  return {
    role: 'AGENTE',
    // Paleta Radioacktiva: Fondo Negro, Texto Naranja Energía
    classes: {
      bg: 'bg-black', 
      text: 'text-[#FFA500]',
      border: 'border-[#FFA500]',
      badge: 'bg-[#FFA500]/20 text-[#FFA500]'
    },
    avatarConcept: 'Radioacktiva Rock',
    iconColor: '#FFA500'
  };
};
