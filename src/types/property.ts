export interface Property {
  id: string;
  collectionId: string;
  ayc_id: string;          // AYC-1001
  title: string;
  price_cop: number;       // Campo real DB
  price_usd: number;       // Campo real DB
  property_type: string;   // Casa, Apartamento
  listing_type: string;    // Venta, Arriendo
  municipality: string;    // O address según tu DB
  neighborhood?: string;
  images: string[];
  is_hero: boolean;
  is_opportunity: boolean;
  is_ayc_favorite: boolean;
  description?: string;
}
