import { useEffect, useState } from "react";
import { pb } from "../api";
import Hero from "../components/Hero";
// 1. IMPORTAR LA BARRA DE BÚSQUEDA
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
            // Cargar Hero (Inmuebles destacados)
            const heroResult = await pb.collection("properties").getList(1, 10, { 
                filter: "is_hero=true", 
                sort: "-created" 
            });
            setHeroProps(heroResult.items);
        } catch(e) { console.error(e); }
    };
    loadData();

    // TRM
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(res => res.json()).then(d => { if(d?.rates?.COP) setExchangeRate(d.rates.COP); })
      .catch(() => console.log("TRM default"));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO PRINCIPAL */}
      <Hero properties={heroProps} currency={currency} exchangeRate={exchangeRate} />
      
      {/* 2. BARRA DE BÚSQUEDA (Flotante sobre el final del Hero) */}
      <SearchBar />

      {/* 3. RESTO DE SECCIONES */}
      <FeaturedProperties />
      <ServicesIntro />
      <LatestBlog />
    </div>
  );
}