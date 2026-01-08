import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../api";
import { 
  LayoutGrid, PlusCircle, LogOut, Edit, Trash, Image as ImageIcon, 
  Save, ArrowLeft, BookOpen, Loader2, X, CheckCircle, Menu
} from "lucide-react";
import type { RecordModel } from "pocketbase";

// 1. IMPORTACIÓN CORREGIDA
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';

// 2. ACCESO SEGURO A QUILL Y REGISTRO DE MÓDULO
const Quill = (ReactQuill as any).Quill;
if (Quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
}

export default function DashboardBlog() {
  const [view, setView] = useState("LIST");
  const [posts, setPosts] = useState<RecordModel[]>([]);
  const [currentPost, setCurrentPost] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [contentBody, setContentBody] = useState("");
  
  // Estado para el Modal de Confirmación
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Estado temporal para datos del formulario antes de guardar
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  // Estado para menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();
  
  const theme = localStorage.getItem("ayc_theme") || "agent";
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

  // Estilos
  const s = ((t) => {
      if (t === "alfonso") return { 
          mainBg: "bg-[#F4F1EA]", sidebar: "bg-[#2C1B18] border-[#3E2723]", sidebarText: "text-[#D7CCC8]", 
          activeBtn: "bg-[#3E2723] text-[#FFB74D] border border-[#5D4037]", 
          card: "bg-[#FDFBF7] border-[#8D6E63] text-[#3E2723]", 
          input: "bg-white border-[#D7CCC8] text-[#3E2723] focus:border-[#8D6E63]",
          btnPrimary: "bg-[#3E2723] hover:bg-[#5D4037] text-[#FFB74D]"
      };
      if (t === "claudia") return {
          mainBg: "bg-[#FFF0F5]", sidebar: "bg-white border-pink-100", sidebarText: "text-pink-600",
          activeBtn: "bg-pink-100 text-pink-700",
          card: "bg-white border-pink-100 text-gray-800",
          input: "bg-pink-50/30 border-pink-200 text-gray-800 focus:border-pink-400",
          btnPrimary: "bg-pink-600 hover:bg-pink-700 text-white"
      };
      return { 
          mainBg: "bg-gray-100", sidebar: "bg-[#0A192F] border-white/10", sidebarText: "text-gray-300", 
          activeBtn: "bg-[#009B4D] text-white shadow-lg", 
          card: "bg-white border-gray-200 text-gray-900", 
          input: "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500",
          btnPrimary: "bg-[#0A192F] hover:bg-[#112] text-white"
      };
  })(theme);

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try {
       const res = await pb.collection("posts").getList(1, 50, { sort: "-created" });
       setPosts(res.items);
    } catch (e) { console.error("Error cargando blog", e); }
  };

  const openEditor = (post?: RecordModel) => {
      setCurrentPost(post || null);
      setContentBody(post?.content || "");
      setPendingFormData(null); 
      setShowConfirmModal(false);
      setIsMobileMenuOpen(false); // Cerrar menú al abrir editor
      
      if (post?.image) {
          setHeroPreview(`${PB_URL}/api/files/${post.collectionId}/${post.id}/${post.image}`);
      } else {
          setHeroPreview(null);
      }
      setView("EDITOR");
  };

  // --- MANEJADOR DE IMÁGENES ---
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        try {
          setUploadingImg(true);
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection(true);

          const formData = new FormData();
          formData.append('field', file); 
          
          const record = await pb.collection('media').create(formData);
          
          let filename = record.field;
          if (Array.isArray(filename)) filename = filename[0];
          if (!filename) filename = record.image || record.file;

          const url = `${PB_URL}/api/files/${record.collectionId}/${record.id}/${filename}`;

          if (quill) {
            const index = range ? range.index : quill.getLength();
            quill.insertEmbed(index, 'image', url);
            quill.setSelection(index + 1);
          }
        } catch (error: any) {
          console.error(error);
          alert('Error: ' + error.message);
        } finally {
          setUploadingImg(false);
        }
      }
    };
  }, [PB_URL]);

  const modules = useMemo(() => ({
    blotFormatter: { overlay: { style: { border: '2px solid #009B4D' } } },
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: { image: imageHandler }
    }
  }), [imageHandler]);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setHeroPreview(URL.createObjectURL(file));
  };

  // --- PASO 1: PREPARAR PREVIEW ---
  const handlePreSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentBody || contentBody === "<p><br></p>") {
        alert("El cuerpo del artículo no puede estar vacío.");
        return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.set("content", contentBody); 

    setPendingFormData(formData); 
    setShowConfirmModal(true); 
  };

  // --- PASO 2: GUARDADO FINAL ---
  const handleFinalConfirm = async () => {
    if (!pendingFormData) return;
    
    setLoading(true);
    try {
        if (pb.authStore.model?.id) {
            pendingFormData.append("agent", pb.authStore.model.id);
        }

        if (currentPost?.id) {
            await pb.collection("posts").update(currentPost.id, pendingFormData);
        } else {
            await pb.collection("posts").create(pendingFormData);
        }
        setShowConfirmModal(false);
        setPendingFormData(null);
        setView("LIST");
        loadPosts();
    } catch (err: any) {
        alert("Error al guardar: " + err.message);
        setShowConfirmModal(false);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      if(confirm("¿Eliminar definitivamente?")) {
          await pb.collection("posts").delete(id);
          setPosts(prev => prev.filter(p => p.id !== id));
      }
  };

  const handleNav = (targetView: string) => {
      setView(targetView);
      if (targetView === "LIST") setCurrentPost(null);
      setIsMobileMenuOpen(false);
  };

  return (
    <div className={`flex flex-col md:flex-row font-sans transition-colors duration-500 ${s.mainBg} min-h-screen md:h-screen md:overflow-hidden`}>
      
      {/* --- HEADER MÓVIL (Sticky) --- */}
      <header className={`md:hidden flex justify-between items-center p-4 border-b transition-colors duration-500 bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50`}>
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#0A192F] rounded flex items-center justify-center text-white font-black text-xs">BLOG</div>
             <h1 className="font-black text-lg tracking-tighter text-[#0A192F]">PANEL</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#0A192F] p-2 hover:bg-gray-100 rounded-lg transition-colors">
             <Menu size={24} />
          </button>
      </header>

      {/* --- BACKDROP MÓVIL --- */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-[60] md:hidden backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* --- SIDEBAR (DRAWER EN MOBILE) --- */}
      <aside className={`
          fixed md:relative inset-y-0 left-0 z-[70] 
          w-72 md:w-64 flex flex-col py-6 border-r shadow-2xl md:shadow-none
          transition-transform duration-300 ease-out transform 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          ${s.sidebar}
      `}>
         <div className="md:hidden absolute top-4 right-4">
            <button onClick={() => setIsMobileMenuOpen(false)} className={`${s.sidebarText} opacity-70 hover:opacity-100 p-2`}>
                <X size={24}/>
            </button>
         </div>

         <div className="px-6 mb-10 mt-2 md:mt-0">
            <h1 className={`font-black text-2xl tracking-tighter ${s.sidebarText}`}>AYC BLOG</h1>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1 text-gray-400">PANEL DE CONTROL</p>
         </div>
         <nav className="px-3 space-y-1 flex-1">
            <button onClick={() => navigate("/dashboard/inventario")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}>
               <ArrowLeft size={18}/> Volver a Inventario
            </button>
            <div className="h-px bg-white/10 my-2 mx-4"></div>
            <button onClick={() => handleNav("LIST")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${view === "LIST" ? s.activeBtn : `hover:opacity-80 ${s.sidebarText}`}`}>
               <LayoutGrid size={18}/> Todos los Artículos
            </button>
            <button onClick={() => openEditor()} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${view === "EDITOR" ? s.activeBtn : `hover:opacity-80 ${s.sidebarText}`}`}>
               <PlusCircle size={18}/> Escribir Nuevo
            </button>
         </nav>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-4 md:p-8 w-full relative z-0 md:overflow-y-auto">
         
         {/* VISTA LISTA */}
         {view === "LIST" && (
            <div className={`rounded-xl shadow-lg border overflow-hidden ${s.card}`}>
               <div className="p-4 md:p-6 border-b border-gray-200/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="font-black text-lg md:text-xl uppercase flex items-center gap-2">
                      <BookOpen className="md:hidden" size={20}/> Artículos
                  </h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/10">{posts.length} Posts</span>
               </div>
               
               {/* Tabla Scrollable en Mobile */}
               <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px] md:min-w-0">
                     <thead className="bg-black/5 text-[10px] font-bold uppercase">
                        <tr>
                            <th className="p-4">Artículo</th>
                            <th className="p-4">Autor</th>
                            <th className="p-4">Fecha</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200/20">
                        {posts.map(p => (
                           <tr key={p.id} className="hover:bg-black/5 transition-colors">
                              <td className="p-4 flex items-center gap-4">
                                 <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden shrink-0 relative border border-gray-300">
                                    {p.image ? (
                                       <img src={`${PB_URL}/api/files/${p.collectionId}/${p.id}/${p.image}`} className="w-full h-full object-cover"/>
                                    ) : (
                                       <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={20}/></div>
                                    )}
                                 </div>
                                 <span className="font-bold text-sm line-clamp-2">{p.title}</span>
                              </td>
                              <td className="p-4 text-sm opacity-70">{p.author}</td>
                              <td className="p-4 text-xs font-mono opacity-60">{new Date(p.created).toLocaleDateString()}</td>
                              <td className="p-4 text-right flex justify-end gap-2">
                                 <button onClick={() => openEditor(p)} className="p-2 hover:bg-blue-100 text-blue-600 rounded"><Edit size={16}/></button>
                                 <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-100 text-red-600 rounded"><Trash size={16}/></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         )}

         {/* VISTA EDITOR */}
         {view === "EDITOR" && (
            <div className={`max-w-5xl mx-auto rounded-3xl shadow-xl border p-4 md:p-8 bg-white ${s.card}`}>
               <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200/20">
                  <h2 className="text-xl md:text-2xl font-black uppercase flex items-center gap-2"><BookOpen size={24}/> {currentPost ? "Editar" : "Nuevo"}</h2>
                  <button onClick={() => setView("LIST")} className="text-xs font-bold uppercase opacity-50 hover:opacity-100 p-2">Cancelar</button>
               </div>

               <form onSubmit={handlePreSave} className="space-y-6 md:space-y-8">
                  {/* METADATA */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                     <div className="md:col-span-2 space-y-4 md:space-y-6">
                         <div>
                            <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-70">Título</label>
                            <input name="title" defaultValue={currentPost?.title} required className={`w-full p-3 md:p-4 rounded-xl text-lg md:text-xl font-black outline-none border focus:ring-2 ring-current transition-all ${s.input}`} placeholder="Título del artículo..." />
                         </div>
                         <div>
                            <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-70">Resumen</label>
                            <textarea name="excerpt" defaultValue={currentPost?.excerpt} rows={3} className={`w-full p-3 md:p-4 rounded-xl outline-none border focus:ring-2 ring-current transition-all resize-none text-sm ${s.input}`} placeholder="Breve descripción..." />
                         </div>
                         <div>
                            <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-70">Autor</label>
                            <input name="author" defaultValue={currentPost?.author} required className={`w-full p-3 rounded-lg outline-none border focus:ring-2 ring-current ${s.input}`} placeholder="Nombre del autor..." />
                        </div>
                     </div>
                     
                     {/* PORTADA */}
                     <div>
                        <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-70">Imagen de Portada</label>
                        <div className={`relative w-full aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden cursor-pointer group hover:border-current transition-all ${s.input} ${heroPreview ? 'border-solid border-transparent p-0' : 'p-4'}`}>
                           {heroPreview ? (
                               <>
                                 <img src={heroPreview} className="w-full h-full object-cover" />
                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-bold text-xs flex items-center gap-2"><Edit size={14}/> CAMBIAR</p>
                                 </div>
                               </>
                           ) : (
                               <div className="text-center opacity-50 group-hover:opacity-100 transition-opacity">
                                   <ImageIcon size={40} className="mx-auto mb-2"/>
                                   <span className="text-[10px] font-black uppercase">Click para subir</span>
                               </div>
                           )}
                           <input type="file" name="image" onChange={handleHeroChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        </div>
                     </div>
                  </div>

                  {/* EDITOR QUILL */}
                  <div>
                     <label className="block text-xs font-black uppercase tracking-widest mb-3 opacity-70">Cuerpo del Artículo</label>
                     <div className={`relative rounded-xl overflow-hidden border bg-white text-black ${uploadingImg ? 'opacity-70 pointer-events-none' : ''}`}>
                        <ReactQuill 
                           ref={quillRef}
                           theme="snow"
                           value={contentBody}
                           onChange={setContentBody}
                           modules={modules}
                           placeholder="Escribe aquí tu artículo..."
                           className="h-[300px] md:h-[500px]" // Altura ajustable en mobile
                        />
                        {uploadingImg && (
                           <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-[#0A192F]">
                               <Loader2 className="animate-spin mb-2" size={32}/>
                               <p className="font-bold text-sm">Subiendo imagen...</p>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* BOTÓN PREVIEW */}
                  <button type="submit" disabled={loading || uploadingImg} className={`w-full ${s.btnPrimary} font-black uppercase tracking-widest py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-base md:text-lg mt-8`}>
                     {loading ? "Procesando..." : <><Save size={20} className="md:w-6 md:h-6"/> REVISAR Y PUBLICAR</>}
                  </button>
               </form>
            </div>
         )}
      </main>

      {/* --- MODAL DE CONFIRMACIÓN Y PREVIEW (FULLSCREEN EN MOBILE) --- */}
      {showConfirmModal && pendingFormData && (
          <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
              <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:rounded-3xl shadow-2xl md:max-w-4xl overflow-hidden flex flex-col relative">
                  
                  {/* Header Modal */}
                  <div className="p-4 md:p-6 border-b flex justify-between items-center bg-gray-50 sticky top-0 z-10">
                      <div>
                          <h3 className="text-lg md:text-xl font-black uppercase text-gray-800">Vista Previa</h3>
                          <p className="text-[10px] md:text-xs text-gray-500">Así se verá tu artículo publicado</p>
                      </div>
                      <button onClick={() => setShowConfirmModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} className="text-gray-500"/></button>
                  </div>

                  {/* Body Modal (Scrollable) */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
                      <article className="max-w-3xl mx-auto bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                          {/* Preview Hero */}
                          {heroPreview && (
                              <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 md:mb-8">
                                  <img src={heroPreview} className="w-full h-full object-cover" alt="Preview"/>
                              </div>
                          )}
                          
                          {/* Preview Meta */}
                          <div className="mb-6">
                              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Blog AyC</span>
                              <h1 className="text-2xl md:text-4xl font-black text-gray-900 mt-2 mb-4 leading-tight">
                                  {pendingFormData.get("title") as string}
                              </h1>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span className="font-bold text-gray-900">{pendingFormData.get("author") as string}</span>
                                  <span>•</span>
                                  <span>{new Date().toLocaleDateString()}</span>
                              </div>
                          </div>

                          {/* Preview Excerpt */}
                          <div className="bg-gray-50 p-4 md:p-6 rounded-xl mb-8 border-l-4 border-blue-500 italic text-gray-700 text-sm md:text-base">
                              {pendingFormData.get("excerpt") as string}
                          </div>

                          {/* Preview Body */}
                          <div className="prose prose-sm md:prose-lg max-w-none prose-img:rounded-xl prose-headings:font-bold prose-a:text-blue-600 ql-editor px-0"
                               dangerouslySetInnerHTML={{ __html: contentBody }}
                          />
                      </article>
                  </div>

                  {/* Footer Modal (Actions) */}
                  <div className="p-4 md:p-6 border-t bg-white flex flex-col md:flex-row justify-end gap-3 z-10">
                      <button 
                          onClick={() => setShowConfirmModal(false)}
                          className="w-full md:w-auto px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors uppercase text-xs md:text-sm order-2 md:order-1"
                      >
                          Seguir Editando
                      </button>
                      <button 
                          onClick={handleFinalConfirm}
                          disabled={loading}
                          className="w-full md:w-auto px-8 py-3 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase text-xs md:text-sm order-1 md:order-2"
                      >
                          {loading ? <Loader2 className="animate-spin"/> : <CheckCircle size={18}/>}
                          Confirmar Publicación
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Estilos Globales para el Editor y Preview */}
      <style>{`
          .ql-toolbar { background-color: #f8fafc; border-color: #e2e8f0 !important; border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; }
          .ql-container { border-color: #e2e8f0 !important; border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; font-family: inherit; font-size: 1rem; }
          .ql-editor { padding: 1rem; }
          @media (min-width: 768px) {
             .ql-editor { padding: 1.5rem; min-height: 450px; }
          }
          .ql-editor h1 { font-size: 1.5em; font-weight: 900; margin-bottom: 0.5em; }
          .ql-editor h2 { font-size: 1.25em; font-weight: 800; margin-top: 1em; margin-bottom: 0.5em; }
          .ql-editor img { max-width: 100%; display: block; margin: 1rem auto; }
      `}</style>
    </div>
  );
}