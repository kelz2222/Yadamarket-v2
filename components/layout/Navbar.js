import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";

const C = { maroon: "#8B1A1A", oxred: "#C0392B", gold: "#E8A838", cream: "#FDF6F0", border: "#E8D5C0", white: "#FFFFFF", muted: "#7A6A5A" };

export default function Navbar({ session }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/",          label: "Home",     icon: "🏠" },
    { href: "/markets",   label: "Markets",  icon: "🏪" },
    { href: "/vendors",   label: "Sellers",  icon: "👨‍💼" },
    { href: "/auction",   label: "Auction",  icon: "🔨" },
    { href: "/orders",    label: "Orders",   icon: "📦" },
  ];

  const signOut = async () => { await supabase.auth.signOut(); router.push("/"); };
  const isActive = (href) => router.pathname === href;

  return (
    <>
      <div className="pattern-strip" />
      <nav style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(139,26,26,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, background: C.maroon, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🛒</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: C.maroon }}>
              Yada<span style={{ color: C.oxred }}>market</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="desk-nav">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                color: isActive(l.href) ? C.white : C.muted,
                background: isActive(l.href) ? C.maroon : "transparent",
                display: "flex", alignItems: "center", gap: 5,
                transition: "all 0.15s",
              }}>
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {session ? (
              <>
                <Link href="/account" style={{ fontSize: 13, fontWeight: 600, color: C.maroon, padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${C.border}` }}>
                  👤 Account
                </Link>
                <button onClick={signOut} style={{ fontSize: 13, fontWeight: 600, color: C.white, padding: "7px 14px", borderRadius: 8, background: C.oxred, border: "none" }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/buyer" style={{ fontSize: 13, fontWeight: 600, color: C.maroon, padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${C.border}` }}>
                  Sign in
                </Link>
                <Link href="/auth/buyer" style={{ fontSize: 13, fontWeight: 700, color: C.white, padding: "7px 16px", borderRadius: 8, background: C.maroon }}>
                  Join free
                </Link>
              </>
            )}
            <button onClick={() => setOpen(!open)} className="mob-btn" style={{ background: "none", border: "none", fontSize: 24, color: C.maroon, display: "none", padding: 4 }}>☰</button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "12px 20px 20px" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 0", fontSize: 15, fontWeight: 600,
                color: isActive(l.href) ? C.oxred : C.maroon,
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Link href="/auth/buyer" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: 8, background: C.maroon, color: C.white, fontWeight: 700, fontSize: 14 }}>
                Buyer Sign up
              </Link>
              <Link href="/auth/seller" style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: 8, background: C.oxred, color: C.white, fontWeight: 700, fontSize: 14 }}>
                Seller Sign up
              </Link>
            </div>
          </div>
        )}
      </nav>
      <style>{`@media(max-width:700px){.desk-nav{display:none!important}.mob-btn{display:block!important}}`}</style>
    </>
  );
}
