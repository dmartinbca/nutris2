import axios from "axios";
let data:any;
export default async function callApi(path: string) {
    const usernames = import.meta.env.VITE_USERNAME;
    const passwords = import.meta.env.VITE_PASSWORD;
    const credentials = `${usernames}:${passwords}`;
    const buffer = new TextEncoder().encode(credentials);
    const buffer2: number[] = Array.from(buffer);
    const base64 = btoa(String.fromCharCode.apply(null, buffer2));
    const encodedCredentials = `Basic ${base64}`;
    data= await axios.get(path, {
        headers: {
            'Authorization': `${encodedCredentials}`,
            "Isolation" : "snapshot" 
    }
    })
   // console.log({path});
    return data;
}