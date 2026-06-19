import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, StarRating, Badge, SectionTitle, PageWrapper } from "../components/ui";
import CheckoutModal from "../components/payment/CheckoutModal";

const C = { maroon:"#8B1A1A", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", border:"#E8D5C0", muted:"#7A6A5A", white:"#fff", charcoal:"#2C2C2C", green:"#27AE60" };

const MARKETS = [
  { id:1, name:"Makola Market",    city:"Accra",  country:"GH", flag:"🇬🇭", vendors:142, icon:"🏪", rating:4.8, category:"General"     },
  { id:2, name:"Kumasi Central",   city:"Kumasi", country:"GH", flag:"🇬🇭", vendors:95,  icon:"🎨", rating:4.6, category:"Crafts"      },
  { id:3, name:"Computer Village", city:"Lagos",  country:"NG", flag:"🇳🇬", vendors:89,  icon:"💻", rating:4.7, category:"Electronics" },
  { id:4, name:"Balogun Market",   city:"Lagos",  country:"NG", flag:"🇳🇬", vendors:210, icon:"👗", rating:4.5, category:"General"     },
];

const VENDORS = [
  { id:1, name:"Abena's Fresh Produce", market:"Makola Market",    country:"GH", avatar:"👩🏾", rating:4.9, category:"Fresh Food",   verified:true  },
  { id:2, name:"Tech King Emeka",        market:"Computer Village", country:"NG", avatar:"👨🏿", rating:4.7, category:"Electronics",  verified:true  },
  { id:3, name:"Kofi's Kente Corner",    market:"Makola Market",    country:"GH", avatar:"👨🏾", rating:4.6, category:"Crafts",       verified:true  },
  { id:4, name:"Fatou Art & Craft",      market:"Kumasi Central",   country:"GH", avatar:"👩🏾", rating:4.9, category:"Jewelry",      verified:false },
];

const PRODUCTS = [
  { id:1, name:"Roma Tomatoes (1kg)", price:5,  vendor:"Abena's Fresh Produce", country:"GH", icon:"🍅", inStock:true,  rating:4.8 },
  { id:2, name:"Kente Stole (3m)",    price:45, vendor:"Kofi's Kente Corner",   country:"GH", icon:"🧣", inStock:true,  rating:4.9 },
  { id:3, name:"iPhone 14 Case",      price:12, vendor:"Tech King Emeka",        country:"NG", icon:"📱", inStock:true,  rating:4.6 },
  { id:4, name:"Handwoven Basket",    price:22, vendor:"Fatou Art & Craft",      country:"GH", icon:"🧺", inStock:false, rating:4.7 },
  { id:5, name:"Plantain Bunch",      price:3,  vendor:"Abena's Fresh Produce",  country:"GH", icon:"🍌", inStock:true,  rating:4.5 },
  { id:6, name:"Laptop Charger",      price:18, vendor:"Tech King Emeka",        country:"NG", icon:"🔌", inStock:true,  rating:4.4 },
];

const SYMBOLS = { GH:"₵", NG:"₦" };

function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card>
        <div style={{ padding:18 }}>
          <div style={{ fontSize:48, textAlign:"center", background:C.creamD, borderRadius:10, padding:"14px 0", marginBottom:12 }}>{product.icon}</div>
          <div style={{ fontWeight:700, fontSize:14, color:C.charcoal, marginBottom:3 }}>{product.name}</div>
          <div style={{ color:C.muted, fontSize:12, marginBottom:8 }}>{product.vendor}</div>
          <StarRating rating={product.rating} />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
            <span style={{ fontWeight:800, fontSize:22, color:C.maroon }}>{SYMBOLS[product.country]}{product.price}</span>
            {product.inStock
              ? <button onClick={()=>setOpen(true)} style={{ background:C.oxred, color:C.white, border:"none", borderRadius:8, padding:"8px 16px", fontWeight:700, fontSize:13, cursor:"pointer" }}>Buy now</button>
              : <span style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>Out of stock</span>}
          </div>
        </div>
      </Card>
      <CheckoutModal open={open} onClose={()=>setOpen(false)} product={product} country={product.country} />
    </>
  );
}

