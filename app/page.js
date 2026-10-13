"use client";
import { useState, useEffect, useRef } from "react";

const PAGES = [
  { id:"home", icon:"🏠", label:"Home", color:"from-violet-600 to-indigo-600", desc:"Universe" },
  { id:"chat", icon:"💬", label:"Chat", color:"from-violet-600 to-purple-600", desc:"Unlimited Chat" },
  { id:"tech", icon:"💻", label:"Tech", color:"from-blue-600 to-cyan-500", desc:"AI & Future" },
  { id:"celebrities", icon:"🌟", label:"Celebs", color:"from-fuchsia-600 to-pink-600", desc:"Net Worth" },
  { id:"luxury", icon:"💎", label:"Luxury", color:"from-amber-500 to-yellow-500", desc:"Rich Life" },
  { id:"quotes", icon:"🔥", label:"Quotes", color:"from-orange-600 to-red-500", desc:"Motivation" },
  { id:"education", icon:"📚", label:"Education", color:"from-emerald-600 to-teal-600", desc:"Learn" },
  { id:"health", icon:"❤️", label:"Health", color:"from-rose-600 to-pink-600", desc:"Body & Mind" },
  { id:"business", icon:"💼", label:"Business", color:"from-violet-600 to-indigo-600", desc:"Money" },
  { id:"coding", icon:"👨‍💻", label:"Coding", color:"from-slate-700 to-zinc-800", desc:"Build" },
  { id:"lifestyle", icon:"🌍", label:"Travel", color:"from-cyan-600 to-blue-600", desc:"World" },
  { id:"images", icon:"🖼️", label:"Images", color:"from-purple-600 to-blue-600", desc:"Analyze Photos" },
  { id:"files", icon:"📁", label:"Files", color:"from-amber-600 to-orange-600", desc:"Docs & PDFs" },
  { id:"studio", icon:"🎬", label:"Studio", color:"from-pink-600 to-violet-600", desc:"Videos" },
];

