import { useState, useEffect } from 'react';

export const useTRM = (): number => {
  const [trm, setTrm] = useState<number>(0); 

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates.COP) {
            setTrm(data.rates.COP);
        } else {
            setTrm(4200); // Fallback
        }
      })
      .catch((err) => {
        console.error("Error TRM:", err);
        setTrm(4200); 
      });
  }, []);

  return trm;
};