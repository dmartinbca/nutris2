import axios from "axios";

interface ApiData {
    numeroRG?: string;
    tipoImagen?: string;
    imagenBase64?: string;
    numeroTroquel?: string;
}



export default function callApiPost(post: string, data: ApiData, p0?: { responseType: string; }) {
    const usernames = import.meta.env.VITE_USERNAME;
    const passwords = import.meta.env.VITE_PASSWORD;
    const credentials = `${usernames}:${passwords}`;
    const buffer = new TextEncoder().encode(credentials);
    const buffer2: number[] = Array.from(buffer);
    const base64 = btoa(String.fromCharCode.apply(null, buffer2));
    const encodedCredentials = `Basic ${base64}`;
    const datos= axios.post(post, data, {
        headers: {
            'Authorization': `${encodedCredentials}`, // Agregar la cabecera de autorización con las credenciales codificadas
            'If-Match': '*',
            'Content-Type': 'application/json',
            "Isolation" : "snapshot" 
    }
    })
    //console.log({datos});
    return datos;
}