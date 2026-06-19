import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Card, StarRating, Badge, PageWrapper, SectionTitle } from "../../components/ui";

const C = { maroon:"#8B1A1A", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", border:"#E8D5C0", muted:"#7A6A5A", white:"#fff", charcoal:"#2C2C2C" };

const VENDORS = [
  { id:1, name:"Abena's Fresh Produce", market:"Makola Market",    city:"Accra",  country:"GH", flag:"🇬🇭", avatar:"👩🏾", rating:4.9, reviews:124, category:"Fresh Food",   verified:true,  sales:1240, desc:"Farm-fresh produce sourced directly from Ashanti and Brong-Ahafo farms. Delivering across Accra daily." },
  { id:2, name:"Tech King Emeka",        market:"Computer Village", city:"Lagos",  country:"NG", flag:"🇳🇬", avatar:"👨🏿", rating:4.7, reviews:89,  category:"Electronics",  verified:true,  sales:3200, desc:"Original phones, accessories and electronics. 8 years at Computer Village. All items tested before sale." },
  { id:3, name:"Kofi's Kente Corner",    market:"Makola Market",    city:"Accra",  country:"GH", flag:"🇬🇭", avatar:"👨🏾", rating:4.6, reviews:76,  category:"Crafts",       verified:true,  sales:2100, desc:"Hand-woven kente from Bonwire. Custom orders welcome. Dashikis, stools, and traditional attire." },
  { id:4, name:"Fatou Art & Craft",      market:"Kumasi Central",   city:"Kumasi", country:"GH", flag:"🇬🇭", avatar:"👩🏾", rating:4.9, reviews:58,  category:"Jewelry",      verified:false, sales:670,  desc:"Handmade brass jewelry, clay masks, and woven baskets. Each piece is unique." },
  { id:5, name:"Bola Electronics",       market:"Computer Village", city:"Lagos",  country:"NG", flag:"🇳🇬", avatar:"👨🏿", rating:4.5, reviews:43,  category:"Electronics",  verified:true,  sales:4500, desc:"Laptops, TVs, and home electronics. Warranty on all items. Repairs also available." },
  { id:6, name:"Mama Wanjiku Fabrics",   market:"Balogun Market",   city:"Lagos",  country:"NG", flag:"🇳🇬", avatar:"👩🏿", rating:4.8, reviews:91,  category:"Fabrics",      verified:true,  sales:1890, desc:"Premium Ankara, lace, and Dutch wax fabrics. Wholesale and retail available." },
];

const CATEGORIES = ["All","Fresh Food","Electronics","Crafts","Jewelry","Fabrics"];

export default function VendorsPage({ session }) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = VENDORS.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.market.toLowerCase().includes(search.toLowerCase());
    const matchCountry = country==="All" || v.country===country;
    const matchCat = category==="All" || v.category===category;
    return matchSearch && matchCountry && matchCat;
  });

  return (
    <>
      <Head><title>Sellers — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:C.maroon, marginBottom:6 }}>Our Sellers</h1>
        <p style={{ color:C.muted, marginBottom:24, fontSize:15 }}>Browse verified sellers from markets across Ghana and Nigeria</p>

        {/* Filters */}
        <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sellers…"
            style={{ flex:1, minWidth:200, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:14, outline:"none" }} />
          <select value={country} onChange={e=>setCountry(e.target.value)}
            style={{ padding:"10px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:14, color:C.maroon, background:C.white, cursor:"pointer" }}>
            <option value="All">🌍 All countries</option>
            <option value="GH">🇬🇭 Ghana</option>
            <option value="NG">🇳🇬 Nigeria</option>
          </select>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {CATEGORIES.map(cat=>(
              <button key={cat} onClick={()=>setCategory(cat)} style={{
                padding:"9px 14px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer",
                border:"1.5px solid", borderColor:category===cat?C.maroon:C.border,
                background:category===cat?C.maroon:C.white,
                color:category===cat?C.white:C.muted,
              }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:18 }}>
          {filtered.map(v=>(
            <Link key={v.id} href={`/vendors/${v.id}`}>
              <Card>
                <div style={{ background:`linear-gradient(135deg, #8B1A1A22, #C0392B11)`, height:80, display:"flex", alignItems:"center", padding:"0 20px", gap:16 }}>
                  <div style={{ fontSize:48 }}>{v.avatar}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15, color:C.charcoal }}>
                      {v.name} {v.verified&&<span style={{ color:C.oxred, fontSize:13 }}>✓</span>}
                    </div>
                    <div style={{ fontSize:12, color:C.muted }}>{v.flag} {v.market} · {v.city}</div>
                  </div>
                </div>
                <div style={{ padding:"14px 18px" }}>
                  <p style={{ fontSize:13, color:C.charcoal, lineHeight:1.55, marginBottom:12 }}>{v.desc}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
                    <StarRating rating={v.rating} />
                    <div style={{ display:"flex", gap:6 }}>
                      <Badge color={C.maroon}>{v.category}</Badge>
                      <Badge color={C.muted}>{v.reviews} reviews</Badge>
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
