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

  // 2. ALFONSO
  if (pathname === "/alfalfalf") return {
      mode: "secret",
      theme: "alfonso", 
      bg: "bg-[#0a0a0a]", 
      container: "bg-[#111] border-amber-900/30 shadow-amber-900/20",
      textTitle: "text-amber-600", 
      textLabel: "text-amber-700",
      input: "bg-black border-amber-900/50 focus:border-amber-500 text-amber-500 placeholder-amber-900",
      btn: "bg-amber-700 hover:bg-amber-600 text-white shadow-amber-900/50",
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