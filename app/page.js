"use client";
import { useState, useRef } from "react";

const PAGES = [
  { id:"home", label:"Home", icon:"✨", color:"#7c3aed" },
  { id:"sports", label:"Sports", icon:"⚽", color:"#16a34a" },
  { id:"football", label:"Football", icon:"🏈", color:"#22c55e" },
  { id:"religion", label:"Religion", icon:"🙏", color:"#f59e0b" },
  { id:"chat", label:"Chat", icon:"💬", color:"#7c3aed" },
  { id:"tech", label:"Tech", icon:"💻", color:"#2563eb" },
  { id:"celebrities", label:"Celebs", icon:"🌟", color:"#e11d48" },
  { id:"luxury", label:"Luxury", icon:"💎", color:"#fbbf24" },
  { id:"quotes", label:"Quotes", icon:"🔥", color:"#f97316" },
  { id:"education", label:"Learn", icon:"📚", color:"#10b981" },
  { id:"health", label:"Health", icon:"❤️", color:"#ec4899" },
  { id:"business", label:"Business", icon:"💼", color:"#6366f1" },
  { id:"coding", label:"Code", icon:"👨‍💻", color:"#475569" },
  { id:"travel", label:"Travel", icon:"🌍", color:"#06b6d4" },
  { id:"files", label:"Files", icon:"📁", color:"#f59e0b" },
];

