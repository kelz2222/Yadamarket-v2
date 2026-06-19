import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Card, StarRating, Badge, PageWrapper } from "../../components/ui";

const C = { maroon:"#8B1A1A", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", border:"#E8D5C0", muted:"#7A6A5A", white:"#fff", charcoal:"#2C2C2C" };

const MARKETS = [
  { id:1, name:"Makola Market",    city:"Accra",  country:"GH", flag:"🇬🇭", vendors:142, icon:"🏪", rating:4.8, category:"General",     desc:"Accra's largest and most vibrant open-air market. Everything from fresh food to electronics." },
  { id:2, name:"Kumasi Central",   city:"Kumasi", country:"GH", flag:"🇬🇭", vendors:95,  icon:"🎨", rating:4.6, category:"Crafts",      desc:"Heart of Ashanti commerce — kente, crafts, and daily essentials." },
  { id:3, name:"Kejetia Market",   city:"Kumasi", country:"GH", flag:"🇬🇭", vendors:210, icon:"🏬", rating:4.5, category:"General",     desc:"One of the largest markets in West Africa. A market city within a city." },
  { id:4, name:"Computer Village", city:"Lagos",  country:"NG", flag:"🇳🇬", vendors:89,  icon:"💻", rating:4.7, category:"Electronics", desc:"West Africa's largest electronics and tech accessories hub." },
  { id:5, name:"Balogun Market",   city:"Lagos",  country:"NG", flag:"🇳🇬", vendors:178, icon:"👗", rating:4.5, category:"General",     desc:"Lagos's iconic textile, fashion, and general goods market." },
  { id:6, name:"Wuse Market",      city:"Abuja",  country:"NG", flag:"🇳🇬", vendors:67,  icon:"🥬", rating:4.4, category:"Food",        desc:"Abuja's premier market for fresh food, clothing, and household goods." },
];

const CATS = ["All","General","Crafts","Electronics","Food"];

export default function MarketsPage({ session }) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [cat, setCat] = useState("All");

  const filtered = MARKETS.filter(m =>
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.city.toLowerCase().includes(search.toLowerCase())) &&
    (country==="All"||m.country===country) && (cat==="All"||m.category===cat)
  );

  return (
    <>
      <Head><title>Markets — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:C.maroon, marginBottom:6 }}>Browse Markets</h1>
        <p style={{ color:C.muted, marginBottom:24, fontSize:15 }}>Explore markets across Ghana and Nigeria</p>

        <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search markets…"
            style={{ flex:1, minWidth:200, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:14, outline:"none" }} />
          <select value={country} onChange={e=>setCountry(e.target.value)}
            style={{ padding:"10px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:14, color:C.maroon, background:C.white, cursor:"pointer" }}>
            <option value="All">🌍 All</option>
            <option value="GH">🇬🇭 Ghana</option>
            <option value="NG">🇳🇬 Nigeria</option>
          </select>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{
                padding:"9px 14px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer",
                border:"1.5px solid", borderColor:cat===c?C.maroon:C.border,
                background:cat===c?C.maroon:C.white, color:cat===c?C.white:C.muted,
              }}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:18 }}>
          {filtered.map(m=>(
            <Link key={m.id} href={`/markets/${m.id}`}>
              <Card>
                <div style={{ background:`linear-gradient(135deg, #8B1A1A15, #E8A83815)`, padding:"20px 20px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
                    <span style={{ fontSize:44 }}>{m.icon}</span>
                    <span style={{ fontSize:24 }}>{m.flag}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:C.charcoal, margin:"0 0 4px" }}>{m.name}</h3>
                  <p style={{ color:C.muted, fontSize:13, margin:"0 0 10px" }}>📍 {m.city}</p>
                  <p style={{ fontSize:13, color:C.charcoal, lineHeight:1.5, marginBottom:14 }}>{m.desc}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <StarRating rating={m.rating} />
                    <div style={{ display:"flex", gap:6 }}>
                      <Badge color={C.maroon}>{m.category}</Badge>
                      <Badge color={C.muted}>{m.vendors} sellers</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
