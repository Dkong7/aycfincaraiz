import { useEffect, useState } from "react";
import { pb } from "../api";
import Hero from "../components/Hero";
import { FeaturedProperties, ServicesIntro, LatestBlog } from "../components/sections/HomeSections";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  // SOLUCIÓN: Definimos el tipo como any[] o Property[] para evitar el error "never"
  const [heroProps, setHeroProps] = useState<any[]>([]);
  const [exchangeRate, setExchangeRate] = useState(4400);
  const currency = language === "EN" ? "USD" : "COP";

  useEffect(() => {
    // Cargar Hero
    const loadHero = async () => {
        try {
            const result = await pb.collection("properties").getList(1, 10, { filter: "is_hero=true", sort: "-created", requestKey: null });
            if(result.items.length) setHeroProps(result.items);
            else {
                const fallback = await pb.collection("properties").getList(1, 5, { sort: "-created", requestKey: null });
                setHeroProps(fallback.items);
            }
        } catch(e) { console.error(e); }
    };
    loadHero();

    // TRM
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(res => res.json()).then(d => { if(d?.rates?.COP) setExchangeRate(d.rates.COP); })
      .catch(() => console.log("TRM default"));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Hero properties={heroProps} currency={currency} exchangeRate={exchangeRate} />
      <FeaturedProperties />
      <ServicesIntro />
      <LatestBlog />
    </div>
  );
}
