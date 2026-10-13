"use client";
import { useState, useEffect, useRef } from "react";

const PAGES = [
  { id:"home", icon:"✨", label:"Home", grad:"from-violet-600 to-indigo-600" },
  { id:"sports", icon:"⚽", label:"Sports", grad:"from-green-600 to-emerald-500" },
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
  { id:"coding", icon:"👨‍💻", label:"Code", grad:"from-slate-600 to-zinc-700" },
  { id:"travel", icon:"🌍", label:"Travel", grad:"from-cyan-500 to-blue-500" },
  { id:"files", icon:"📁", label:"Files", grad:"from-amber-500 to-orange-500" },
];

export default function NexaFinalAll() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [page,setPage]=useState("home");
  const [input,setInput]=useState("");
  const [files,setFiles]=useState([]);
  const [msgs,setMsgs]=useState([]);
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  const fileRef=useRef(null);
  const [todayStr,setTodayStr]=useState("");

  useEffect(()=>{
    const now=new Date();
    setTodayStr(now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}));
    const s=localStorage.getItem("nexa_ultimate_final");
    if(s) setMsgs(JSON.parse(s));
  },[]);
  useEffect(()=>{ if(msgs.length) localStorage.setItem("nexa_ultimate_final", JSON.stringify(msgs)); bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const handleFiles=(list)=>{
    const arr=Array.from(list).map(f=>({name:f.name, size:(f.size/1024).toFixed(0)+"KB", url:f.type.startsWith("image/")||f.type.startsWith("video/")?URL.createObjectURL(f):null}));
    setFiles(p=>[...p,...arr]); setMsgs(m=>[...m,{role:"user", text:`📎 Uploaded: ${arr.map(a=>a.name).join(", ")}`}]);
  };

  async function ask(q){
    setLoading(true);
    const now=new Date();
    const fullDate=now.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    const year=now.getFullYear();
    const autoGrow=`Today is ${fullDate}. Year ${year}. You are NEXA that AUTO-GROWS daily. Knowledge cutoff is TODAY ${fullDate}. You know latest ${year} sports, football tables, Champions League ${year}, AFCON, NBA ${year}, Ballon d'Or ${year}, tech, religion, business, all topics. You answer religion: Christianity, Islam, Buddhism, Hinduism, Judaism, traditional - with respect, verses, history. Never refuse any topic. Predict future to ${year+4}.`;

    const sys=`${autoGrow} Page: ${page}. Question: ${q} ${files.length?`Files: ${files.map(f=>f.name).join(",")}`:""} Answer detailed, stats, bold, emojis.`;

    try{
      const r=await fetch(`https://text.pollinations.ai/${encodeURIComponent(sys)}?model=openai&rand=${Date.now()}`);
      if(r.ok){ const t=await r.text(); if(t.length>40){ setLoading(false); return t; } }
    }catch{}
    try{
      const r2=await fetch("https://text.pollinations.ai/openai",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({model:"openai", messages:[{role:"system", content:autoGrow},{role:"user", content:sys}]})});
      if(r2.ok){ const j=await r2.json(); const c=j.choices?.[0]?.message?.content; if(c){ setLoading(false); return c; } }
    }catch{}
    setLoading(false);
    return `NEXA ${year} (${fullDate}) — reconnecting... Ask again, I answer sports, religion, everything!`;
  }

  const send=async(t=input)=>{
    if(!t.trim()||loading) return; const q=t.trim(); setInput(""); setMsgs(m=>[...m,{role:"user", text:q}]); const a=await ask(q); setMsgs(m=>[...m,{role:"ai", text:a}]);
  };

  const startVoice=()=>{
    const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SpeechRecognition){ alert("Use Chrome for voice - supports 100+ languages"); return; }
    const rec=new SpeechRecognition();
    rec.lang=""; rec.interimResults=false; rec.continuous=false;
    rec.onstart=()=>setInput("🎤 Listening... speak any language");
    rec.onresult=(e)=>{ const t=e.results[0][0].transcript; setInput(t); setTimeout(()=>send(t),500); };
    rec.onerror=()=>setInput(""); rec.start();
  };

  const cur=PAGES.find(p=>p.id===page);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#050508]" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-[#050508] to-black" />
        <div className="absolute top-[-15%] left-[-10%] w-[900px] h-[900px] bg-[#7c3aed] rounded-full blur-[200px] opacity-40" />
        <div className="absolute top-[5%] right-[-15%] w-[700px] h-[700px] bg-[#ffb700] rounded-full blur-[180px] opacity-20" />
        <div className="absolute bottom-[-15%] left-[20%] w-[800px] h-[800px] bg-[#2563eb] rounded-full blur-[200px] opacity-30" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-[250px] opacity-[0.06]" />
      </div>

      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={()=>setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-xl bg-white/10 border border-white/10">☰</button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white via-violet-300 to-[#ffb700] flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(124,58,237,0.6)]">N</div>
          <div><div className="font-black text-[12px] tracking-widest">NEXA • {cur.label.toUpperCase()}</div><div className="text-[9px] text-emerald-300">● {todayStr || "AUTO-GROWS DAILY"} • ALL TOPICS</div></div>
        </div>
        <button onClick={()=>fileRef.current?.click()} className="px-4 py-2 rounded-full bg-white text-black font-bold text-[11px]">+ FILE</button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-[320px] bg-[#0a0a14]/95 backdrop-blur-2xl border-r border-white/10 p-4 overflow-y-auto">
            <div className="flex justify-between mb-4"><b className="text-[11px] tracking-[0.3em]">15 PAGES • ALL TOPICS</b><button onClick={()=>setMenuOpen(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>
            <div className="grid grid-cols-2 gap-2">
              {PAGES.map(p=><button key={p.id} onClick={()=>{setPage(p.id); setMenuOpen(false);}} className={`p-3 rounded-2xl border text-left ${page===p.id?"bg-white text-black":"bg-white/5 border-white/10 hover:bg-white/10"}`}><div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.grad} flex items-center justify-center text-[14px]`}>{p.icon}</div><div className="font-bold text-[11px] mt-2">{p.label}</div></button>)}
            </div>
          </div>
          <div onClick={()=>setMenuOpen(false)} className="flex-1 bg-black/60 backdrop-blur-sm" />
        </div>
      )}

      <div className="max-w-[1000px] mx-auto min-h-[calc(100vh-72px)] flex flex-col">
        {page==="home" && msgs.length===0? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-[720px] rounded-[32px] p-[1px] bg-gradient-to-br from-violet-500 via-white/20 to-[#ffb700]/60 shadow-[0_0_80px_rgba(124,58,237,0.3)]">
              <div className="rounded-[31px] bg-[#0d0d17]/85 backdrop-blur-2xl p-8 md:p-12 text-center">
                <div className="inline-flex px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/20 text-[10px] tracking-[0.2em]">NEXA • DIGITAL • {todayStr}</div>
                <h1 className="mt-6 text-[44px] md:text-[60px] font-black leading-[0.85] tracking-tight">Hey there,<br/><span className="bg-gradient-to-r from-violet-300 via-white to-[#ffb700] bg-clip-text text-transparent">I'm NEXA</span></h1>
                <p className="mt-5 text-[15px] leading-7 text-white/60 max-w-[520px] mx-auto">I'm an AI who's here to help you answer <b className="text-white">all your questions</b>. Sports, football, religion, tech, business, 2026, future — unlimited. Speak any language.</p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <button onClick={()=>send("Who won Premier League this season?")} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[11px]">⚽ Premier League?</button>
                  <button onClick={()=>send("Explain Christianity and Islam respectfully")} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[11px]">🙏 Religion</button>
                  <button onClick={()=>send("Top footballers 2026 stats")} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[11px]">🏆 Best Players</button>
                </div>
                <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
                  <button onClick={()=>setPage("sports")} className="px-8 py-3.5 rounded-full bg-white text-black font-black text-[13px] tracking-wide">START CHATTING →</button>
                  <button onClick={()=>fileRef.current?.click()} className="px-8 py-3.5 rounded-full bg-white/10 border border-white/15 font-bold text-[13px]">📎 UPLOAD FILE</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="px-4 pt-3 flex gap-2 flex-wrap items-center">
              <input ref={fileRef} type="file" multiple hidden accept="image/*,video/*,.pdf,.doc,.txt" onChange={e=>handleFiles(e.target.files)} />
              {files.map((f,i)=><div key={i} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] flex gap-2 items-center"><span>📎</span>{f.name}<button onClick={()=>setFiles(p=>p.filter((_,j)=>j!==i))} className="ml-1 opacity-50">✕</button></div>)}
            </div>
            <div className="flex-1 px-4 md:px-6 py-4 space-y-4 overflow-y-auto">
              {msgs.map((m,i)=>(
                <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
                  <div className={`max-w-[82%] md:max-w-[75%] px-5 py-3.5 rounded-[22px] text-[14px] leading-[1.65] whitespace-pre-wrap shadow-lg ${m.role==="user"?"bg-[#2563eb] rounded-br-[8px] border border-blue-400/30":"bg-[#7c3aed] rounded-bl-[8px] border border-violet-300/30"}`}>
                    <div className="text-[9px] opacity-60 font-bold tracking-widest mb-1">{m.role==="user"?"YOU • RIGHT • BLUE":"NEXA • LEFT • PURPLE • 2026 + FUTURE"}</div>{m.text}
                  </div>
                </div>
              ))}
              {loading && <div className="flex justify-start"><div className="px-5 py-3 rounded-[22px] rounded-bl-[8px] bg-[#7c3aed]/60 border border-violet-300/20 text-[13px] animate-pulse">● NEXA growing to {todayStr}...</div></div>}
              <div ref={bottomRef} />
            </div>
          </>
        )}

        <div className="sticky bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-[760px] mx-auto flex gap-2 p-2 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <button onClick={startVoice} className="w-[44px] h-[44px] rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-[18px] hover:bg-white/25 shrink-0">🎤</button>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={`Ask ${cur.label} — sports, religion, anything (${todayStr})...`} className="flex-1 bg-transparent outline-none px-3 text-[14px] placeholder:text-white/30" />
            <button onClick={()=>send()} disabled={loading} className={`px-7 py-3 rounded-full bg-gradient-to-r ${cur.grad} font-black text-[12px] disabled:opacity-50`}>SEND</button>
          </div>
          <div className="text-center text-[9px] text-white/25 mt-2">🎤 Voice: 100+ languages • Auto-grows daily • Sports • Religion • Everything • {todayStr}</div>
        </div>
      </div>
    </div>
  );
}