export default function Home({ session }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Head><title>Yadamarket — Market streaming live, see it, buy it</title></Head>
      <Navbar session={session} />

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, #8B1A1A 0%, #C0392B 100%)`, padding:"64px 20px 80px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.05, backgroundImage:"radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize:"28px 28px" }} />
        <div style={{ position:"relative", maxWidth:600, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(232,168,56,0.2)", border:"1px solid rgba(232,168,56,0.4)", borderRadius:20, padding:"5px 14px", marginBottom:20 }}>
            <span style={{ color:C.gold, fontSize:12, fontWeight:700 }}>🛒 Ghana & Nigeria's Live Market App</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:"clamp(32px,6vw,56px)", color:C.white, margin:"0 0 14px", lineHeight:1.1 }}>
            Market streaming live.<br/><span style={{ color:C.gold }}>See it, buy it.</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:16, lineHeight:1.7, margin:"0 auto 32px", maxWidth:480 }}>
            Shop directly from verified sellers at Makola, Computer Village, and top markets across Ghana and Nigeria. Pay with Mobile Money or card.
          </p>
          <div style={{ display:"flex", gap:10, maxWidth:480, margin:"0 auto 28px", flexWrap:"wrap" }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, sellers or markets…"
              style={{ flex:1, minWidth:200, padding:"14px 18px", borderRadius:10, border:"none", fontSize:15, outline:"none", boxShadow:"0 4px 16px rgba(0,0,0,0.15)" }} />
            <button style={{ background:C.gold, color:C.charcoal, border:"none", borderRadius:10, padding:"14px 22px", fontWeight:700, fontSize:15, cursor:"pointer" }}>Search</button>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:24, flexWrap:"wrap" }}>
            {[["🏪","500+ Sellers"],["🛡️","Secure Payments"],["🚚","Fast Delivery"],["⭐","Verified Products"]].map(([icon,label])=>(
              <div key={label} style={{ color:"rgba(255,255,255,0.85)", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pattern-strip" />

      {/* Sign up CTA */}
      <div style={{ background:C.creamD, borderBottom:`1.5px solid ${C.border}`, padding:"16px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div>
            <span style={{ fontWeight:700, color:C.maroon, fontSize:15 }}>Are you a seller? </span>
            <span style={{ color:C.muted, fontSize:14 }}>Join Yadamarket and reach thousands of buyers.</span>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/auth/buyer" style={{ padding:"9px 18px", borderRadius:8, border:`1.5px solid ${C.maroon}`, color:C.maroon, fontWeight:700, fontSize:13 }}>
              🛒 Shop as Buyer
            </Link>
            <Link href="/auth/seller" style={{ padding:"9px 18px", borderRadius:8, background:C.maroon, color:C.white, fontWeight:700, fontSize:13 }}>
              🏪 Start Selling
            </Link>
          </div>
        </div>
      </div>

      <PageWrapper>
        {/* Weekend Auction */}
        <section style={{ margin:"0 0 44px" }}>
          <Card style={{ background:`linear-gradient(135deg, #8B1A1A, #C0392B)`, border:"none" }}>
            <div style={{ padding:"28px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(232,168,56,0.25)", borderRadius:20, padding:"4px 12px", marginBottom:10 }}>
                  <span style={{ color:C.gold, fontSize:11, fontWeight:700 }}>🔨 WEEKEND AUCTION</span>
                </div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:C.white, margin:"0 0 6px" }}>Weekend Market Live — Vol. 1</h2>
                <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, margin:"0 0 4px" }}>📅 This Saturday · 6:00 PM — 9:00 PM</p>
                <p style={{ color:"rgba(255,255,255,0.7)", fontSize:13 }}>Bid on kente cloth, fresh produce, electronics and more from verified sellers</p>
              </div>
              <Link href="/auction" style={{ background:C.gold, color:C.charcoal, padding:"12px 24px", borderRadius:10, fontWeight:700, fontSize:14, flexShrink:0 }}>
                🔨 See Items & Bid →
              </Link>
            </div>
          </Card>
        </section>

        {/* Featured sellers */}
        <section style={{ marginBottom:44 }}>
          <SectionTitle action={<Link href="/vendors" style={{ fontSize:13, fontWeight:600, color:C.oxred }}>All sellers →</Link>}>👨‍💼 Featured Sellers</SectionTitle>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:16 }}>
            {VENDORS.map(v=>(
              <Link key={v.id} href={`/vendors/${v.id}`}>
                <Card>
                  <div style={{ padding:18, textAlign:"center" }}>
                    <div style={{ fontSize:52, marginBottom:8 }}>{v.avatar}</div>
                    <div style={{ fontWeight:700, fontSize:15, color:C.charcoal, marginBottom:3 }}>
                      {v.name} {v.verified && <span style={{ color:C.oxred, fontSize:13 }}>✓</span>}
                    </div>
                    <div style={{ color:C.muted, fontSize:12, marginBottom:8 }}>{v.market}</div>
                    <StarRating rating={v.rating} />
                    <div style={{ marginTop:10 }}><Badge color={C.maroon}>{v.category}</Badge></div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Markets */}
        <section style={{ marginBottom:44 }}>
          <SectionTitle action={<Link href="/markets" style={{ fontSize:13, fontWeight:600, color:C.oxred }}>All markets →</Link>}>📍 Browse Markets</SectionTitle>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
            {MARKETS.map(m=>(
              <Link key={m.id} href={`/markets/${m.id}`}>
                <Card>
                  <div style={{ padding:20 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                      <span style={{ fontSize:40 }}>{m.icon}</span>
                      <span style={{ fontSize:22 }}>{m.flag}</span>
                    </div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:C.charcoal, margin:"0 0 4px" }}>{m.name}</h3>
                    <p style={{ color:C.muted, fontSize:13, margin:"0 0 10px" }}>📍 {m.city}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <StarRating rating={m.rating} />
                      <span style={{ fontSize:12, color:C.muted }}>{m.vendors} sellers</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Products */}
        <section style={{ marginBottom:44 }}>
          <SectionTitle>🛍️ Products You'll Love</SectionTitle>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:14 }}>
            {PRODUCTS.map(p=><ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </PageWrapper>

      <Footer />
    </>
  );
}
