import React from "react";
import { FileText, Receipt } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getFieldIcon, getFieldKey } from "../../config/propertyConfig";
import { formatValue, formatCurrency } from "../../utils/formatters";

export default function SpecsSection({ specs, theme, description }: any) {
  const { t, translateDynamic } = useApp();

  // Lista de campos para el resumen superior
  const summaryList = [
    { k: 'area_built', v: specs.area_built || specs.area_total, unit: 'm²' },
    { k: 'habs', v: specs.habs || specs.rooms },
    { k: 'baths', v: specs.baths || specs.bathrooms },
    { k: 'garages', v: specs.garages },
    { k: 'stratum', v: specs.stratum },
    { k: 'antiquity', v: specs.antiquity || specs.building_age, unit: t('años') || 'años' },
    { k: 'height', v: specs.height, unit: 'm' }
  ];

  return (
    <div className="space-y-8">
        {/* RESUMEN ICONOS */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {summaryList.map((item) => {
                if(!item.v) return null;
                return (
                    <div key={item.k} className="flex flex-col items-center justify-center p-2">
                        <div className={`${theme.text} mb-2`}>{getFieldIcon(item.k)}</div>
                        <span className="block font-black text-2xl text-gray-800">{formatValue(item.v)}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            {t(getFieldKey(item.k)) || getFieldKey(item.k)} {item.unit && `(${item.unit})`}
                        </span>
                    </div>
                )
            })}
        </div>

        {/* DESCRIPCIÓN */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-black uppercase text-[#0A192F] mb-6 flex items-center gap-2">
                <FileText size={24} className="text-gray-400"/> {t('det_desc') || "Descripción"}
            </h3>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed text-base">
                {translateDynamic(description) || "Sin descripción detallada disponible."}
            </p>
        </div>

        {/* FICHA TÉCNICA DETALLADA */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-black uppercase text-[#0A192F] mb-8 flex items-center gap-2">
                <Receipt size={24} className="text-gray-400"/> {t('det_features') || "Características"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(specs).map(([key, val]) => {
                    // 1. FILTROS BÁSICOS
                    if (!val || val === "false" || val === false) return null;
                    if (Array.isArray(val) && val.length === 0) return null;

                    // 2. BLOQUEAR OBJETOS ANIDADOS
                    if (typeof val === 'object' && !Array.isArray(val)) return null; 

                    // 3. FILTRO DE CAMPOS REPETIDOS
                    if (['rooms', 'habs', 'baths', 'bathrooms', 'garages', 'area_built', 'area_total', 'height', 'lat', 'lng', 'gallery_order'].includes(key)) return null;
                    
                    return (
                        <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2 px-2">
                            <span className="text-sm font-medium text-gray-500 flex items-center gap-2 capitalize">
                                <span className={`${theme.text} opacity-70`}>{getFieldIcon(key)}</span>
                                {t(getFieldKey(key)) || key.replace(/_/g, ' ')}
                            </span>
                            <span className="font-bold text-gray-800 text-sm text-right max-w-[50%]">
                                {formatValue(val)}
                            </span>
                        </div>
                    );
                })}
                
                {/* Admin */}
                {specs.admin && (
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 px-2">
                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <Receipt size={16} className={`${theme.text} opacity-70`}/> {t('det_admin') || "Administración"}
                        </span>
                        <span className="font-bold text-gray-800 text-sm">{formatCurrency(specs.admin)}</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}