"use client";
import { useState, useRef } from "react";

const PAGES = [
  { id:"home", icon:"✨", label:"Home", grad:"from-violet-600 to-indigo-600" },
  { id:"sports", icon:"⚽", label:"Sports", grad:"from-green-600 to-emerald-600" },
  { id:"football", icon:"🏈", label:"Football", grad:"from-green-500 to-lime-500" },
  { id:"religion", icon:"🙏", label:"Religion", grad:"from-amber-600 to-orange-500" },
  { id:"chat", icon:"💬", label:"Chat", grad:"from-violet-600 to-purple-600" },
  { id:"tech", icon:"💻", label:"Tech", grad:"from-blue-600 to-cyan-400" },
  { id:"celebrities", icon:"🌟", label:"Celebs", grad:"from-fuchsia-600 to-pink-500" },
  { id:"luxury", icon:"💎", label:"Luxury", grad:"from-amber-400 to-yellow-300" },
  { id:"quotes", icon:"🔥", label:"Quotes", grad:"from-orange-500 to-red-500" },
  { id:"education", icon:"📚", label:"Learn", grad:"from-emerald-500 to-teal-500" },
  { id:"health", icon:"❤️", label:"Health", grad:"from-rose-500 to-pink-500" },
  { id:"business", icon:"💼", label:"Business", grad:"from-violet-500 to-indigo-500" },
  { id:"coding", icon:"👨‍💻", label:"Code", grad:"from-slate-700 to-zinc-800" },
  { id:"travel", icon:"🌍", label:"Travel", grad:"from-cyan-500 to-blue-500" },
  { id:"files", icon:"📁", label:"Files", grad:"from-amber-500 to-orange-500" },
];

