"use client";
import { useState, useEffect, useRef } from "react";

const categories = [
  { icon: "💻", label: "Tech", color: "from-blue-500 to-cyan-400", q: "Explain quantum computing like I'm 15" },
  { icon: "🌟", label: "Celebrities", color: "from-pink-500 to-orange-400", q: "Tell me lifestyle and net worth of Elon Musk and Davido" },
  { icon: "💎", label: "Luxury", color: "from-yellow-400 to-amber-600", q: "Top 10 most luxurious cars 2026" },
  { icon: "🔥", label: "Quotes", color: "from-red-500 to-pink-500", q: "Give me 5 powerful quotes about success" },
  { icon: "📚", label: "Education", color: "from-green-500 to-emerald-400", q: "Explain photosynthesis simply" },
  { icon: "❤️", label: "Health", color: "from-rose-500 to-pink-400", q: "How to boost productivity?" },
  { icon: "💼", label: "Business", color: "from-violet-500 to-purple-500", q: "3 business ideas with $100 in Abuja" },
  { icon: "👨‍💻", label: "Coding", color: "from-cyan-400 to-blue-500", q: "Write python code for calculator" },
  { icon: "🌍", label: "Lifestyle", color: "from-teal-400 to-green-400", q: "Best places to visit in Nigeria" },
  { icon: "😂", label: "Fun", color: "from-orange-400 to-red-500", q: "Tell me a joke about AI" },
];

export default function NexaOnline() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([{role:"ai", text:"🚀 NEXA ONLINE — Real AI Free, More than ChatGPT!\n\n🌐 Connected to online brain!\n\n👇 TAP ANY CARD - Everything works!"}]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ref.current?.scrollTo(0,999999)},[msgs]);

  async function getOnlineAnswer(prompt) {
    try {
      const res = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are NEXA - More powerful than ChatGPT, built in Abuja Nigeria by skillpeak360world. You know Tech, Celebrities life and net worth, Luxury, Quotes, Education, Health, Business, Coding, Lifestyle, Fun. Answer beautifully with emojis." },
            { role: "user", content: prompt }
          ],
          model: "openai",
        })
      });
      const data = await res.json();
      if (data.choices && data.choices[0]) return data.choices[0].message.content;
      const res2 = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
      return await res2.text();
    } catch (e) {
      return `⚠️ Small network issue - trying again...\nYou asked: "${prompt}"\n\nNexa offline tip: ${prompt} is about innovation. Ask again in 2 sec for full online answer!`;
    }
  }

  const send = async (t=input)=>{
    if(!t.trim()) return;
    setMsgs(m=>[...m,{role:"user", text:t}]);
    setInput(""); setLoading(true);
    const answer = await getOnlineAnswer(t);
    setMsgs(m=>[...m,{role:"ai", text:answer}]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a23] via-[#0f0a1e] to-black" />
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-violet-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-screen">
        <header className="p-4 flex justify-between items-center border-b border-white/10 backdrop-blur-xl bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(168,85,247,0.8)]">N</div>
            <div>
              <h1 className="font-black text-xl tracking-[0.2em] bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">NEXA ONLINE</h1>
              <p className="text-[9px] tracking-[0.4em] text-green-300">● ONLINE FREE MORE THAN GPT</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-[10px]">🌐 ONLINE</div>
        </header>

        <div className="p-3 grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {categories.map((c,i)=>(
            <button key={i} onClick={()=>send(c.q)} className={`relative p-3.5 rounded-2xl bg-gradient-to-br ${c.color} border border-white/10 backdrop-blur hover:scale-[1.03] active:scale-[0.97] transition-all text-left overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-20`} />
              <div className="relative">
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="font-bold text-sm">{c.label}</div>
                <div className="text-[10px] text-white/60 mt-1 truncate">{c.q}</div>
              </div>
            </button>
          ))}
        </div>

        <div ref={ref} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {msgs.map((m,i)=>(
            <div key={i} className={`max-w-[88%] p-4 rounded-[20px] text-[13.5px] whitespace-pre-wrap backdrop-blur-xl ${m.role==="user"?"ml-auto bg-white text-black rounded-br-[6px]":"bg-white/[0.07] border border-white/10 rounded-bl-[6px]"}`}>{m.text}</div>
          ))}
          {loading && <div className="bg-white/[0.06] border border-white/10 p-4 rounded-[20px] w-fit text-sm animate-pulse">🌐 Nexa online thinking...</div>}
        </div>

        <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask Nexa anything online free!" className="flex-1 px-5 py-4 rounded-full bg-white/[0.08] border border-white/20 outline-none focus:border-violet-400 placeholder:text-white/40 text-[14px]" />
            <button onClick={()=>send()} className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-black hover:scale-105 transition">SEND</button>
          </div>
          <p className="text-center text-[9px] text-white/20 mt-2">NEXA ONLINE • FREE API • BUILT IN ABUJA</p>
        </div>
      </div>
    </div>
  );
}
