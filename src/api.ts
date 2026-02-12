import PocketBase from 'pocketbase';

// CAMBIO CRÍTICO: Usar HTTPS y el dominio real
const url = "https://www.aycfincaraiz.com";

export const pb = new PocketBase(url);
pb.autoCancellation(false);