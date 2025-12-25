import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useApp } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, faBath, faRulerCombined, faCar, faMapMarkerAlt, 
  faCheckCircle, faArrowLeft, faHashtag 
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const PropertyDetail = () => {
  const { id } = useParams();
  const { t, formatPrice, lang } = useApp();
  const [prop, setProp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProp = async () => {
      setLoading(true);
      if (!id) return;
      
      const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
      
      if (error) console.error("Error fetching prop:", error);
      if (data) setProp(data);
      
      setLoading(false);
    };
    fetchProp();
  }, [id]);

  const getLoc = (es: any, en: any) => (lang === 'EN' && en) ? en : es;

  if (loading) return <div className="h-screen flex items-center justify-center text-blue-900 font-bold">...</div>;
  if (!prop) return <div className="h-screen flex items-center justify-center text-red-500">Not Found.</div>;

  const features = getLoc(prop.features, prop.features_en) || prop.features;

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* NAV BACK */}
        <Link to="/inmuebles" className="inline-flex items-center text-gray-500 hover:text-blue-900 font-bold mb-6 text-sm transition">
           <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> {lang === 'EN' ? 'Back to listings' : 'Volver al listado'}
        </Link>

        {/* HEADER TITLE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-6">
           <div>
              <span className="bg-blue-100 text-blue-900 text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">
                 {getLoc(prop.property_type, prop.property_type_en)} • {getLoc(prop.offer_type, prop.offer_type_en)}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{getLoc(prop.title, prop.title_en)}</h1>
              <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                 <span className="flex items-center gap-1"><FontAwesomeIcon icon={faMapMarkerAlt} /> {getLoc(prop.city, prop.city_en)}, {prop.neighborhood}</span>
                 <span className="flex items-center gap-1 text-blue-900 font-bold"><FontAwesomeIcon icon={faHashtag} /> ID: {prop.listing_id}</span>
              </div>
           </div>
           <div className="mt-4 md:mt-0 text-right">
              <p className="text-4xl font-bold text-blue-900">{formatPrice(prop.price)}</p>
              {prop.admin_price > 0 && <p className="text-gray-500 text-sm">Admin: {formatPrice(prop.admin_price)}</p>}
           </div>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
           <div className="lg:col-span-2 h-[450px] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <img src={prop.images?.[activeImg]} className="w-full h-full object-cover" alt="Main" />
           </div>
           <div className="flex flex-col gap-4 h-[450px] overflow-y-auto pr-2">
              {prop.images?.map((img: string, idx: number) => (
                 <img 
                   key={idx} 
                   src={img} 
                   onClick={() => setActiveImg(idx)}
                   className={`w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition border-4 ${activeImg === idx ? 'border-blue-900' : 'border-transparent'}`} 
                 />
              ))}
           </div>
        </div>

        {/* DETAILS CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* INFO IZQUIERDA */}
           <div className="lg:col-span-2 space-y-10">
              
              {/* RESUMEN */}
              <div className="bg-slate-50 p-6 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-slate-200">
                 <div>
                    <FontAwesomeIcon icon={faRulerCombined} className="text-2xl text-blue-900 mb-2" />
                    <p className="text-xs text-gray-500 uppercase">{t("det_area")}</p>
                    <p className="font-bold">{prop.area_built} m²</p>
                 </div>
                 <div>
                    <FontAwesomeIcon icon={faBed} className="text-2xl text-blue-900 mb-2" />
                    <p className="text-xs text-gray-500 uppercase">{t("det_rooms")}</p>
                    <p className="font-bold">{prop.rooms}</p>
                 </div>
                 <div>
                    <FontAwesomeIcon icon={faBath} className="text-2xl text-blue-900 mb-2" />
                    <p className="text-xs text-gray-500 uppercase">{t("det_baths")}</p>
                    <p className="font-bold">{prop.bathrooms}</p>
                 </div>
                 <div>
                    <FontAwesomeIcon icon={faCar} className="text-2xl text-blue-900 mb-2" />
                    <p className="text-xs text-gray-500 uppercase">Parking</p>
                    <p className="font-bold">{prop.parking}</p>
                 </div>
              </div>

              {/* DESCRIPCIÓN */}
              <div>
                 <h2 className="text-xl font-bold text-gray-900 mb-4">{t("det_desc")}</h2>
                 <p className="text-gray-600 leading-relaxed whitespace-pre-line text-justify">
                    {getLoc(prop.description, prop.description_en)}
                 </p>
              </div>

              {/* CARACTERÍSTICAS */}
              {features && features.length > 0 && (
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t("det_features")}</h2>
                    <ul className="grid grid-cols-2 gap-3">
                       {features.map((feat: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded">
                             <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> {feat}
                          </li>
                       ))}
                    </ul>
                 </div>
              )}
           </div>

           {/* SIDEBAR CONTACTO */}
           <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 sticky top-24">
                 <div className="text-center mb-6">
                    <img src="/ayclogo.svg" className="h-16 mx-auto mb-4" />
                    <p className="text-sm text-gray-500">{lang === 'EN' ? 'Interested?' : '¿Te interesa?'}</p>
                    <p className="font-bold text-blue-900 text-lg">ID: {prop.listing_id}</p>
                 </div>

                 <a 
                    href={`https://wa.me/573000000000?text=${lang === 'EN' ? 'Hello, I am interested in property ' + prop.listing_id : 'Hola, me interesa el inmueble ' + prop.listing_id}`}
                    target="_blank"
                    className="block w-full bg-green-500 text-white font-bold py-3 rounded-lg text-center hover:bg-green-600 transition mb-3 shadow-md flex items-center justify-center gap-2"
                 >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-xl" /> {t("det_whatsapp")}
                 </a>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
