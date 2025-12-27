import React from 'react';
const Audiovisual = () => (
  <div className="pt-24 bg-black text-white min-h-screen font-sans">
     <div className="h-[60vh] bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4')] bg-cover bg-center flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center">
           <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter">Cinema A&C</h1>
           <p className="text-xl text-gray-300">Narrativa visual que vende.</p>
        </div>
     </div>
     <div className="max-w-5xl mx-auto py-24 px-6">
        <div className="aspect-video bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl flex items-center justify-center">
           <p className="text-gray-500">Video Reel 4K Placeholder</p>
        </div>
     </div>
  </div>
);
export default Audiovisual;