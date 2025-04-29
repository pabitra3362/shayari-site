import { generateShayari } from "@/lib/ai/generateShayari";
import { getAllShayari, saveShayari } from "@/lib/controllers/shayariController";


export async function GET(){
    return await getAllShayari();
    
}

export async function POST(){
    const shayaries = await generateShayari();
    const data = await saveShayari(shayaries);
    
    return data;
}