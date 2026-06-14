import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { pb } from "../../api";
import { ArrowRight, ArrowLeft, Eye } from "lucide-react";
import { SuccessModal } from "../SuccessModal";
import { getUserTheme } from "../../utils/formatters";
import PropertyPreviewModal from "../admin/PropertyPreviewModal";

import TypeSelector from "./forms/TypeSelector";
import BasicInfo from "./forms/BasicInfo";
import FinancialInfo from "./forms/FinancialInfo";
import PrivateInfo from "./forms/PrivateInfo";
import GalleryUpload from "./forms/GalleryUpload";

import HouseForm from "../../modules/house/HouseForm";
import ApartmentForm from "../../modules/apartment/ApartmentForm";
import BodegaForm from "../../modules/bodega/BodegaForm";
import RuralForm from "../../modules/rural/RuralForm";
import LoteForm from "../../modules/lote/LoteForm";
import LocalForm from "../../modules/local/LocalForm";
import OficinaForm from "../../modules/oficina/OficinaForm";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const toIntStr = (val: any): string => {
  const cleaned = String(val ?? "0").replace(/[^\d]/g, "");
  const n = parseInt(cleaned, 10);
  return isNaN(n) ? "0" : String(n);
};

const toFloatStr = (val: any): string | null => {
  const n = parseFloat(String(val ?? ""));
  if (isNaN(n)) return null;
  return String(n);
};

