const C = { maroon:"#8B1A1A", maroonD:"#6B1313", oxred:"#C0392B", gold:"#E8A838", cream:"#FDF6F0", creamD:"#F5E6D3", charcoal:"#2C2C2C", muted:"#7A6A5A", border:"#E8D5C0", white:"#FFFFFF", green:"#27AE60", red:"#E53E3E" };

export function Button({ children, onClick, variant="oxred", size="md", style:s={}, disabled=false }) {
  const sizes = { sm:{padding:"7px 16px",fontSize:13}, md:{padding:"11px 22px",fontSize:14}, lg:{padding:"14px 28px",fontSize:16} };
  const variants = {
    oxred:  { background:C.oxred,  color:C.white },
    maroon: { background:C.maroon, color:C.white },
    green:  { background:C.green,  color:C.white },
    gold:   { background:C.gold,   color:C.charcoal },
    ghost:  { background:"transparent", color:C.maroon, border:`1.5px solid ${C.border}` },
    outline:{ background:"transparent", color:C.oxred,  border:`1.5px solid ${C.oxred}` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      border:"none", borderRadius:10, cursor:disabled?"not-allowed":"pointer",
      fontFamily:"'Inter',sans-serif", fontWeight:700,
      transition:"all 0.15s", display:"inline-flex", alignItems:"center", gap:6,
      opacity:disabled?0.55:1, ...sizes[size], ...variants[variant], ...s,
    }}>{children}</button>
  );
}

export function Card({ children, style:s={}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background:C.white, borderRadius:14,
      border:`1.5px solid ${C.border}`,
      boxShadow:"0 2px 10px rgba(139,26,26,0.07)",
      overflow:"hidden", cursor:onClick?"pointer":"default",
      transition:"box-shadow 0.18s, transform 0.18s", ...s,
    }}
      onMouseEnter={e=>{ if(onClick){e.currentTarget.style.boxShadow="0 8px 28px rgba(139,26,26,0.14)";e.currentTarget.style.transform="translateY(-2px)"}}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 2px 10px rgba(139,26,26,0.07)";e.currentTarget.style.transform="none"}}
    >{children}</div>
  );
}

export function Badge({ children, color=C.maroon }) {
  return <span style={{ background:color+"18", color, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{children}</span>;
}

export function StarRating({ rating, size=13 }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:2 }}>
      <span style={{ color:C.gold, fontSize:size }}>{"★".repeat(Math.floor(rating))}{"☆".repeat(5-Math.floor(rating))}</span>
      <span style={{ color:C.muted, fontSize:size-2, marginLeft:2 }}>{rating}</span>
    </span>
  );
}

export function Input({ label, hint, error, ...props }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      {label && <label style={{ fontSize:13, fontWeight:600, color:C.maroon }}>{label}</label>}
      <input {...props} style={{
        border:`1.5px solid ${error?C.red:C.border}`, borderRadius:10,
        padding:"11px 14px", fontSize:14, outline:"none",
        background:C.white, color:C.charcoal, width:"100%",
        transition:"border-color 0.15s", ...props.style,
      }}
        onFocus={e=>e.target.style.borderColor=C.maroon}
        onBlur={e=>e.target.style.borderColor=error?C.red:C.border}
      />
      {hint && <span style={{ fontSize:11, color:C.muted }}>{hint}</span>}
      {error && <span style={{ fontSize:11, color:C.red }}>{error}</span>}
    </div>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      {label && <label style={{ fontSize:13, fontWeight:600, color:C.maroon }}>{label}</label>}
      <select {...props} style={{
        border:`1.5px solid ${C.border}`, borderRadius:10,
        padding:"11px 14px", fontSize:14, outline:"none",
        background:C.white, color:C.charcoal, width:"100%", cursor:"pointer",
      }}>{children}</select>
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(44,10,10,0.6)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:C.white, borderRadius:18, padding:28,
        maxWidth:500, width:"100%", maxHeight:"90vh", overflowY:"auto",
        boxShadow:"0 20px 60px rgba(139,26,26,0.2)",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <h2 style={{ margin:0, fontSize:19, color:C.maroon, fontFamily:"'Playfair Display',serif" }}>{title}</h2>
          <button onClick={onClose} style={{ border:"none", background:"none", fontSize:24, cursor:"pointer", color:C.muted }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = { pending:"#E8A838", confirmed:"#3D6B57", packed:"#3D6B57", in_transit:"#C0392B", delivered:"#27AE60", cancelled:"#E53E3E" };
  const color = map[status] || C.muted;
  return <span style={{ background:color+"20", color, fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{status.replace("_"," ").replace(/\b\w/g,l=>l.toUpperCase())}</span>;
}

export function SectionTitle({ children, action }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#8B1A1A", margin:0 }}>{children}</h2>
      {action}
    </div>
  );
}

export function PageWrapper({ children }) {
  return <div style={{ maxWidth:1100, margin:"0 auto", padding:"36px 16px" }}>{children}</div>;
}

export function Spinner() {
  return (
    <div style={{ display:"flex", justifyContent:"center", padding:48 }}>
      <div style={{ width:32, height:32, borderRadius:"50%", border:"3px solid #E8D5C0", borderTopColor:"#8B1A1A", animation:"spin 0.8s linear infinite" }} />
    </div>
  );
}

export function EmptyState({ icon, title, message, action }) {
  return (
    <div style={{ textAlign:"center", padding:"60px 20px" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>{icon}</div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#8B1A1A", marginBottom:8 }}>{title}</h3>
      <p style={{ color:"#7A6A5A", fontSize:14, marginBottom:24, lineHeight:1.6 }}>{message}</p>
      {action}
    </div>
  );
}