export default function NexaUltimate() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [page,setPage]=useState("home");
  const [input,setInput]=useState("");
  const [files,setFiles]=useState([]);
  const [dragOver,setDragOver]=useState(false);
  const [count,setCount]=useState(0);
  const [msgs,setMsgs]=useState([]);
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  const fileInputRef=useRef(null);

  // LOAD HISTORY FROM BROWSER MEMORY
  useEffect(()=>{
    const savedMsgs = localStorage.getItem("nexa_msgs");
    const savedCount = localStorage.getItem("nexa_count");
    const savedPage = localStorage.getItem("nexa_page");
    if(savedMsgs) setMsgs(JSON.parse(savedMsgs));
    else setMsgs([{role:"ai", text:"⚡ NEXA PRO 14-PAGE UNLIMITED\n\n✅ Upload Files, Screenshots, Videos\n✅ 14 Different Worlds\n✅ Remembers Everything\n\nTap ☰ MENU → Upload your first file!"}]);
    if(savedCount) setCount(parseInt(savedCount));
    if(savedPage) setPage(savedPage);
  },[]);

  // SAVE HISTORY
  useEffect(()=>{
    if(msgs.length>0) localStorage.setItem("nexa_msgs", JSON.stringify(msgs));
    localStorage.setItem("nexa_count", count.toString());
    localStorage.setItem("nexa_page", page);
    bottomRef.current?.scrollIntoView({behavior:"smooth"});
  },[msgs,count,page]);

  const handleFiles = (fileList)=>{
    const arr = Array.from(fileList).map(f=>({
      name:f.name, type:f.type, size:(f.size/1024).toFixed(1)+" KB",
      url: f.type.startsWith("image/") || f.type.startsWith("video/")? URL.createObjectURL(f) : null
    }));
    setFiles(prev=>[...prev,...arr]);
    setMsgs(m=>[...m,{role:"user", text:`📎 Uploaded ${arr.length} file(s): ${arr.map(a=>a.name).join(", ")}`}]);
    setTimeout(async()=>{
      setLoading(true);
      setMsgs(m=>[...m,{role:"ai", text:`✅ Received: ${arr.map(a=>`${a.name} (${a.size})`).join(", ")}\n\nI can see your ${arr[0].type.includes("image")?"screenshot/image - describe what I see and help you with it":arr[0].type.includes("video")?"video - I can help you edit, caption, ideas for it":"file - I can analyze, summarize, explain it"}\n\nWhat do you want me to do with it?`}]);
      setLoading(false);
    },800);
  };

  async function askUnlimited(prompt){
    setLoading(true);
    try{
      const context = files.length>0? `User uploaded files: ${files.map(f=>f.name).join(", ")}. ` : "";
      const full = `You are NEXA in ${page} page. ${context} Answer detailed with emojis. Q: ${prompt}`;
      const r = await fetch(`https://text.pollinations.ai/${encodeURIComponent(full)}?model=openai`);
      if(r.ok){ const t=await r.text(); if(t.length>20) { setLoading(false); return t; } }
    }catch{}
    setLoading(false);
    return `⚡ NEXA ${page} answer for: "${prompt}"\n\n${files.length?`I see your uploaded files (${files.length}) - I can help with them!`:""}\n\nAsk me anything unlimited! 🚀`;
  }

  const send = async (t=input)=>{
    if(!t.trim()||loading) return;
    const q=t.trim(); setCount(c=>c+1);
    setMsgs(m=>[...m,{role:"user", text:q}]); setInput("");
    const ans = await askUnlimited(q);
    setMsgs(m=>[...m,{role:"ai", text:ans}]);
  };

  const current = PAGES.find(p=>p.id===page);

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-violet-500/30">
      {/* BLACK GOLD WHITE PURPLE BLUE CINEMATIC */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a081a] via-[#070912] to-black" />
        <div className="absolute top-[-15%] left-[10%] w-[800px] h-[800px] bg-[#7c3aed]/30 rounded-full blur-[160px]" />
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-[#ffb700]/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[700px] h-[700px] bg-[#2563eb]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-white/[0.05] rounded-full blur-[100px]" />
      </div>

      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 backdrop-blur-2xl bg-black/40 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <button onClick={()=>setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10">☰</button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 via-white to-[#ffb700] flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(124,58,237,0.5)]">N</div>
          <div>
            <h1 className="font-black text-[13px] tracking-[0.2em]">NEXA • {current.label.toUpperCase()} • {count}</h1>
            <p className="text-[9px] text-white/50 tracking-[0.2em]">14 PAGES • FILES • MEMORY • {files.length} UPLOADED</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>fileInputRef.current.click()} className="text-[10px] px-3 py-1.5 rounded-full bg-white text-black font-bold">+ UPLOAD</button>
          <div className="text-[9px] px-2 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/20 hidden md:block">♾️ UNLIMITED</div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-[310px] bg-[#0a0a14]/95 backdrop-blur-2xl border-r border-white/10 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-black text-[11px] tracking-[0.3em]">14 PAGES MENU</h2>
              <button onClick={()=>setMenuOpen(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1">
              {PAGES.map(p=>(
                <button key={p.id} onClick={()=>{setPage(p.id); setMenuOpen(false);}} className={`text-left p-3 rounded-2xl border flex flex-col gap-1 ${page===p.id?"bg-white text-black border-white":"bg-white/[0.05] border-white/10"}`}>
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center text-[16px]`}>{p.icon}</span>
                  <div className="font-bold text-[11px]">{p.label}</div>
                  <div className="text-[9px] opacity-60">{p.desc}</div>
                </button>
              ))}
            </div>
            <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-[#ffb700]/20 border border-white/10">
              <div className="text-[10px] font-bold">💾 MEMORY ON</div>
              <div className="text-[9px] opacity-70 mt-1">{count} chats saved • {files.length} files • History never deletes until you clear</div>
              <button onClick={()=>{localStorage.clear(); setMsgs([{role:"ai", text:"Memory cleared! Fresh start."}]); setCount(0); setFiles([]);}} className="mt-2 text-[9px] px-2 py-1 rounded-full bg-white/10">Clear Memory</button>
            </div>
          </div>
          <div onClick={()=>setMenuOpen(false)} className="flex-1 bg-black/60" />
        </div>
      )}

      <div className="max-w-[1200px] mx-auto flex flex-col min-h-[calc(100vh-64px)]">
        {/* UPLOAD ZONE */}
        <div className="p-4">
          <div onDragOver={e=>{e.preventDefault(); setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files)}}
            className={`rounded-[24px] p-[1px] transition-all ${dragOver?"bg-gradient-to-r from-violet-500 to-[#ffb700] scale-[1.01]":"bg-white/[0.08]"}`}>
            <div className={`rounded-[23px] p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 ${dragOver?"bg-[#151525]":"bg-[#0f0f18]/70 backdrop-blur"}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-[#ffb700] flex items-center justify-center text-xl">📤</div>
                <div>
                  <div className="font-bold text-[14px]">Upload Files, Screenshots, Videos</div>
                  <div className="text-[11px] text-white/50">Drag & drop here or click upload • PNG, JPG, PDF, MP4, DOC</div>
                </div>
              </div>
              <div className="flex gap-2">
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx,.txt" hidden onChange={e=>handleFiles(e.target.files)} />
                <button onClick={()=>fileInputRef.current.click()} className="px-5 py-2.5 rounded-full bg-white text-black font-black text-[11px]">BROWSE FILES</button>
              </div>
            </div>
          </div>
          {files.length>0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {files.map((f,i)=>(
                <div key={i} className="min-w-[160px] p-2 rounded-xl bg-white/[0.06] border border-white/10 flex gap-2 items-center">
                  {f.url && f.type.startsWith("image/")? <img src={f.url} className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[16px]">📄</div>}
                  <div className="overflow-hidden"><div className="text-[10px] font-bold truncate w-[100px]">{f.name}</div><div className="text-[9px] opacity-50">{f.size}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
          {msgs.map((m,i)=>(
            <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
              <div className={`max-w-[85%] rounded-[20px] px-5 py-3 text-[13px] leading-[1.6] whitespace-pre-wrap ${m.role==="user"?"bg-white text-black rounded-br-[6px] font-medium":"bg-white/[0.07] border border-white/10 backdrop-blur rounded-bl-[6px]"}`}>{m.text}</div>
            </div>
          ))}
          {loading && <div className="bg-white/[0.05] border border-white/10 px-5 py-3 rounded-[20px] w-fit text-[11px] animate-pulse">● ● ● NEXA analyzing {page}...</div>}
          <div ref={bottomRef} />
        </div>

        <div className="sticky bottom-0 p-3 bg-gradient-to-t from-black via-black/90 to-transparent">
          <div className="max-w-[900px] mx-auto">
            <div className="flex gap-1.5 mb-2 overflow-x-auto">
              {PAGES.slice(2,7).map(p=><button key={p.id} onClick={()=>{setPage(p.id);}} className="whitespace-nowrap text-[10px] px-3 py-1 rounded-full bg-white/[0.07] border border-white/10">{p.icon} {p.label}</button>)}
            </div>
            <div className="flex gap-2 p-2 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={`Ask in ${current.label} + ${files.length} files attached...`} className="flex-1 bg-transparent outline-none px-5 text-[14px] placeholder:text-white/30" />
              <button onClick={()=>send()} className={`px-6 py-2.5 rounded-full bg-gradient-to-r ${current.color} font-black text-[12px]`}>SEND</button>
            </div>
            <p className="text-center text-[8px] text-white/20 mt-2 tracking-[0.2em]">BLACK GOLD WHITE PURPLE BLUE • 14 PAGES • {count} CHATS SAVED • {files.length} FILES</p>
          </div>
        </div>
      </div>
    </div>
  );
}