const getCoordinates = async (
  address: string,
  neighborhood: string,
  municipality: string
) => {
  const city = municipality || "Bogotá";
  const normalizeAddress = (addr: string) => {
    if (!addr) return "";
    let cln = addr.toLowerCase();
    cln = cln.replace(/\b(no\.|nro|numero|#|-)\b/g, " ");
    cln = cln.replace(/(\d+)\s+([a-z])\b/g, "$1$2");
    cln = cln.replace(/\s+/g, " ").trim();
    return cln;
  };
  const cleanAddress = normalizeAddress(address);
  const attemptFetch = async (query: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await res.json();
      if (data && data.length > 0) return { lat: data[0].lat, lng: data[0].lon };
    } catch (e) {}
    return null;
  };

  let coords = null;
  if (cleanAddress && cleanAddress !== "n/a") {
    coords = await attemptFetch(`${cleanAddress}, ${neighborhood ? neighborhood + "," : ""} ${city}, Colombia`);
    if (coords) return coords;
    coords = await attemptFetch(`${cleanAddress}, ${city}, Colombia`);
    if (coords) return coords;
  }
  if (neighborhood && neighborhood.toLowerCase() !== "n/a") {
    coords = await attemptFetch(`${neighborhood}, ${city}, Colombia`);
    if (coords) return coords;
  }
  coords = await attemptFetch(`${city}, Colombia`);
  if (coords) return coords;
  return { lat: 4.6097, lng: -74.0817 };
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────────────────────────────────────

export default function CreatePropertyForm({ initialData, onSuccess }: any) {
  const [activeType, setActiveType] = useState<string | null>(
    initialData?.property_type || null
  );
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Publicación exitosa.");

  const [images, setImages] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [sortedPreviewUrls, setSortedPreviewUrls] = useState<string[]>([]);

  // Ref que siempre tiene el valor actual de deletedImages.
  // Evita el problema de stale closure cuando saveToBackend es llamado
  // desde dentro de PropertyPreviewModal (que puede haber capturado una
  // versión vieja del callback con deletedImages = []).
  const deletedImagesRef = useRef<string[]>([]);
  useEffect(() => {
    deletedImagesRef.current = deletedImages;
    if (deletedImages.length > 0) {
      console.log("📌 [Gallery] deletedImages state:", deletedImages);
    }
  }, [deletedImages]);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  // Captura de deletedImages en el momento exacto del submit,
  // antes de abrir el modal. Así handleFinalPublish siempre los tiene
  // sin importar cuántos re-renders ocurran mientras el modal está abierto.
  const pendingDeletesRef = useRef<string[]>([]);

  const userEmail = pb.authStore.model?.email;
  const { classes: s } = getUserTheme(userEmail);

  const { register, control, handleSubmit, watch, setValue, getValues, reset } =
    useForm({
      defaultValues: {
        property_type: "",
        stratum: "",
        municipality: "Bogotá",
        neighborhood: "",
        specs: { levels_list: [], has_rent: false, has_social: false },
        status: "borrador",
        admin_fee: 0,
        videos: [],
        ...initialData,
      },
    });

  useEffect(() => {
    register("videos");
  }, [register]);

  // Depende de initialData?.id (no del objeto) para no resetear deletedImages
  // en cada re-render del padre que pase un nuevo objeto con los mismos datos.
  useEffect(() => {
    if (initialData) {
      setImages([]);
      setDeletedImages([]);
      setSortedPreviewUrls([]);
      pendingDeletesRef.current = [];
      let parsedSpecs: any = {};

      if (typeof initialData.specs === "string") {
        try { parsedSpecs = JSON.parse(initialData.specs); } catch (e) {}
      } else {
        parsedSpecs = initialData.specs || {};
      }

      let initialVideos = Array.isArray(parsedSpecs.videos) ? parsedSpecs.videos : [];
      if (initialVideos.length === 0 && initialData.video_url) {
        initialVideos = [{ url: initialData.video_url, isCover: true }];
      }

      const cleanAdmin =
        parseInt(String(initialData.admin_fee || parsedSpecs.admin_fee || 0).replace(/[^\d]/g, ""), 10) || 0;

      reset({
        ...initialData,
        stratum: initialData.stratum || parsedSpecs.stratum || "",
        specs: parsedSpecs,
        admin_fee: cleanAdmin,
        videos: initialVideos,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.id]);

  const calculateCompleteness = (data: any) => {
    let points = 0;
    if (data.title?.length > 5) points++;
    if (data.municipality && data.neighborhood) points++;
    if (parseInt(toIntStr(data.price_cop), 10) > 0) points++;
    if (data.owner_name?.length > 2) points++;
    if (data.description?.length > 20) points++;
    if (sortedPreviewUrls.length > 0) points++;
    return (points / 6) * 100;
  };

  // ─── SAVE ────────────────────────────────────────────────────────────────
  // deletesToProcess se recibe como parámetro explícito para NO depender
  // de closures. Esto elimina de raíz el problema de stale closure.
  const saveToBackend = async (
    data: any,
    targetStatus: string,
    urlsOverride?: string[],
    deletesToProcess?: string[]
  ) => {
    const targetId = initialData?.id ?? "";
    const isUpdate =
      targetId.length === 15 &&
      /^[a-zA-Z0-9]{15}$/.test(targetId) &&
      !targetId.startsWith("AYC") &&
      !targetId.startsWith("DRAFT");

    const uniqueDeletes = [...new Set(deletesToProcess ?? deletedImagesRef.current)];

    console.log("═══════════════════════════════════════════════");
    console.log("🚀 saveToBackend");
    console.log("  targetId:", targetId, "| isUpdate:", isUpdate);
    console.log("  🗑️  Imágenes a eliminar:", uniqueDeletes);
    console.log("  📎 Nuevas imágenes a subir:", images.length);
    console.log("═══════════════════════════════════════════════");

    setLoading(true);
    try {
      // ══ PASO 1: Eliminar imágenes en un PATCH dedicado ══════════════════
      // Se hace en un request separado para que PocketBase procese "images-"
      // de forma aislada, sin interferencia de otros campos ni archivos nuevos.
      if (isUpdate && uniqueDeletes.length > 0) {
        // FIX: NO usar FormData para borrar múltiples archivos.
        // PocketBase (Go) solo procesa el primer valor cuando hay
        // múltiples entradas con la misma clave en multipart/form-data.
        // Al pasar un objeto plano, el SDK lo envía como JSON y PocketBase
        // procesa el array completo de "images-" correctamente.
        console.log("📡 PATCH #1: eliminando imágenes (JSON)...", uniqueDeletes);
        const deleteResult = await pb.collection("properties").update(targetId, {
          "images-": uniqueDeletes,
        });
        console.log("✅ PATCH #1 OK — images restantes:", deleteResult.images);
      }

      // ══ PASO 2: PATCH principal (campos + imágenes nuevas) ══════════════
      const formData = new FormData();

      formData.append("title", data.title || "Borrador sin título");
      formData.append("property_type", activeType || "Casa");
      formData.append("listing_type", data.listing_type || "Venta");
      formData.append("description", data.description || "");
      formData.append("status", targetStatus);
      formData.append("price_cop", toIntStr(data.price_cop));
      formData.append("price_usd", toIntStr(data.price_usd));

      let currentId = initialData?.ayc_id || "";
      if ((!currentId || currentId.startsWith("DRAFT")) && targetStatus === "publicado") {
        currentId = "AYC-" + Math.floor(Math.random() * 9000 + 1000);
      } else if (!currentId) {
        currentId = "DRAFT-" + Math.floor(Math.random() * 9000 + 1000);
      }
      formData.append("ayc_id", currentId);

      const videosList = Array.isArray(data.videos) ? data.videos : [];
      const coverVideo =
        videosList.find((v: any) => v.isCover && v.url) ||
        videosList.find((v: any) => v.url);
      if (coverVideo?.url) formData.append("video_url", coverVideo.url);

      const activeUrls = urlsOverride ?? sortedPreviewUrls;
      const galleryOrder = activeUrls
        .map((url) => {
          if (url.startsWith("blob:")) return null;
          try {
            const pathParts = new URL(url).pathname.split("/");
            return pathParts[pathParts.length - 1];
          } catch { return null; }
        })
        .filter(Boolean);

      const finalSpecs = {
        ...data.specs,
        stratum: data.stratum,
        gallery_order: galleryOrder,
        admin_fee: toIntStr(data.admin_fee),
        videos: videosList,
      };

      let specsJson: string;
      try {
        specsJson = JSON.stringify(finalSpecs);
      } catch {
        specsJson = JSON.stringify({ stratum: data.stratum, videos: videosList });
      }
      formData.append("specs", specsJson);
      formData.append("address_text", data.address_visible || "");
      formData.append("owner_name", data.owner_name || "");
      formData.append("owner_phone", data.owner_phone || "");
      formData.append("owner_email", data.owner_email || "");
      formData.append("address_private", data.address_private || "");

      if (data.specs?.legal_status && Array.isArray(data.specs.legal_status)) {
        formData.append("legal_status", data.specs.legal_status.join(", "));
      }

      const agentId = pb.authStore.model?.id;
      if (!isUpdate && agentId) formData.append("agent", agentId);

      const coords = await getCoordinates(data.address_private, data.neighborhood, data.municipality);
      if (coords) {
        const latStr = toFloatStr(coords.lat);
        const lngStr = toFloatStr(coords.lng);
        if (latStr !== null) formData.append("lat", latStr);
        if (lngStr !== null) formData.append("lng", lngStr);
      }

      if (images.length > 0) {
        images.forEach((file) => {
          if (file instanceof File) formData.append("images", file);
        });
      }

      let savedRecord;
      if (isUpdate) {
        console.log("📡 PATCH #2: guardando datos + nuevas imágenes...");
        savedRecord = await pb.collection("properties").update(targetId, formData);
        console.log("✅ PATCH #2 OK — images finales:", savedRecord.images);
      } else {
        savedRecord = await pb.collection("properties").create(formData);
        console.log("✅ CREATE OK — id:", savedRecord.id);
      }

      setImages([]);
      setDeletedImages([]);
      setSortedPreviewUrls([]);
      pendingDeletesRef.current = [];

      setSuccessMsg(
        targetStatus === "publicado"
          ? `¡Propiedad Publicada! Código: ${currentId}`
          : "Borrador Guardado"
      );
      setShowPreviewModal(false);
      setShowSuccessModal(true);
    } catch (e: any) {
      console.error("❌ Error en saveToBackend:", e);

      if (e?.status === 401) {
        alert("⚠️ Sesión expirada. Recarga la página (F5) e inicia sesión nuevamente.");
        return;
      }
      if (e?.status === 404 && isUpdate) {
        alert("❌ Error 404 al actualizar.\nVerifica que nginx pase PATCH a PocketBase.");
        return;
      }
      if (!e?.status && e?.message) {
        alert(`⚠️ ${e.message}`);
        return;
      }

      const pbResponse = e?.response ?? e?.data;
      const isApiRuleError =
        e?.status === 400 && pbResponse?.data && Object.keys(pbResponse.data).length === 0;

      if (isApiRuleError) {
        const op = isUpdate ? "Update" : "Create";
        alert(
          `🔒 API RULE BLOQUEÓ EL ${op.toUpperCase()}\n\n` +
          `1. Token expirado — recarga (F5)\n` +
          `2. Revisa la API Rule de "properties": debe ser @request.auth.id != ""`
        );
        return;
      }

      let errorDump = "";
      try {
        if (pbResponse?.data && Object.keys(pbResponse.data).length > 0) {
          errorDump = Object.entries(pbResponse.data)
            .map(([field, err]: any) => `• ${field}: ${err?.message || err?.code || JSON.stringify(err)}`)
            .join("\n");
        } else {
          errorDump = pbResponse
            ? JSON.stringify(pbResponse, null, 2)
            : JSON.stringify(e, Object.getOwnPropertyNames(e), 2);
        }
      } catch {
        errorDump = e?.message || "Error de red.";
      }
      alert(`🚨 POCKETBASE RECHAZÓ LOS DATOS 🚨\n\n${errorDump}`);
    } finally {
      setLoading(false);
    }
  };

  const onPreSubmit = (data: any) => {
    const currentVideos = getValues("videos") || [];
    if (!data.owner_name) {
      return alert("Falta el Nombre del Propietario. Este campo es obligatorio.");
    }

    // Capturar en el ref ANTES de abrir el modal.
    // A partir de aquí, handleFinalPublish los tiene garantizados.
    pendingDeletesRef.current = [...deletedImagesRef.current];
    console.log("📋 onPreSubmit — deletes capturados:", pendingDeletesRef.current);

    setPendingData({
      ...data,
      videos: currentVideos,
      specs: { ...data.specs, stratum: data.stratum },
      admin_fee: data.admin_fee,
    });
    setShowPreviewModal(true);
  };

  const handleFinalPublish = (reorderedUrls?: string[]) => {
    if (pendingData) {
      if (reorderedUrls && reorderedUrls.length > 0) setSortedPreviewUrls(reorderedUrls);
      const urlsToUse = reorderedUrls ?? sortedPreviewUrls;
      const isComplete = calculateCompleteness(pendingData) >= 50;
      saveToBackend(
        pendingData,
        isComplete ? "publicado" : "borrador",
        urlsToUse,
        pendingDeletesRef.current  // ← siempre explícito, nunca por closure
      );
    }
  };

  if (!activeType) {
    return (
      <TypeSelector
        onSelect={(t: string) => {
          setValue("property_type", t);
          setActiveType(t);
        }}
      />
    );
  }

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        message={successMsg}
        onClose={() => {
          setShowSuccessModal(false);
          if (onSuccess) onSuccess();
        }}
      />
      <form
        onSubmit={handleSubmit(onPreSubmit)}
        className={`max-w-7xl mx-auto p-8 rounded-3xl border space-y-8 animate-in slide-in-from-bottom-4 shadow-xl ${s.bg} ${s.border}`}
      >
        <div className="flex justify-between items-center border-b pb-6 gap-4">
          <Link to="/dashboard/inventario" className={`text-xs font-bold uppercase flex items-center gap-2 ${s.text}`}>
            <ArrowLeft size={16} /> Volver
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit(onPreSubmit)}
              className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold uppercase flex items-center gap-2 border"
            >
              <Eye size={14} /> Previsualizar
            </button>
            <h1 className="text-xl font-black uppercase ml-2">{activeType}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
              <BasicInfo register={register} setValue={setValue} getValues={getValues} s={s} />
            </div>
            <div className="bg-[#064e3b] border border-green-800 p-6 rounded-xl shadow-md">
              <FinancialInfo register={register} setValue={setValue} watch={watch} s={s} />
            </div>
            {activeType === "Casa" && (
              <div className="p-6 border-l-4 border-yellow-500 bg-yellow-50/10 rounded-xl">
                <HouseForm register={register} control={control} watch={watch} setValue={setValue} s={s} />
              </div>
            )}
            {activeType === "Apartamento" && (
              <div className="p-6 border-l-4 border-blue-500 bg-blue-50/10 rounded-xl">
                <ApartmentForm register={register} watch={watch} s={s} />
              </div>
            )}
            {activeType === "Bodega" && (
              <div className="p-6 border-l-4 border-amber-600 bg-amber-50/10 rounded-xl">
                <BodegaForm register={register} watch={watch} setValue={setValue} s={s} />
              </div>
            )}
            {["Finca", "Rural", "CasaCampo"].includes(activeType!) && (
              <div className="p-6 border-l-4 border-purple-500 bg-purple-50/10 rounded-xl">
                <RuralForm register={register} s={s} />
              </div>
            )}
            {["Lote", "Terreno"].includes(activeType!) && (
              <div className="p-6 border-l-4 border-gray-500 bg-gray-50/10 rounded-xl">
                <LoteForm register={register} watch={watch} setValue={setValue} s={s} />
              </div>
            )}
            {activeType === "Local" && (
              <div className="p-6 border-l-4 border-pink-500 bg-pink-50/10 rounded-xl">
                <LocalForm register={register} s={s} />
              </div>
            )}
            {activeType === "Oficina" && (
              <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50/10 rounded-xl">
                <OficinaForm register={register} s={s} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-red-100 bg-red-50/30 rounded-xl">
              <PrivateInfo register={register} activeType={activeType} initialData={initialData} />
            </div>
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white">
              <GalleryUpload
                setImages={setImages}
                setDeletedImages={setDeletedImages}
                onPreviewChange={setSortedPreviewUrls}
                initialData={initialData}
                register={register}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
            <button
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl font-black text-lg uppercase text-white bg-emerald-600 hover:bg-emerald-500 flex justify-between items-center group disabled:opacity-60"
            >
              {loading ? "Procesando..." : (
                <>
                  <span className="text-left">REVISAR Y<br />GUARDAR</span>
                  <ArrowRight size={24} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      {showPreviewModal && pendingData && (
        <PropertyPreviewModal
          data={pendingData}
          activeType={activeType}
          onClose={() => setShowPreviewModal(false)}
          onConfirm={handleFinalPublish}
          loading={loading}
          sortedPreviewUrls={sortedPreviewUrls}
        />
      )}
    </>
  );
}