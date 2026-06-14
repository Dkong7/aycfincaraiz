import { useState, useEffect } from 'react';

export const useTRM = (): number => {
  // Inicializamos con el valor de fallback que mencionas por si hay latencia inicial
  const [trm, setTrm] = useState<number>(3586.53);

  useEffect(() => {
    const fetchTRM = async () => {
      try {
        // 1. Intento primario: API Oficial del Gobierno de Colombia (Datos Abiertos)
        const res = await fetch('https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=1&$order=vigenciadesde%20DESC');
        
        if (!res.ok) throw new Error("Fallo en API oficial");
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0 && data[0].valor) {
          setTrm(Number(data[0].valor));
          return;
        }

        // 2. Intento secundario defensivo: Fallback a mercado internacional
        const fallbackRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const fallbackData = await fallbackRes.json();
        
        if (fallbackData?.rates?.COP) {
          setTrm(Number(fallbackData.rates.COP));
        }
      } catch (err) {
        console.error("Error actualizando TRM:", err);
        // En caso de fallo total, conservamos el último estado válido o el inicial
      }
    };

    // Ejecución inmediata al montar
    fetchTRM();

    // Ejecución programada: Actualiza en segundo plano cada 12 horas (43200000 ms)
    const intervalId = setInterval(fetchTRM, 12 * 60 * 60 * 1000);

    // Limpieza estricta del intervalo para evitar fugas de memoria si el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return trm;
};