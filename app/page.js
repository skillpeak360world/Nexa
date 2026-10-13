"use client";
import { useState, useRef } from "react";

const PAGES = [
  { id:"home", label:"Home", icon:"✨" },
  { id:"sports", label:"Sports", icon:"⚽" },
  { id:"football", label:"Football", icon:"🏈" },
  { id:"religion", label:"Religion", icon:"🙏" },
  { id:"chat", label:"Chat", icon:"💬" },
  { id:"tech", label:"Tech", icon:"💻" },
  { id:"celebrities", label:"Celebs", icon:"🌟" },
  { id:"luxury", label:"Luxury", icon:"💎" },
  { id:"quotes", label:"Quotes", icon:"🔥" },
  { id:"education", label:"Learn", icon:"📚" },
  { id:"health", label:"Health", icon:"❤️" },
  { id:"business", label:"Business", icon:"💼" },
  { id:"coding", label:"Code", icon:"👨‍💻" },
  { id:"travel", label:"Travel", icon:"🌍" },
  { id:"files", label:"Files", icon:"📁" },
];

export default function NexaProFinal() {
  const [page,setPage]=useState("home");
  const [menu,setMenu]=useState(false);
  const [input,setInput]=useState("");
  const [msgs,setMsgs]=useState([]);
  const [loading,setLoading]=useState(false);
  const [speakingId,setSpeakingId]=useState(null);
  const bottomRef=useRef(null);
  const fileRef=useRef(null);
  const imgRef=useRef(null);

  async function ask(q){
    setLoading(true);
    const system=`You are NEXA AI. Be professional helpful. Only answer what user asks. Don't auto show football/date unless asked. Page ${page}. Q: ${q}`;
    try{
      const r=await fetch(`https://text.pollinations.ai/${encodeURIComponent(system)}?model=openai&rand=${Date.now()}`);
      if(r.ok){ const t=await r.text(); if(t.length>20){ setLoading(false); return t; } }
    }catch{}
    setLoading(false); return "I'm NEXA — how can I help?";
  }

  const send=async(t=input)=>{
    if(!t.trim()||loading) return;
    const q=t.trim(); setInput(""); setMsgs(m=>[...m,{role:"user",text:q}]);
    const a=await ask(q); setMsgs(m=>[...m,{role:"ai",text:a}]);
    setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  // Voice input
  const voiceIn=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){ alert("Use Chrome for voice"); return; }
    const rec=new SR(); rec.lang="en-US"; rec.onresult=(e)=>{ const txt=e.results[0][0].transcript; setInput(txt); }; rec.start();
  };

  // TTS - speak in different languages
  const speak=(text,id,lang="en-US")=>{
    if(speakingId===id){ speechSynthesis.cancel(); setSpeakingId(null); return; }
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang=lang; u.rate=0.95; u.onend=()=>setSpeakingId(null);
    setSpeakingId(id); speechSynthesis.speak(u);
  };

  const copyText=async(text)=>{
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const shareText=async(text)=>{
    if(navigator.share){ try{ await navigator.share({title:"NEXA", text}); }catch{} }
    else{ await copyText(text); }
  };

  const cur=PAGES.find(p=>p.id===page);

  return (
    <div style={{minHeight:"100vh", background:"#070711", color:"white", fontFamily:"Inter, system-ui"}}>
      <div style={{position:"fixed", inset:0, zIndex:0}}>
        <div style={{position:"absolute", top:-80, left:-80, width:650, height:650, background:"#7c3aed", borderRadius:"50%", filter:"blur(130px)", opacity:0.5}} />
        <div style={{position:"absolute", bottom:-80, right:-80, width:600, height:600, background:"#2563eb", borderRadius:"50%", filter:"blur(130px)", opacity:0.45}} />
        <div style={{position:"absolute", top:"30%", left:"50%", width:400, height:400, background:"#fbbf24", borderRadius:"50%", filter:"blur(120px)", opacity:0.15}} />
      </div>

      <div style={{position:"relative", zIndex:10}}>
        <header style={{position:"sticky", top:0, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", background:"rgba(10,10,20,0.75)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex", gap:12, alignItems:"center"}}>
            <button onClick={()=>setMenu(!menu)} style={{width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)", color:"white"}}>☰</button>
            <div style={{width:36, height:36, borderRadius:10, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"black"}}>N</div>
            <div style={{fontWeight:700, fontSize:14}}>{cur.label}</div>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button onClick={()=>imgRef.current?.click()} style={{width:34, height:34, borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)"}}>🖼️</button>
            <button onClick={()=>fileRef.current?.click()} style={{width:34, height:34, borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)"}}>📎</button>
          </div>
        </header>

        {menu&&(
          <div style={{position:"fixed", inset:0, zIndex:100, display:"flex"}}>
            <div style={{width:300, background:"#0a0a14", borderRight:"1px solid rgba(255,255,255,0.08)", padding:20}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:20}}><b style={{fontSize:11, letterSpacing:2, opacity:0.5}}>MENU</b><button onClick={()=>setMenu(false)} style={{width:28, height:28, borderRadius:20, background:"rgba(255,255,255,0.1)", color:"white"}}>✕</button></div>
              <div style={{display:"grid", gap:6}}>{PAGES.map(p=><button key={p.id} onClick={()=>{setPage(p.id); setMenu(false);}} style={{display:"flex", gap:12, padding:"12px 14px", borderRadius:12, background:page===p.id?"white":"transparent", color:page===p.id?"black":"rgba(255,255,255,0.7)", fontWeight:600, fontSize:13, border:"1px solid", borderColor:page===p.id?"white":"rgba(255,255,255,0.06)", textAlign:"left"}}><span>{p.icon}</span>{p.label}</button>)}</div>
            </div>
            <div onClick={()=>setMenu(false)} style={{flex:1, background:"rgba(0,0,0,0.5)"}} />
          </div>
        )}

        <div style={{maxWidth:860, margin:"0 auto", minHeight:"calc(100vh - 65px)", display:"flex", flexDirection:"column"}}>
          {/* Hidden file inputs - will show recent screenshots on mobile */}
          <input ref={fileRef} type="file" multiple hidden accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,image/*" onChange={e=>{const arr=Array.from(e.target.files).map(f=>f.name); setMsgs(m=>[...m,{role:"user",text:"📎 Files: "+arr.join(", ")}]);}} />
          <input ref={imgRef} type="file" multiple hidden accept="image/*" capture="environment" onChange={e=>{const arr=Array.from(e.target.files).map(f=>f.name); setMsgs(m=>[...m,{role:"user",text:"🖼️ Images: "+arr.join(", ")}]);}} />

          {msgs.length===0?(
            <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center"}}>
              <div style={{width:64, height:64, borderRadius:18, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"black", fontSize:28, marginBottom:20}}>N</div>
              <h1 style={{fontSize:40, fontWeight:800, lineHeight:1.1}}>Hey there,<br/>I'm NEXA</h1>
              <p style={{marginTop:12, color:"rgba(255,255,255,0.55)", fontSize:14, maxWidth:360, lineHeight:1.6}}>Ask me anything. I can read aloud in any language.</p>
              <div style={{marginTop:20, display:"flex", gap:8}}>
                <button onClick={()=>imgRef.current?.click()} style={{padding:"10px 16px", borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)", color:"white", fontSize:12}}>🖼️ Recent Screenshots</button>
                <button onClick={()=>fileRef.current?.click()} style={{padding:"10px 16px", borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)", color:"white", fontSize:12}}>📎 Files</button>
              </div>
            </div>
          ):(
            <div style={{flex:1, padding:"20px 14px", display:"flex", flexDirection:"column", gap:18}}>
              {msgs.map((m,i)=>(
                <div key={i} style={{display:"flex", flexDirection:"column", gap:8, alignItems:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"86%", padding:"12px 18px", borderRadius:18, borderBottomRightRadius:m.role==="user"?4:18, borderBottomLeftRadius:m.role==="user"?18:4, background:m.role==="user"?"#2563eb":"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)", fontSize:14, lineHeight:1.6, whiteSpace:"pre-wrap"}}>{m.text}</div>

                  {m.role==="ai"&&(
                    <div style={{display:"flex", gap:6, flexWrap:"wrap", paddingLeft:4}}>
                      <button onClick={()=>copyText(m.text)} style={{padding:"6px 12px", borderRadius:20, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", fontSize:11, display:"flex", gap:4, alignItems:"center"}}>⎙ Copy</button>
                      <button onClick={()=>shareText(m.text)} style={{padding:"6px 12px", borderRadius:20, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", fontSize:11}}>↗ Share</button>
                      <button onClick={()=>speak(m.text,i,"en-US")} style={{padding:"6px 12px", borderRadius:20, background:speakingId===i?"white":"rgba(255,255,255,0.07)", color:speakingId===i?"black":"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.1)", fontSize:11}}>{speakingId===i?"⏹ Stop":"🔊 EN"}</button>
                      <button onClick={()=>speak(m.text,i+"fr","fr-FR")} style={{padding:"6px 12px", borderRadius:20, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", fontSize:11}}>🔊 FR</button>
                      <button onClick={()=>speak(m.text,i+"es","es-ES")} style={{padding:"6px 12px", borderRadius:20, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", fontSize:11}}>🔊 ES</button>
                      <button onClick={()=>speak(m.text,i+"ar","ar-SA")} style={{padding:"6px 12px", borderRadius:20, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", fontSize:11}}>🔊 AR</button>
                      <button onClick={()=>speak(m.text,i+"yo","yo-NG")} style={{padding:"6px 12px", borderRadius:20, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", fontSize:11}}>🔊 YO</button>
                    </div>
                  )}
                </div>
              ))}
              {loading&&<div style={{alignSelf:"flex-start", padding:"12px 16px", borderRadius:18, background:"rgba(255,255,255,0.06)", fontSize:13, color:"rgba(255,255,255,0.5)"}}>Thinking...</div>}
              <div ref={bottomRef} />
            </div>
          )}

          <div style={{position:"sticky", bottom:0, padding:"12px 14px 22px", background:"linear-gradient(to top, #070711 60%, transparent)"}}>
            <div style={{maxWidth:700, margin:"0 auto", display:"flex", alignItems:"center", gap:8, padding:"6px 6px 6px 12px", borderRadius:28, background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.12)", backdropFilter:"blur(20px)"}}>
              <button onClick={()=>imgRef.current?.click()} style={{width:32, height:32, borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)"}}>🖼️</button>
              <button onClick={()=>fileRef.current?.click()} style={{width:32, height:32, borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)"}}>📎</button>
              <button onClick={voiceIn} style={{width:32, height:32, borderRadius:20, background:"transparent", border:"none", fontSize:16}}>🎤</button>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything..." style={{flex:1, background:"transparent", border:"none", outline:"none", color:"white", fontSize:14}} />
              <button onClick={()=>send()} style={{width:36, height:36, borderRadius:20, background:"white", color:"black", border:"none", fontWeight:800}}>↑</button>
            </div>
            <div style={{textAlign:"center", fontSize:9, color:"rgba(255,255,255,0.25)", marginTop:8}}>Tap 🖼️ for recent screenshots • 📎 for files • 🔊 to read in any language</div>
          </div>
        </div>
      </div>
    </div>
  );
}
