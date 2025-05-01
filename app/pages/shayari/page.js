// app/shayari/page.js
import ShayariClientList from "@/components/ShayariClientList";

async function getShayaris() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/shayaries/read/getAllShayari`, {
      cache: "no-store", // always fresh data (or use ISR with revalidate)
    });
    const data = await res.json();
    return data?.shayaries || [];
  } catch (error) {
    console.error("Fetch error:", error.message);
    return [];
  }
}


export default async function ShayariPage() {
  const shayaris = await getShayaris();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#eea679b0] mb-6 text-center">Explore Shayaris</h1>
      <ShayariClientList shayaris={shayaris} />
    </div>
  );
}
