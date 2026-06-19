import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, Badge, StarRating, PageWrapper, EmptyState } from "../components/ui";
import { supabase } from "../lib/supabase";

const C = { maroon:"#8B1A1A", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", border:"#E8D5C0", muted:"#7A6A5A", white:"#fff", charcoal:"#2C2C2C", green:"#27AE60" };

export default function AccountPage({ session }) {
  const router = useRouter();
  useEffect(()=>{ if(!session) router.push("/auth/buyer"); },[session,router]);
  if(!session) return null;

  const user = session.user;
  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Yadamarket User";

  return (
    <>
      <Head><title>My Account — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        {/* Profile */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:80, height:80, borderRadius:"50%", background:`linear-gradient(135deg, #8B1A1A, #C0392B)`, margin:"0 auto 14px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>
            {user.user_metadata?.avatar_url
              ? <img src={user.user_metadata.avatar_url} style={{ width:80, height:80, borderRadius:"50%" }} alt="avatar" />
              : "👤"}
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:C.maroon, margin:"0 0 4px" }}>{name}</h2>
          <p style={{ color:C.muted, fontSize:14 }}>{user.email}</p>
          <div style={{ marginTop:8 }}><Badge color={C.oxred}>Buyer Account</Badge></div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:580, margin:"0 auto" }}>
          {/* Stats */}
          <Card>
            <div style={{ padding:20 }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:C.maroon, marginBottom:16 }}>📊 My Activity</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, textAlign:"center" }}>
                {[{ label:"Orders", value:"14", icon:"📦" },{ label:"Saved", value:"8", icon:"❤️" },{ label:"Reviews", value:"11", icon:"⭐" }].map(s=>(
                  <div key={s.label} style={{ background:C.creamD, borderRadius:12, padding:14 }}>
                    <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                    <div style={{ fontSize:24, fontWeight:800, color:C.maroon }}>{s.value}</div>
                    <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick links */}
          <Card>
            <div style={{ padding:20 }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:C.maroon, marginBottom:14 }}>🔗 Quick Links</h3>
              {[
                { href:"/orders",  icon:"📦", label:"Track my orders",      desc:"See all your purchases"        },
                { href:"/auction", icon:"🔨", label:"Weekend Auction",       desc:"Bid on exclusive items"        },
                { href:"/markets", icon:"🏪", label:"Browse markets",        desc:"Explore markets near you"      },
              ].map(l=>(
                <Link key={l.href} href={l.href}>
                  <div style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:`1px solid ${C.border}`, cursor:"pointer" }}>
                    <span style={{ fontSize:24 }}>{l.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:14, color:C.charcoal }}>{l.label}</div>
                      <div style={{ fontSize:12, color:C.muted }}>{l.desc}</div>
                    </div>
                    <span style={{ color:C.muted }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Reviews */}
          <Card>
            <div style={{ padding:20 }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:C.maroon, marginBottom:14 }}>⭐ My Reviews</h3>
              {[
                { vendor:"Abena's Fresh Produce", rating:5, text:"Super fresh tomatoes, delivered really fast!", date:"Jun 15" },
                { vendor:"Kofi's Kente Corner",   rating:5, text:"Beautiful kente, high quality weaving.",        date:"Jun 12" },
              ].map((r,i,arr)=>(
                <div key={i} style={{ paddingBottom:i<arr.length-1?14:0, marginBottom:i<arr.length-1?14:0, borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{r.vendor}</span>
                    <span style={{ fontSize:12, color:C.muted }}>{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} />
                  <p style={{ fontSize:13, color:C.charcoal, marginTop:6, lineHeight:1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Sign out */}
          <button onClick={()=>supabase.auth.signOut()} style={{ width:"100%", padding:"13px", borderRadius:10, border:`1.5px solid ${C.border}`, background:C.white, color:"#E53E3E", fontWeight:700, fontSize:14, cursor:"pointer" }}>
            Sign out
          </button>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
}
