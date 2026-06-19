import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/layout/Navbar";

export default function BuyerAuth({ session }) {
  const router = useRouter();
  useEffect(()=>{ if(session) router.push("/"); },[session,router]);

  return (
    <>
      <Head><title>Buyer Sign Up — Yadamarket</title></Head>
      <Navbar session={session} />
      <div style={{ minHeight:"85vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20, background:"#FDF6F0" }}>
        <div style={{ background:"#fff", borderRadius:20, padding:36, width:"100%", maxWidth:420, boxShadow:"0 8px 40px rgba(139,26,26,0.12)" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:44, marginBottom:10 }}>🛒</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:24, color:"#8B1A1A", marginBottom:6 }}>
              Shop on Yadamarket
            </div>
            <p style={{ color:"#7A6A5A", fontSize:14, lineHeight:1.6 }}>
              Create your free buyer account to shop from verified sellers across Ghana and Nigeria
            </p>
          </div>
          <div style={{ background:"#FDF6F0", borderRadius:10, padding:"10px 14px", marginBottom:20, fontSize:13, color:"#7A6A5A", display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
            <span>✅ Free to join</span>
            <span>🔒 Secure payments</span>
            <span>📦 Order tracking</span>
          </div>
          <Auth supabaseClient={supabase}
            appearance={{ theme:ThemeSupa, variables:{ default:{ colors:{ brand:"#8B1A1A", brandAccent:"#C0392B" }}}}}
            providers={["google"]}
            redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/`}
          />
          <p style={{ textAlign:"center", marginTop:16, fontSize:13, color:"#7A6A5A" }}>
            Are you a seller? <a href="/auth/seller" style={{ color:"#C0392B", fontWeight:700 }}>Sign up as seller →</a>
          </p>
        </div>
      </div>
    </>
  );
}
