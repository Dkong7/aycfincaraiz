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
    // --- AGREGADOS PARA QUE EL FORMULARIO FUNCIONE ---
    input: string;
    label: string;
    btn: string;
    borderDashed: string;
    btnAdd: string;
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
      classes: {
        bg: 'bg-[#FFF0F5]', 
        text: 'text-[#D81B60]',
        border: 'border-[#F8BBD0]',
        badge: 'bg-[#FCE4EC] text-[#D81B60]',
        // Clases Formulario
        input: "focus:ring-pink-500 border-pink-200 bg-white",
        label: "text-pink-600",
        btn: "bg-pink-600 hover:bg-pink-700",
        borderDashed: "border-pink-300",
        btnAdd: "bg-pink-100 text-pink-700 hover:bg-pink-200"
      },
      avatarConcept: 'Marilyn Monroe Style',
      iconColor: '#D81B60' 
    };
  }

  // CASO 2: ALFONSO/DKONG (Maestro / Pixar / Tierra)
  if (safeEmail.includes('alf') || safeEmail.includes('dkong')) {
    return {
      role: 'MAESTRO',
      classes: {
        bg: 'bg-[#F4F1EA]',       // Fondo Hueso/Lino
        text: 'text-[#3E2723]',   // Texto Café Profundo
        border: 'border-[#556B2F]', // Borde Verde Oliva
        badge: 'bg-[#D97706]/20 text-[#D97706]',
        // Clases Formulario
        input: "focus:ring-[#8B5A2B] border-[#D9CBB8] bg-white",
        label: "text-[#8B5A2B]",
        btn: "bg-[#5C4033] hover:bg-[#3E2C20]",
        borderDashed: "border-[#8B5A2B]/30",
        btnAdd: "bg-[#E8DCCA] text-[#5C4033] hover:bg-[#D9CBB8]"
      },
      avatarConcept: 'Pixar 3D Character',
      iconColor: '#D97706'
    };
  }

  // CASO 3: AGENTES (Radioacktiva / Rock / Naranja)
  return {
    role: 'AGENTE',
    classes: {
      bg: 'bg-white', // CAMBIO SEGURO: Usamos blanco para el form para no romper inputs
      text: 'text-gray-800',
      border: 'border-gray-200',
      badge: 'bg-blue-100 text-blue-700',
      // Clases Formulario (Estilo Corporativo Blue)
      input: "focus:ring-blue-500 border-gray-300 bg-white",
      label: "text-gray-500",
      btn: "bg-blue-600 hover:bg-blue-700",
      borderDashed: "border-gray-300",
      btnAdd: "bg-gray-100 text-gray-700 hover:bg-gray-200"
    },
    avatarConcept: 'Agent Style',
    iconColor: '#2563EB'
  };
};