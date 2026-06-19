export default function Footer() {
  return (
    <>
      <div className="pattern-strip" />
      <footer style={{ background: "#8B1A1A", color: "rgba(255,255,255,0.75)", padding: "44px 20px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 32, marginBottom: 36 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 8 }}>
                Yada<span style={{ color: "#E8A838" }}>market</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7 }}>Market streaming live —<br />see it, buy it.</p>
            </div>
            {[
              { title: "Shop",    links: ["All Markets","All Sellers","Weekend Auction","New Arrivals"] },
              { title: "Sell",    links: ["Become a Seller","How it Works","Seller Dashboard","Pricing"] },
              { title: "Help",    links: ["Help Centre","Delivery Info","Returns","Contact Us"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: "#E8A838", fontSize: 12, fontWeight: 700, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>{col.title}</h4>
                {col.links.map(l => <div key={l} style={{ marginBottom: 9, fontSize: 13, cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20, fontSize: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span>© 2026 Yadamarket. All rights reserved.</span>
            <span>🇬🇭 Ghana · 🇳🇬 Nigeria</span>
          </div>
        </div>
      </footer>
    </>
  );
}
