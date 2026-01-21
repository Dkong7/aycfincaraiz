// src/utils/formatters.ts

// --- SECCIÓN 1: FORMATEADORES DE DATOS ---

export const formatCurrency = (value: string | number) => {
  const clean = Number(String(value || "0").replace(/\./g, ""));
  return new Intl.NumberFormat("es-CO").format(clean);
};

export const formatBoolean = (val: any) => {
  if (val === true) return "Sí";
  if (val === false) return "No";
  if (!val) return "-";
  return val;
};

export const formatValue = (val: any) => {
  if (val === true || val === false) return formatBoolean(val);
  if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "Ninguna";
  return val || "-";
};

// --- SECCIÓN 2: TEMA DE USUARIO (User Theme Logic) ---

interface UserTheme {
  role: string;
  classes: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
  avatarConcept: string;
  iconColor: string;
}

export const getUserTheme = (email?: string): UserTheme => {
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

  // CASO 2: ALFONSO/DKONG (Maestro / Pixar / Tierra)
  if (safeEmail.includes('alf') || safeEmail.includes('dkong')) {
    return {
      role: 'MAESTRO',
      // Paleta Tierra: Fondo Hueso, Texto Café, Detalles Verde Oliva y Amarillo Quemado
      classes: {
        bg: 'bg-[#F4F1EA]',       // Fondo Hueso/Lino (Claro y legible)
        text: 'text-[#3E2723]',   // Texto Café Profundo
        border: 'border-[#556B2F]', // Borde Verde Oliva
        badge: 'bg-[#D97706]/20 text-[#D97706]' // Badge Amarillo Quemado
      },
      avatarConcept: 'Pixar 3D Character',
      iconColor: '#D97706' // Icono Amarillo Quemado
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