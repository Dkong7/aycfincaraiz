import PocketBase from 'pocketbase';

// CAMBIO CRÍTICO: Dirección fija del servidor (Puerto 8080)
const url = "http://209.126.77.41:8080";

export const pb = new PocketBase(url);
pb.autoCancellation(false);