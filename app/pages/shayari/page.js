// app/shayari/page.js
import ClientSideFetcher from "@/components/ClientSideFetcher";
import ShayariClientList from "@/components/ShayariClientList";
import { getAllShayari } from "@/services/shayariService";
import { userProfile } from "@/services/userService";

// async function getShayaris() {

  
  
//   try {
    
//     const res = await userProfile();
//     console.log(res);
//     const data = await getAllShayari(res?.user?.id)
//     return data?.shayaries || [];
//   } catch (error) {
//     console.error("Fetch error:", error.message);
//     return [];
//   }
// }


export default async function ShayariPage() {
  // const shayaris = await getShayaris();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#eea679b0] mb-6 text-center">Explore Shayaris</h1>
      <ClientSideFetcher fetchFunction={getAllShayari} isShayari={true} />
    </div>
  );
}
