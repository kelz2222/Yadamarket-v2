import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Card, Badge, PageWrapper, Modal, Button } from "../components/ui";

const C = { maroon:"#8B1A1A", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", border:"#E8D5C0", muted:"#7A6A5A", white:"#fff", charcoal:"#2C2C2C", green:"#27AE60" };

const AUCTION = {
  id:1, title:"Weekend Market Live — Vol. 1",
  description:"Bid on verified products from top Yadamarket sellers. Winner pays through the app and we arrange delivery.",
  date:"Saturday, June 21, 2026", time:"6:00 PM — 9:00 PM", status:"upcoming",
  host:"Yadamarket Host",
};

const ITEMS = [
  { id:1, name:"Kente Cloth (6 yards)", seller:"Kofi's Kente Corner", icon:"🧣", startPrice:80,  currentBid:95,  currency:"₵", bids:7,  country:"GH", desc:"Hand-woven kente from Bonwire, Ashanti Region. Premium quality." },
  { id:2, name:"Samsung A54 (Used)",    seller:"Tech King Emeka",      icon:"📱", startPrice:200, currentBid:240, currency:"₦", bids:12, country:"NG", desc:"Excellent condition, 3 months old, comes with original box." },
  { id:3, name:"Tomatoes (10kg crate)", seller:"Abena's Fresh Produce", icon:"🍅", startPrice:40,  currentBid:40,  currency:"₵", bids:0,  country:"GH", desc:"Farm fresh Roma tomatoes, harvested this week from Brong-Ahafo." },
  { id:4, name:"Handmade Brass Mask",   seller:"Fatou Art & Craft",     icon:"🎭", startPrice:120, currentBid:145, currency:"₵", bids:5,  country:"GH", desc:"Traditional Ashanti brass casting, perfect collector's item." },
  { id:5, name:"Ankara Fabric (5 yds)", seller:"Mama Wanjiku Fabrics",  icon:"🎨", startPrice:35,  currentBid:35,  currency:"₦", bids:0,  country:"NG", desc:"Premium Dutch wax print, vibrant colours, 5 yards." },
  { id:6, name:"Laptop Bag",            seller:"Tech King Emeka",       icon:"💼", startPrice:25,  currentBid:31,  currency:"₦", bids:4,  country:"NG", desc:"Waterproof 15-inch laptop bag with USB charging port." },
];

function CountdownTimer() {
  return (
    <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
      {[["02","Days"],["14","Hours"],["35","Mins"],["20","Secs"]].map(([val,label])=>(
        <div key={label} style={{ textAlign:"center" }}>
          <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:10, padding:"12px 16px", minWidth:64 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:800, color:C.white }}>{val}</div>
          </div>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, marginTop:4, fontWeight:600, textTransform:"uppercase" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function AuctionPage({ session }) {
  const [bidItem, setBidItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidDone, setBidDone] = useState(false);
  const [items, setItems] = useState(ITEMS);

  const placeBid = () => {
    if (!session) { alert("Please sign in to place a bid"); return; }
    const amount = parseFloat(bidAmount);
    if (!amount || amount <= bidItem.currentBid) { alert(`Bid must be higher than ${bidItem.currency}${bidItem.currentBid}`); return; }
    setItems(prev => prev.map(i => i.id === bidItem.id ? { ...i, currentBid:amount, bids:i.bids+1 } : i));
    setBidDone(true);
  };

  return (
    <>
      <Head><title>Weekend Auction — Yadamarket</title></Head>
      <Navbar session={session} />

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, #6B1313 0%, #8B1A1A 50%, #C0392B 100%)`, padding:"48px 20px 56px", textAlign:"center" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(232,168,56,0.2)", border:"1px solid rgba(232,168,56,0.4)", borderRadius:20, padding:"5px 14px", marginBottom:16 }}>
            <span style={{ color:C.gold, fontSize:12, fontWeight:700 }}>🔨 WEEKEND AUCTION · EVERY SATURDAY</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:"clamp(26px,5vw,42px)", color:C.white, margin:"0 0 10px" }}>
            {AUCTION.title}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:15, margin:"0 0 8px" }}>📅 {AUCTION.date} · {AUCTION.time}</p>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:13, margin:"0 0 28px" }}>Hosted by {AUCTION.host}</p>
          <CountdownTimer />
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, marginTop:16 }}>
            🔒 All bids are binding. Winners pay securely through the app.
          </p>
        </div>
      </div>
      <div className="pattern-strip" />

      <PageWrapper>
        {/* How it works */}
        <div style={{ background:C.creamD, borderRadius:14, padding:"20px 24px", marginBottom:36, display:"flex", gap:24, flexWrap:"wrap", justifyContent:"center" }}>
          {[["1️⃣","Browse items","See what's up for auction this weekend"],["2️⃣","Place your bid","Bid higher than the current price"],["3️⃣","Win & pay","Winner pays securely in the app"],["4️⃣","Get delivery","We arrange delivery to your door"]].map(([num,title,desc])=>(
            <div key={title} style={{ textAlign:"center", maxWidth:160 }}>
              <div style={{ fontSize:24, marginBottom:4 }}>{num}</div>
              <div style={{ fontWeight:700, fontSize:13, color:C.maroon, marginBottom:2 }}>{title}</div>
              <div style={{ fontSize:12, color:C.muted, lineHeight:1.4 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:C.maroon, marginBottom:20 }}>🛒 Items Up for Auction ({items.length})</h2>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:18 }}>
          {items.map(item=>(
            <Card key={item.id}>
              <div style={{ padding:20 }}>
                <div style={{ fontSize:52, textAlign:"center", background:C.creamD, borderRadius:10, padding:"16px 0", marginBottom:14 }}>{item.icon}</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:C.charcoal, margin:"0 0 4px" }}>{item.name}</h3>
                <div style={{ color:C.muted, fontSize:12, marginBottom:8 }}>by {item.seller}</div>
                <p style={{ fontSize:13, color:C.charcoal, lineHeight:1.5, marginBottom:14 }}>{item.desc}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:14 }}>
                  <div>
                    <div style={{ fontSize:11, color:C.muted, marginBottom:2 }}>Current bid</div>
                    <div style={{ fontSize:24, fontWeight:800, color:C.maroon }}>{item.currency}{item.currentBid}</div>
                    <div style={{ fontSize:11, color:C.muted }}>Started at {item.currency}{item.startPrice} · {item.bids} bids</div>
                  </div>
                  <Badge color={item.bids>0?C.oxred:C.muted}>{item.bids>0?`${item.bids} bids`:"No bids yet"}</Badge>
                </div>
                <button onClick={()=>{ setBidItem(item); setBidAmount(""); setBidDone(false); }} style={{
                  width:"100%", background:C.maroon, color:C.white, border:"none",
                  borderRadius:10, padding:"11px", fontWeight:700, fontSize:14, cursor:"pointer",
                }}>🔨 Place a bid</button>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit item CTA */}
        <div style={{ background:`linear-gradient(135deg, #8B1A1A, #C0392B)`, borderRadius:16, padding:"28px 24px", marginTop:40, textAlign:"center" }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:C.white, margin:"0 0 8px" }}>Have something to sell?</h3>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, margin:"0 0 18px" }}>Submit your item for next weekend's auction. It's free to list.</p>
          <a href="/seller/dashboard" style={{ background:C.gold, color:C.charcoal, padding:"11px 24px", borderRadius:10, fontWeight:700, fontSize:14 }}>Submit an item →</a>
        </div>
      </PageWrapper>

      {/* Bid modal */}
      <Modal open={!!bidItem} onClose={()=>setBidItem(null)} title={bidDone?"✅ Bid placed!":"Place your bid"}>
        {bidDone ? (
          <div style={{ textAlign:"center", padding:"12px 0" }}>
            <div style={{ fontSize:56, marginBottom:12 }}>🎉</div>
            <h3 style={{ color:C.green, fontSize:18, marginBottom:8 }}>You're the highest bidder!</h3>
            <p style={{ color:C.muted, fontSize:14, lineHeight:1.65 }}>You bid <strong>{bidItem?.currency}{bidAmount}</strong> on <strong>{bidItem?.name}</strong>. If you win, we'll notify you to complete payment.</p>
            <button onClick={()=>setBidItem(null)} style={{ marginTop:20, width:"100%", background:C.maroon, color:C.white, border:"none", borderRadius:10, padding:"12px", fontWeight:700, fontSize:14, cursor:"pointer" }}>Done</button>
          </div>
        ):(
          <div>
            <div style={{ background:C.cream, borderRadius:10, padding:14, marginBottom:18 }}>
              <div style={{ fontSize:32, textAlign:"center", marginBottom:6 }}>{bidItem?.icon}</div>
              <div style={{ fontWeight:700, fontSize:15, color:C.charcoal, textAlign:"center" }}>{bidItem?.name}</div>
              <div style={{ textAlign:"center", color:C.muted, fontSize:13 }}>by {bidItem?.seller}</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:12, padding:"10px 0", borderTop:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted, fontSize:13 }}>Current highest bid</span>
                <span style={{ fontWeight:800, fontSize:18, color:C.maroon }}>{bidItem?.currency}{bidItem?.currentBid}</span>
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:13, fontWeight:600, color:C.maroon, display:"block", marginBottom:6 }}>Your bid amount ({bidItem?.currency})</label>
              <input type="number" value={bidAmount} onChange={e=>setBidAmount(e.target.value)}
                placeholder={`Min. ${bidItem?.currency}${(bidItem?.currentBid||0)+1}`}
                style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10, padding:"12px 14px", fontSize:16, fontWeight:700, outline:"none", color:C.maroon }} />
              <p style={{ fontSize:12, color:C.muted, marginTop:4 }}>Must be higher than {bidItem?.currency}{bidItem?.currentBid}</p>
            </div>
            <button onClick={placeBid} style={{ width:"100%", background:C.maroon, color:C.white, border:"none", borderRadius:10, padding:"13px", fontWeight:700, fontSize:15, cursor:"pointer" }}>
              🔨 Confirm bid of {bidItem?.currency}{bidAmount||"—"}
            </button>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
}
