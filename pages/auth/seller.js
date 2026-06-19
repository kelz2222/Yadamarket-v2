import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/layout/Navbar";

export default function SellerAuth({ session }) {
  const router = useRouter();
  useEffect(()=>{ if(session) router.push("/seller/dashboard"); },[session,router]);

  return (
    <>
      <Head><title>Seller Sign Up — Yadamarket</title></Head>
      <Navbar session={session} />
      <div style={{ minHeight:"85vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20, background:"#FDF6F0" }}>
        <div style={{ background:"#fff", borderRadius:20, padding:36, width:"100%", maxWidth:420, boxShadow:"0 8px 40px rgba(139,26,26,0.12)" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:44, marginBottom:10 }}>🏪</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:24, color:"#8B1A1A", marginBottom:6 }}>
              Start Selling Today
            </div>
            <p style={{ color:"#7A6A5A", fontSize:14, lineHeight:1.6 }}>
              Create your seller account and reach thousands of buyers across Ghana and Nigeria
            </p>
          </div>
          <div style={{ background:"#FDF6F0", borderRadius:10, padding:"10px 14px", marginBottom:20, fontSize:13, color:"#7A6A5A", display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
            <span>🆓 Free to list</span>
            <span>💸 Get paid instantly</span>
            <span>📊 Track your orders</span>
          </div>
          <Auth supabaseClient={supabase}
            appearance={{ theme:ThemeSupa, variables:{ default:{ colors:{ brand:"#8B1A1A", brandAccent:"#C0392B" }}}}}
            providers={["google"]}
            redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/seller/dashboard`}
          />
          <p style={{ textAlign:"center", marginTop:16, fontSize:13, color:"#7A6A5A" }}>
            Looking to buy? <a href="/auth/buyer" style={{ color:"#C0392B", fontWeight:700 }}>Sign up as buyer →</a>
          </p>
        </div>
      </div>
    </>
  );
}
