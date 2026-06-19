import { useState } from "react";
import { Modal, Button, Input } from "../ui";
import { PAYMENT_COUNTRIES, DELIVERY_ZONES, generateRef } from "../../lib/payments";

const C = { maroon:"#8B1A1A", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", border:"#E8D5C0", green:"#27AE60", muted:"#7A6A5A", white:"#fff", charcoal:"#2C2C2C" };

export default function CheckoutModal({ open, onClose, product, country="GH", onSuccess }) {
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState(null);
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ref] = useState(generateRef);

  const c = PAYMENT_COUNTRIES[country] || PAYMENT_COUNTRIES.GH;
  const zones = DELIVERY_ZONES[country] || DELIVERY_ZONES.GH;
  const total = (product?.price || 0) + (delivery?.fee || 0);

  const reset = () => { setStep(1); setDelivery(null); setMethod(null); setPhone(""); setAddress(""); onClose(); };

  const handlePay = () => {
    setStep(4);
    setTimeout(() => { setStep(5); onSuccess?.({ ref, method:method?.id, amount:total }); }, 2500);
  };

  return (
    <Modal open={open} onClose={reset} title={step===5?"✅ Order Placed!":step===4?"Processing…":`Checkout · ${c.symbol}${total}`}>

      {/* Step 5 - Success */}
      {step===5 && (
        <div style={{ textAlign:"center", padding:"16px 0" }}>
          <div style={{ fontSize:60, marginBottom:14 }}>🎉</div>
          <h3 style={{ color:C.green, fontSize:18, marginBottom:8 }}>Order placed successfully!</h3>
          <p style={{ color:C.muted, fontSize:14, lineHeight:1.65, marginBottom:18 }}>
            Your order for <strong>{product?.name}</strong> is confirmed.<br/>The seller has been notified.
          </p>
          <div style={{ background:C.cream, borderRadius:12, padding:16, marginBottom:20, fontSize:13, textAlign:"left" }}>
            {[["Item", product?.name],["Seller", product?.vendor],["Delivery", delivery?.label],["Payment", method?.label],["Total", `${c.symbol}${total}`],["Ref", ref]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span style={{ fontWeight:700, fontFamily:k==="Ref"?"monospace":"inherit" }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={reset} style={{ width:"100%", background:C.maroon, color:C.white, border:"none", borderRadius:10, padding:"13px", fontWeight:700, fontSize:14, cursor:"pointer" }}>
            Track my order →
          </button>
        </div>
      )}

      {/* Step 4 - Processing */}
      {step===4 && (
        <div style={{ textAlign:"center", padding:40 }}>
          <div style={{ fontSize:44, animation:"spin 1.5s linear infinite", display:"inline-block", marginBottom:16 }}>⏳</div>
          <p style={{ fontWeight:600, color:C.charcoal, marginBottom:8 }}>Processing payment…</p>
          {method?.type==="mobile_money" && <p style={{ color:C.muted, fontSize:13 }}>📲 Check your phone for the payment prompt</p>}
        </div>
      )}

      {/* Step 1 - Product + Delivery */}
      {step===1 && (
        <div>
          <div style={{ background:C.cream, borderRadius:12, padding:16, marginBottom:20 }}>
            <div style={{ fontWeight:700, fontSize:16, color:C.charcoal }}>{product?.name}</div>
            <div style={{ color:C.muted, fontSize:13, marginTop:2 }}>Sold by {product?.vendor}</div>
            <div style={{ fontSize:26, fontWeight:800, color:C.maroon, marginTop:8 }}>{c.symbol}{product?.price}</div>
          </div>

          <p style={{ fontSize:14, fontWeight:700, color:C.maroon, marginBottom:10 }}>🚚 Choose delivery option</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
            {zones.map(z => (
              <label key={z.id} style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"12px 14px", borderRadius:10, cursor:"pointer",
                border:`2px solid ${delivery?.id===z.id?C.maroon:C.border}`,
                background:delivery?.id===z.id?C.maroon+"0A":C.white,
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <input type="radio" name="delivery" checked={delivery?.id===z.id} onChange={()=>setDelivery(z)} style={{ accentColor:C.maroon }} />
                  <span style={{ fontSize:14, fontWeight:delivery?.id===z.id?700:400 }}>{z.label}</span>
                </div>
                <span style={{ fontWeight:700, color:C.maroon }}>{z.fee===0?"Free":`+${c.symbol}${z.fee}`}</span>
              </label>
            ))}
          </div>

          {delivery && delivery.id!=="pickup" && (
            <div style={{ marginBottom:16 }}>
              <Input label="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Your full address" />
            </div>
          )}

          <div style={{ background:C.creamD, borderRadius:10, padding:"10px 14px", marginBottom:18, display:"flex", justifyContent:"space-between", fontSize:14 }}>
            <span style={{ color:C.muted }}>Total with delivery</span>
            <span style={{ fontWeight:800, fontSize:18, color:C.maroon }}>{c.symbol}{total}</span>
          </div>

          <button onClick={()=>delivery&&setStep(2)} disabled={!delivery} style={{
            width:"100%", background:delivery?C.oxred:C.border, color:C.white,
            border:"none", borderRadius:10, padding:"13px", fontWeight:700, fontSize:15, cursor:delivery?"pointer":"not-allowed",
          }}>Choose payment →</button>
        </div>
      )}

      {/* Step 2 - Payment method */}
      {step===2 && (
        <div>
          <p style={{ fontSize:14, fontWeight:700, color:C.maroon, marginBottom:12 }}>💳 How would you like to pay?</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
            {c.methods.map(m=>(
              <label key={m.id} style={{
                display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                borderRadius:10, cursor:"pointer",
                border:`2px solid ${method?.id===m.id?C.green:C.border}`,
                background:method?.id===m.id?C.green+"0A":C.white,
              }}>
                <input type="radio" name="method" checked={method?.id===m.id} onChange={()=>setMethod(m)} style={{ accentColor:C.green }} />
                <span style={{ fontSize:18 }}>{m.icon}</span>
                <span style={{ fontSize:14, fontWeight:method?.id===m.id?700:400 }}>{m.label}</span>
              </label>
            ))}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep(1)} style={{ padding:"11px 18px", borderRadius:10, border:`1.5px solid ${C.border}`, background:C.white, color:C.maroon, fontWeight:600, cursor:"pointer" }}>← Back</button>
            <button onClick={()=>method&&setStep(3)} disabled={!method} style={{ flex:1, background:method?C.oxred:C.border, color:C.white, border:"none", borderRadius:10, padding:"11px", fontWeight:700, fontSize:14, cursor:method?"pointer":"not-allowed" }}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 - Confirm */}
      {step===3 && (
        <div>
          <div style={{ background:C.cream, borderRadius:12, padding:16, marginBottom:18, fontSize:13 }}>
            {[["Item",product?.name],["Seller",product?.vendor],["Delivery",`${delivery?.label} ${delivery?.fee>0?`(+${c.symbol}${delivery.fee})`:""}`],["Payment",`${method?.icon} ${method?.label}`]].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted }}>{k}</span><span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:10, marginTop:4 }}>
              <span style={{ fontWeight:700 }}>Total</span>
              <span style={{ fontWeight:800, fontSize:20, color:C.maroon }}>{c.symbol}{total}</span>
            </div>
          </div>

          {method?.requiresPhone && (
            <div style={{ marginBottom:16 }}>
              <Input label={`${method.label} number`} value={phone} onChange={e=>setPhone(e.target.value)}
                placeholder={country==="GH"?"+233 XX XXX XXXX":"+234 XXX XXX XXXX"} type="tel" />
            </div>
          )}

          {method?.type==="card" && (
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
              <Input label="Card number" placeholder="1234 5678 9012 3456" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <Input label="Expiry" placeholder="MM / YY" />
                <Input label="CVV" placeholder="123" />
              </div>
            </div>
          )}

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep(2)} style={{ padding:"11px 18px", borderRadius:10, border:`1.5px solid ${C.border}`, background:C.white, color:C.maroon, fontWeight:600, cursor:"pointer" }}>← Back</button>
            <button onClick={handlePay} style={{ flex:1, background:C.green, color:C.white, border:"none", borderRadius:10, padding:"11px", fontWeight:700, fontSize:15, cursor:"pointer" }}>
              🔒 Pay {c.symbol}{total}
            </button>
          </div>
          <p style={{ fontSize:11, color:C.muted, textAlign:"center", marginTop:10 }}>Secured · Encrypted · Safe</p>
        </div>
      )}
    </Modal>
  );
}