export default function NexaVisibleThick() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [page,setPage]=useState("home");
  const [input,setInput]=useState("");
  const [msgs,setMsgs]=useState([]);
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  const fileRef=useRef(null);

  async function ask(q){
    setLoading(true);
    const now=new Date();
    const full=`Today is ${now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} Year ${now.getFullYear()}. You are NEXA auto-grows daily. Answer everything sports religion tech with THICK BOLD TOPICS.`;
    const sys=`${full} Page ${page} Q ${q} Format: Use **TOPIC IN CAPS BOLD** for main topics, ### Subtopic Bold for subtopics.`;
    try{
      const r=await fetch(`https://text.pollinations.ai/${encodeURIComponent(sys)}?model=openai&rand=${Date.now()}`);
      if(r.ok){ const t=await r.text(); if(t.length>30){ setLoading(false); return t; } }
    }catch{}
    setLoading(false); return `NEXA ${now.getFullYear()} — ask again`;
  }

  const send=async(t=input)=>{
    if(!t.trim()||loading) return;
    const q=t.trim(); setInput(""); setMsgs(m=>[...m,{role:"user", text:q}]);
    const a=await ask(q); setMsgs(m=>[...m,{role:"ai", text:a}]);
    setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const startVoice=()=>{
    const R=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!R){ alert("Use Chrome"); return; }
    const rec=new R(); rec.onstart=()=>setInput("🎤 Listening...");
    rec.onresult=(e)=>{ const t=e.results[0][0].transcript; setInput(t); setTimeout(()=>send(t),400); }; rec.start();
  };

  const cur=PAGES.find(p=>p.id===page);

  const renderThick=(text)=>{
    return text.split("\n").map((line,i)=>{
      if(line.startsWith("###") || line.startsWith("**") && line.endsWith("**")){
        return <div key={i} style={{fontSize:"18px", fontWeight:900, marginTop:"18px", marginBottom:"8px", letterSpacing:"0.02em", textTransform:"uppercase", color:"white", textShadow:"0 0 10px rgba(255,255,255,0.3)"}}>{line.replace(/#/g,"").replace(/\*\*/g,"").trim()}</div>;
      }
      if(line.startsWith("- **") || line.startsWith("**") || line.startsWith("##")){
        return <div key={i} style={{fontSize:"15px", fontWeight:800, marginTop:"12px", color:"#e9d5ff"}}>{line.replace(/#/g,"").replace(/\*\*/g,"").trim()}</div>;
      }
      return <div key={i} style={{fontSize:"14px", fontWeight:400, lineHeight:"1.7", opacity:0.9}}>{line}</div>;
    });
  };

  return (
    <div style={{minHeight:"100vh", background:"black", color:"white", position:"relative", overflow:"hidden"}}>
      {/* VISIBLE BACKGROUND - 100% VERCEL SAFE - NO TAILWIND */}
      <div style={{position:"fixed", inset:0, zIndex:0, background:"#03030f"}}>
        <div style={{position:"absolute", width:"100%", height:"100%", background:"radial-gradient(circle at 15% 15%, #7c3aed 0%, transparent 40%), radial-gradient(circle at 85% 10%, #fbbf24 0%, transparent 35%), radial-gradient(circle at 50% 90%, #2563eb 0%, transparent 45%)", opacity:1}} />
        <div style={{position:"absolute", top:0, left:0, width:700, height:700, background:"#7c3aed", borderRadius:"50%", filter:"blur(120px)", opacity:0.7}} />
        <div style={{position:"absolute", top:10, right:0, width:600, height:600, background:"#fbbf24", borderRadius:"50%", filter:"blur(130px)", opacity:0.45}} />
        <div style={{position:"absolute", bottom:0, left:"30%", width:800, height:700, background:"#2563eb", borderRadius:"50%", filter:"blur(140px)", opacity:0.65}} />
        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:900, height:900, background:"white", borderRadius:"50%", filter:"blur(220px)", opacity:0.08}} />
        <div style={{position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(124,58,237,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.12) 1px, transparent 1px)", backgroundSize:"48px 48px"}} />
      </div>

      <div style={{position:"relative", zIndex:10}}>
        <header style={{position:"sticky", top:0, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", backdropFilter:"blur(20px)", background:"rgba(0,0,0,0.5)", borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
          <div style={{display:"flex", gap:12, alignItems:"center"}}>
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{width:40, height:40, borderRadius:12, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.1)"}}>☰</button>
            <div style={{width:40, height:40, borderRadius:12, background:"linear-gradient(135deg, white, #a78bfa, #fbbf24)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"black", boxShadow:"0 0 30px rgba(124,58,237,0.8)"}}>N</div>
            <div><div style={{fontWeight:900, fontSize:12, letterSpacing:"0.15em"}}>NEXA • {cur.label.toUpperCase()}</div><div style={{fontSize:9, color:"#6ee7b7"}}>● VISIBLE CINEMATIC • THICK TOPICS</div></div>
          </div>
          <button onClick={()=>fileRef.current?.click()} style={{padding:"8px 16px", borderRadius:20, background:"white", color:"black", fontWeight:800, fontSize:11}}>+ FILE</button>
        </header>

        {menuOpen && (
          <div style={{position:"fixed", inset:0, zIndex:50, display:"flex"}}>
            <div style={{width:320, background:"rgba(8,8,26,0.98)", backdropFilter:"blur(20px)", borderRight:"1px solid rgba(255,255,255,0.1)", padding:16, overflowY:"auto"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:16}}><b style={{fontSize:11, letterSpacing:"0.3em"}}>15 PAGES • THICK TOPICS</b><button onClick={()=>setMenuOpen(false)} style={{width:32, height:32, borderRadius:20, background:"rgba(255,255,255,0.1)"}}>✕</button></div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
                {PAGES.map(p=><button key={p.id} onClick={()=>{setPage(p.id); setMenuOpen(false);}} style={{padding:12, borderRadius:16, border:"1px solid rgba(255,255,255,0.1)", textAlign:"left", background:page===p.id?"white":"rgba(255,255,255,0.05)", color:page===p.id?"black":"white"}}><div style={{width:32, height:32, borderRadius:8, background:`linear-gradient(135deg, #7c3aed, #3b82f6)`, display:"flex", alignItems:"center", justifyContent:"center"}}>{p.icon}</div><div style={{fontWeight:800, fontSize:11, marginTop:8}}>{p.label}</div></button>)}
              </div>
            </div>
            <div onClick={()=>setMenuOpen(false)} style={{flex:1, background:"rgba(0,0,0,0.6)"}} />
          </div>
        )}

        <div style={{maxWidth:1000, margin:"0 auto", minHeight:"calc(100vh - 72px)", display:"flex", flexDirection:"column"}}>
          {page==="home" && msgs.length===0? (
            <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:24}}>
              <div style={{width:"100%", maxWidth:760, borderRadius:36, padding:"2px", background:"linear-gradient(135deg, #7c3aed, white, #fbbf24)", boxShadow:"0 0 120px rgba(124,58,237,0.6)"}}>
                <div style={{borderRadius:34, background:"rgba(10,10,24,0.92)", backdropFilter:"blur(20px)", padding:"48px 40px", textAlign:"center", position:"relative", overflow:"hidden"}}>
                  <div style={{position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(124,58,237,0.15), transparent, rgba(251,191,36,0.15))"}} />
                  <div style={{position:"relative"}}>
                    <div style={{display:"inline-flex", padding:"6px 16px", borderRadius:20, background:"rgba(124,58,237,0.2)", border:"1px solid rgba(167,139,250,0.3)", fontSize:10, letterSpacing:"0.25em", fontWeight:700}}>NEXA 2026 • VISIBLE CINEMATIC</div>
                    <h1 style={{marginTop:32, fontSize:58, fontWeight:900, lineHeight:0.85, letterSpacing:"-0.02em"}}>Hey there,<br/><span style={{background:"linear-gradient(90deg, #c4b5fd, white, #fbbf24)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", filter:"drop-shadow(0 0 30px rgba(124,58,237,0.6))"}}>I'm NEXA</span></h1>
                    <p style={{marginTop:24, fontSize:16, lineHeight:"32px", color:"rgba(255,255,255,0.7)", maxWidth:520, marginLeft:"auto", marginRight:"auto"}}>I'm an AI who's here to help you answer <b style={{color:"white", fontWeight:900}}>all your questions</b> — sports, religion, tech, files, voice. Topics now <b style={{color:"white"}}>THICK & BIG</b>.</p>
                    <div style={{marginTop:32, display:"flex", gap:12, justifyContent:"center"}}>
                      <button onClick={()=>setPage("sports")} style={{padding:"16px 36px", borderRadius:30, background:"white", color:"black", fontWeight:900, fontSize:13, boxShadow:"0 0 40px rgba(255,255,255,0.4)"}}>START CHATTING →</button>
                    </div>
                    <div style={{marginTop:24, fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:"0.2em", fontWeight:700}}>GOLD • BLACK • PURPLE • WHITE • BLUE • VISIBLE ON VERCEL</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{padding:"8px 16px"}}><input ref={fileRef} type="file" multiple hidden onChange={e=>handleFiles(e.target.files)} /></div>
              <div style={{flex:1, padding:"16px 20px", display:"flex", flexDirection:"column", gap:16, overflowY:"auto"}}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                    <div style={{maxWidth:"85%", padding:"14px 20px", borderRadius:22, borderRadiusBottomRight:m.role==="user"?"8px":"22px", borderRadiusBottomLeft:m.role==="user"?"22px":"8px", background:m.role==="user"?"#2563eb":"#7c3aed", boxShadow:m.role==="user"?"0 0 25px rgba(37,99,235,0.5)":"0 0 25px rgba(124,58,237,0.5)", border:"1px solid rgba(255,255,255,0.2)"}}>
                      <div style={{fontSize:9, opacity:0.6, fontWeight:800, letterSpacing:"0.15em", marginBottom:4}}>{m.role==="user"?"YOU • RIGHT • BLUE":"NEXA • LEFT • PURPLE • 2026"}</div>
                      <div>{m.role==="user"?<div style={{fontSize:14, fontWeight:500}}>{m.text}</div>:renderThick(m.text)}</div>
                    </div>
                  </div>
                ))}
                {loading && <div style={{display:"flex", justifyContent:"flex-start"}}><div style={{padding:"14px 20px", borderRadius:22, background:"rgba(124,58,237,0.6)", fontSize:13}}>● NEXA thinking...</div></div>}
                <div ref={bottomRef} />
              </div>
            </>
          )}

          <div style={{position:"sticky", bottom:0, padding:16, background:"linear-gradient(to top, black, rgba(0,0,0,0.8), transparent)"}}>
            <div style={{maxWidth:760, margin:"0 auto", display:"flex", gap:8, padding:8, borderRadius:30, background:"rgba(255,255,255,0.08)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.15)"}}>
              <button onClick={startVoice} style={{width:44, height:44, borderRadius:22, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.2)", fontSize:18}}>🎤</button>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={`Ask ${cur.label}...`} style={{flex:1, background:"transparent", outline:"none", padding:"0 12px", fontSize:14}} />
              <button onClick={()=>send()} style={{padding:"12px 28px", borderRadius:22, background:`linear-gradient(135deg, #7c3aed, #2563eb)`, fontWeight:900, fontSize:12}}>SEND</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
