import { useState, useEffect } from 'react';
export const useTRM = () => {
  const [trm, setTrm] = useState(4000); // Fallback
  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/COP')
      .then(res => res.json())
      .then(data => setTrm(1 / data.rates.USD))
      .catch(() => setTrm(4000));
  }, []);
  return trm;
};
