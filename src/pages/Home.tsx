import { useEffect, useState } from "react";
import { pb } from "../api";
import Hero from "../components/Hero";
import { SearchBar } from "../components/search/SearchBar"; 
import { FeaturedProperties, ServicesIntro, LatestBlog } from "../components/sections/HomeSections";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { currency } = useApp();
  
  const [heroProps, setHeroProps] = useState<any[]>([]);
  const [exchangeRate, setExchangeRate] = useState(4400);

  useEffect(() => {
    const loadData = async () => {
        try {
            // 1. Intentar cargar Inmuebles Destacados (Hero)
            let heroResult = await pb.collection("properties").getList(1, 10, { 
                filter: "is_hero=true", 
                sort: "-created" 
            });

            // 2. FALLBACK: Si no hay destacados, cargar los últimos 5 agregados
            if (heroResult.items.length === 0) {
                heroResult = await pb.collection("properties").getList(1, 5, { 
                    sort: "-created" 
                });
            }

            setHeroProps(heroResult.items);
        } catch(e) { console.error("Error cargando Home:", e); }
    };
    loadData();

    // TRM
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(res => res.json()).then(d => { if(d?.rates?.COP) setExchangeRate(d.rates.COP); })
      .catch(() => console.log("TRM default"));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Pasamos los inmuebles al Hero */}
      <Hero properties={heroProps} currency={currency} exchangeRate={exchangeRate} />
      
      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Resto de secciones */}
      <FeaturedProperties />
      <ServicesIntro />
      <LatestBlog />
    </div>
  );
}