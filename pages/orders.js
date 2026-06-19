import Head from "next/head";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, StatusBadge, PageWrapper, EmptyState, Button } from "../components/ui";
import Link from "next/link";

const C = { maroon:"#8B1A1A", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", border:"#E8D5C0", muted:"#7A6A5A", white:"#fff", charcoal:"#2C2C2C", green:"#27AE60" };

const ORDERS = [
  { id:"YDA-8821", product:"Kente Stole (3m)",   vendor:"Kofi's Kente Corner",   status:"in_transit", eta:"Today, 3–5 PM",   amount:45, symbol:"₵", date:"Jun 16, 2026", delivery:"Within Accra", steps:3 },
  { id:"YDA-8814", product:"Roma Tomatoes (1kg)", vendor:"Abena's Fresh Produce", status:"delivered",  eta:"Delivered Jun 15", amount:5,  symbol:"₵", date:"Jun 15, 2026", delivery:"Pickup",        steps:4 },
  { id:"YDA-8803", product:"Handwoven Basket",    vendor:"Fatou Art & Craft",      status:"confirmed",  eta:"Est. Jun 18",     amount:22, symbol:"₵", date:"Jun 16, 2026", delivery:"Greater Accra",  steps:2 },
];

const STEPS = ["Placed","Confirmed","Packed","Delivered"];

export default function OrdersPage({ session }) {
  if (!session) return (
    <>
      <Navbar session={session} />
      <PageWrapper>
        <EmptyState icon="📦" title="Sign in to see your orders" message="Create a free buyer account to track all your Yadamarket purchases."
          action={<Link href="/auth/buyer"><button style={{ background:C.maroon, color:C.white, border:"none", borderRadius:10, padding:"12px 24px", fontWeight:700, fontSize:14, cursor:"pointer" }}>Sign in / Sign up</button></Link>} />
      </PageWrapper>
      <Footer />
    </>
  );

  return (
    <>
      <Head><title>My Orders — Yadamarket</title></Head>
      <Navbar session={session} />
      <PageWrapper>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:C.maroon, marginBottom:6 }}>My Orders</h1>
        <p style={{ color:C.muted, marginBottom:28, fontSize:15 }}>Track all your Yadamarket purchases</p>

        {ORDERS.length===0
          ? <EmptyState icon="🛍️" title="No orders yet" message="Start shopping from verified sellers across Ghana and Nigeria."
              action={<Link href="/"><button style={{ background:C.oxred, color:C.white, border:"none", borderRadius:10, padding:"12px 24px", fontWeight:700, fontSize:14, cursor:"pointer" }}>Start shopping →</button></Link>} />
          : (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {ORDERS.map(o=>(
              <Card key={o.id}>
                <div style={{ padding:22 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:16 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:16, color:C.charcoal }}>{o.product}</div>
                      <div style={{ color:C.muted, fontSize:13, marginTop:3 }}>{o.vendor} · {o.date}</div>
                      <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>🚚 {o.delivery}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontWeight:800, fontSize:22, color:C.maroon }}>{o.symbol}{o.amount}</div>
                      <div style={{ marginTop:5 }}><StatusBadge status={o.status} /></div>
                    </div>
                  </div>

                  <div style={{ background:C.cream, borderRadius:8, padding:"9px 14px", fontSize:13, display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                    <span style={{ color:C.muted }}>📦 {o.eta}</span>
                    <span style={{ color:C.muted, fontFamily:"monospace" }}>#{o.id}</span>
                  </div>

                  {/* Progress */}
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                      {STEPS.map((s,i)=>(
                        <div key={s} style={{ textAlign:"center", flex:1 }}>
                          <div style={{ width:12, height:12, borderRadius:"50%", background:i<o.steps?C.maroon:C.border, margin:"0 auto 4px", boxShadow:i===o.steps-1?`0 0 0 3px rgba(139,26,26,0.2)`:"none" }} />
                          <div style={{ fontSize:10, color:i<o.steps?C.maroon:C.muted, fontWeight:i<o.steps?600:400 }}>{s}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ height:3, background:C.border, borderRadius:2, margin:"0 6px", position:"relative" }}>
                      <div style={{ position:"absolute", left:0, top:0, height:"100%", background:C.maroon, borderRadius:2, width:`${((o.steps-1)/3)*100}%`, transition:"width 0.5s" }} />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </PageWrapper>
      <Footer />
    </>
  );
}
