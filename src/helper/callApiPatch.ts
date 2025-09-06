import axios from "axios";

interface ApiData {
    Bote_capacidad?: string;  // Cambia 'string' por el tipo correcto si es diferente
    Bote_boca?: string;
    Bote_color?: string;
    Bote_material?: string;
    Label_size?: string;
    Label_material?: string;
    Label_finish?: string;
    Label_Color?: string;
    Customer_accepted? : boolean;
    Tomar_muestra? : boolean;
    Status?: string;
    Product_name_2?: string;
    Pallet_comments?: string;
    Filling_exp_date?: string;
    Filling_batch? : string;
    Label_config?: string;
    No_analitycs?: boolean;
    Filling_batch_others?: string;
    Filling_exp_date_others?: string;
    Filling_batch_others_pack?: string;
    Filling_exp_date_others_pack?: string;
}



export default function callApiPatch(path: string, data: ApiData) {
    const usernames = import.meta.env.VITE_USERNAME;
    const passwords = import.meta.env.VITE_PASSWORD;
    const credentials = `${usernames}:${passwords}`;
    const buffer = new TextEncoder().encode(credentials);
    const buffer2: number[] = Array.from(buffer);
    const base64 = btoa(String.fromCharCode.apply(null, buffer2));
    const encodedCredentials = `Basic ${base64}`;
    const datos= axios.patch(path, data, {
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