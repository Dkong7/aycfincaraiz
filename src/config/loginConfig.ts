// src/config/loginConfig.ts

export interface LoginTheme {
  mode: "secret" | "standard";
  theme: "claudia" | "alfonso" | "agent";
  bg: string;
  container: string;
  textTitle: string;
  textLabel: string;
  input: string;
  btn: string;
  title: string;
  ghostUser: string | null;
  punishUrl: string;
  icon: string;
}

export const getLoginConfig = (pathname: string): LoginTheme => {
  // 1. CLAUDIA
  if (pathname === "/claclacla") return {
      mode: "secret",
      theme: "claudia", 
      bg: "bg-[#fff0f5]", 
      container: "bg-white/90 border-pink-200 shadow-pink-200/50",
      textTitle: "text-pink-600", 
      textLabel: "text-pink-400",
      input: "bg-white border-pink-200 focus:border-pink-500 text-pink-700 placeholder-pink-300",
      btn: "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-300",
      title: "HOLA MA'",
      ghostUser: "claudia@ayc.com",
      punishUrl: "https://www.marilynmanson.com",
      icon: "🌸"
  };

  // 2. ALFONSO (PALETA TIERRA CORREGIDA)
  if (pathname === "/alfalfalf") return {
      mode: "secret",
      theme: "alfonso", 
      // Fondo claro tipo "Papel Antiguo/Lino" para legibilidad
      bg: "bg-[#F4F1EA]", 
      // Tarjeta blanca con borde Café suave
      container: "bg-white border-[#3E2C20]/20 shadow-xl shadow-[#3E2C20]/10",
      // Títulos en Café Profundo
      textTitle: "text-[#3E2C20]", 
      // Etiquetas en Verde Oliva Oscuro
      textLabel: "text-[#556B2F]",
      // Inputs crema muy suave con borde café y foco en Amarillo Quemado
      input: "bg-[#FAF9F6] border-[#8B4513]/30 focus:border-[#D97706] text-[#3E2723] placeholder-[#8B4513]/40",
      // Botón Amarillo Quemado (Amber) con hover a Café
      btn: "bg-[#D97706] hover:bg-[#92400E] text-white shadow-md",
      title: "HOLA PA'",
      ghostUser: "alfonso@ayc.com",
      punishUrl: "https://www.pixar.com",
      icon: "🦁"
  };

  // 3. AGENTES (Default)
  return {
      mode: "standard",
      theme: "agent", 
      bg: "bg-[#0A192F]", 
      container: "bg-white border-gray-200 shadow-2xl",
      textTitle: "text-[#0A192F]", 
      textLabel: "text-gray-500",
      input: "bg-gray-50 border-gray-300 focus:border-[#009B4D] text-[#0A192F] placeholder-gray-400",
      btn: "bg-[#009B4D] hover:bg-[#007a3d] text-white shadow-lg",
      title: "PORTAL AGENTES",
      ghostUser: null, 
      punishUrl: "/",
      icon: "🛡️"
  };
};