export default function NexaComplete() {
  const [page,setPage]=useState("home");
  const [menu,setMenu]=useState(false);
  const [input,setInput]=useState("");
  const [msgs,setMsgs]=useState([]);
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  const fileRef=useRef(null);

  async function ask(q){
    setLoading(true);
    const now=new Date();
    const dateStr=now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    const year=now.getFullYear();
    const system=`You are NEXA AI ${year}. Today is ${dateStr}. You auto-grow daily. Knowledge cutoff is TODAY. You answer EVERYTHING: Sports ${year} Premier League table Champions League Ballon dOr, Football stats, Religion Christianity Islam Buddhism Hinduism with respect and verses, Tech, Business, Health, Education, etc. Never refuse. Format with THICK TOPICS using CAPS. Current page ${page}. User question: ${q}`;
    try{
      const r=await fetch(`https://text.pollinations.ai/${encodeURIComponent(system)}?model=openai&rand=${Date.now()}`);
      if(r.ok){ const t=await r.text(); if(t.length>40){ setLoading(false); return t; } }
    }catch(e){}
    setLoading(false);
    return `NEXA ${year} ${dateStr} — I am live. Ask again about sports, religion, football, anything!`;
  }

  const send=async(t=input)=>{
    if(!t.trim()||loading) return;
    const q=t.trim(); setInput("");
    setMsgs(m=>[...m,{role:"user",text:q}]);
    const a=await ask(q);
    setMsgs(m=>[...m,{role:"ai",text:a}]);
    setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const voice=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){ alert("Use Chrome for voice - 100+ languages"); return; }
    const rec=new SR();
    rec.onstart=()=>setInput("🎤 Listening...");
    rec.onresult=(e)=>{ const txt=e.results[0][0].transcript; setInput(txt); setTimeout(()=>send(txt),400); };
    rec.start();
  };

  const cur=PAGES.find(p=>p.id===page);

  const renderMsg=(text)=>{
    return text.split("\n").map((line,i)=>{
      const clean=line.trim();
      if(!clean) return <div key={i} style={{height:8}} />;
      if(clean.length<60 && (clean===clean.toUpperCase() || clean.startsWith("**") || clean.includes(":"))){
        return <div key={i} style={{fontSize:18, fontWeight:900, marginTop:16, marginBottom:6, color:"white", letterSpacing:0.3, textTransform:"uppercase"}}>{clean.replace(/\*\*/g,"")}</div>;
      }
      if(clean.startsWith("-") || clean.startsWith("•")){
        return <div key={i} style={{fontSize:15, fontWeight:700, marginTop:8, color:"#e9d5ff", marginLeft:10}}>{clean}</div>;
      }
      return <div key={i} style={{fontSize:14, fontWeight:400, lineHeight:1.7, opacity:0.9}}>{clean.replace(/\*\*/g,"")}</div>;
    });
  };

  return (
    <div style={{minHeight:"100vh", background:"#02020a", color:"white", fontFamily:"system-ui, -apple-system"}}>
      {/* VISIBLE BACKGROUND - VERCEL SAFE */}
      <div style={{position:"fixed", inset:0, zIndex:0, background:"#030310"}}>
        <div style={{position:"absolute", inset:0, background:"radial-gradient(900px 600px at 10% 0%, rgba(124,58,237,0.9) 0%, transparent 55%), radial-gradient(700px 500px at 90% 10%, rgba(251,191,36,0.8) 0%, transparent 50%), radial-gradient(800px 600px at 50% 100%, rgba(37,99,235,0.9) 0%, transparent 60%)"}} />
        <div style={{position:"absolute", top:-50, left:-50, width:650, height:650, background:"#7c3aed", borderRadius:"50%", filter:"blur(110px)", opacity:0.8}} />
        <div style={{position:"absolute", top:20, right:-30, width:550, height:550, background:"#fbbf24", borderRadius:"50%", filter:"blur(110px)", opacity:0.55}} />
        <div style={{position:"absolute", bottom:-80, left:"25%", width:750, height:650, background:"#2563eb", borderRadius:"50%", filter:"blur(120px)", opacity:0.75}} />
        <div style={{position:"absolute", inset:0, opacity:0.12, backgroundImage:"linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)", backgroundSize:"48px 48px"}} />
      </div>

      <div style={{position:"relative", zIndex:10}}>
        <header style={{position:"sticky", top:0, zIndex:20, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(18px)", borderBottom:"1px solid rgba(255,255,255,0.12)"}}>
          <div style={{display:"flex", gap:12, alignItems:"center"}}>
            <button onClick={()=>setMenu(!menu)} style={{width:40, height:40, borderRadius:12, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.15)", color:"white", fontSize:18}}>☰</button>
            <div style={{width:40, height:40, borderRadius:12, background:"linear-gradient(135deg, white, #a78bfa, #fbbf24)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"black", boxShadow:"0 0 30px rgba(124,58,237,0.7)"}}>N</div>
            <div><div style={{fontWeight:900, fontSize:13, letterSpacing:1}}>{cur.label.toUpperCase()} • NEXA</div><div style={{fontSize:9, color:"#6ee7b7", fontWeight:700}}>● VISIBLE • THICK TOPICS • {new Date().toLocaleDateString()}</div></div>
          </div>
          <button onClick={()=>fileRef.current?.click()} style={{padding:"9px 16px", borderRadius:24, background:"white", color:"black", fontWeight:900, fontSize:11}}>+ FILE</button>
        </header>

        {menu&&(
          <div style={{position:"fixed", inset:0, zIndex:100, display:"flex"}}>
            <div style={{width:330, background:"rgba(8,8,24,0.98)", backdropFilter:"blur(20px)", borderRight:"1px solid rgba(255,255,255,0.1)", padding:16, overflowY:"auto"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}><b style={{fontSize:12, letterSpacing:2}}>15 PAGES • COMPLETE</b><button onClick={()=>setMenu(false)} style={{width:32, height:32, borderRadius:20, background:"rgba(255,255,255,0.1)", color:"white"}}>✕</button></div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                {PAGES.map(p=><button key={p.id} onClick={()=>{setPage(p.id); setMenu(false);}} style={{padding:12, borderRadius:16, border:"1px solid rgba(255,255,255,0.1)", textAlign:"left", background:page===p.id?"white":"rgba(255,255,255,0.06)", color:page===p.id?"black":"white"}}><div style={{width:32, height:32, borderRadius:10, background:p.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16}}>{p.icon}</div><div style={{fontWeight:900, fontSize:12, marginTop:8}}>{p.label}</div><div style={{fontSize:9, opacity:0.6, marginTop:2, fontWeight:700}}>{p.id.toUpperCase()}</div></button>)}
              </div>
              <div style={{marginTop:20, padding:12, borderRadius:14, background:"rgba(124,58,237,0.15)", border:"1px solid rgba(124,58,237,0.3)"}}>
                <div style={{fontSize:11, fontWeight:900}}>BACKGROUND: VISIBLE</div><div style={{fontSize:10, opacity:0.7, marginTop:4}}>Gold + Purple + Blue + White + Grid — forced inline so Vercel shows it 100%</div>
              </div>
            </div>
            <div onClick={()=>setMenu(false)} style={{flex:1, background:"rgba(0,0,0,0.6)"}} />
          </div>
        )}

        <div style={{maxWidth:1000, margin:"0 auto", minHeight:"calc(100vh - 62px)", display:"flex", flexDirection:"column"}}>
          {page==="home"&&msgs.length===0?(
            <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:24}}>
              <div style={{width:"100%", maxWidth:760, borderRadius:36, padding:2, background:"linear-gradient(135deg, #7c3aed, white, #fbbf24)", boxShadow:"0 0 100px rgba(124,58,237,0.6)"}}>
                <div style={{borderRadius:34, background:"rgba(10,10,22,0.92)", padding:44, textAlign:"center", position:"relative", overflow:"hidden"}}>
                  <div style={{position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(124,58,237,0.15), transparent, rgba(251,191,36,0.12))"}} />
                  <div style={{position:"relative"}}>
                    <div style={{display:"inline-block", padding:"7px 16px", borderRadius:24, background:"rgba(124,58,237,0.2)", border:"1px solid rgba(167,139,250,0.35)", fontSize:10, fontWeight:800, letterSpacing:2}}>NEXA 2026 • ULTRA CINEMATIC • VISIBLE</div>
                    <h1 style={{marginTop:28, fontSize:60, fontWeight:900, lineHeight:0.9, letterSpacing:-1}}>Hey there,<br/><span style={{color:"#c4b5fd"}}>I'm NEXA</span></h1>
                    <p style={{marginTop:20, fontSize:16, lineHeight:1.8, color:"rgba(255,255,255,0.7)", maxWidth:520, marginLeft:"auto", marginRight:"auto"}}>I'm an AI who's here to help you answer <b style={{color:"white", fontWeight:900}}>all your questions</b>. Sports, football tables, religion, tech, business, health, code. Now with <b style={{color:"white"}}>THICK BIG TOPICS</b> and visible background.</p>
                    <div style={{marginTop:28, display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap"}}>
                      <button onClick={()=>setPage("sports")} style={{padding:"15px 34px", borderRadius:30, background:"white", color:"black", fontWeight:900, fontSize:13}}>START CHATTING →</button>
                      <button onClick={()=>fileRef.current?.click()} style={{padding:"15px 34px", borderRadius:30, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontWeight:800, fontSize:13}}>📎 UPLOAD</button>
                    </div>
                    <div style={{marginTop:20, fontSize:9, color:"rgba(255,255,255,0.25)", letterSpacing:2, fontWeight:700}}>GOLD • BLACK • PURPLE • WHITE • BLUE • THICK TOPICS • VERCEL VISIBLE</div>
                  </div>
                </div>
              </div>
            </div>
          ):(
            <>
              <input ref={fileRef} type="file" multiple hidden onChange={e=>{ const arr=Array.from(e.target.files).map(f=>f.name); setMsgs(m=>[...m,{role:"user",text:"📎 Files: "+arr.join(", ")}]); }} />
              <div style={{flex:1, padding:"18px 16px", display:"flex", flexDirection:"column", gap:16, overflowY:"auto"}}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                    <div style={{maxWidth:"86%", padding:"14px 20px", borderRadius:22, borderBottomRightRadius:m.role==="user"?6:22, borderBottomLeftRadius:m.role==="user"?22:6, background:m.role==="user"?"#2563eb":"#7c3aed", boxShadow:m.role==="user"?"0 0 24px rgba(37,99,235,0.55)":"0 0 24px rgba(124,58,237,0.55)", border:"1px solid rgba(255,255,255,0.22)"}}>
                      <div style={{fontSize:9, fontWeight:800, opacity:0.6, marginBottom:6, letterSpacing:1}}>{m.role==="user"?"YOU • RIGHT • BLUE":"NEXA • LEFT • PURPLE • THICK"}</div>
                      <div>{m.role==="user"?<div style={{fontSize:14, fontWeight:500}}>{m.text}</div>:renderMsg(m.text)}</div>
                    </div>
                  </div>
                ))}
                {loading&&<div style={{padding:"14px 20px", borderRadius:20, background:"rgba(124,58,237,0.65)", width:"fit-content", fontSize:13}}>● NEXA thinking in 2026...</div>}
                <div ref={bottomRef} />
              </div>
            </>
          )}

          <div style={{position:"sticky", bottom:0, padding:14, background:"linear-gradient(to top, black 20%, rgba(0,0,0,0.7), transparent)"}}>
            <div style={{maxWidth:760, margin:"0 auto", display:"flex", gap:8, padding:8, borderRadius:32, background:"rgba(255,255,255,0.09)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.16)", boxShadow:"0 20px 60px rgba(0,0,0,0.7)"}}>
              <button onClick={voice} style={{width:44, height:44, borderRadius:22, background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.2)", fontSize:18}}>🎤</button>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={`Ask ${cur.label} — sports, religion, football...`} style={{flex:1, background:"transparent", border:"none", outline:"none", color:"white", fontSize:14, padding:"0 10px"}} />
              <button onClick={()=>send()} style={{padding:"12px 26px", borderRadius:24, background:"white", color:"black", fontWeight:900, fontSize:12}}>SEND</button>
            </div>
            <div style={{textAlign:"center", fontSize:9, color:"rgba(255,255,255,0.3)", marginTop:6, letterSpacing:1}}>🎤 100+ LANGUAGES • VISIBLE BACKGROUND • THICK TOPICS • COMPLETE NEXA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
