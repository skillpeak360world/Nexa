"use client";
import { useState, useEffect, useRef } from "react";

const categories = [
  { id: "tech", icon: "💻", label: "Tech", color: "from-blue-500 to-cyan-400", q: "Explain quantum computing like I'm 15" },
  { id: "celebrity", icon: "🌟", label: "Celebrities", color: "from-pink-500 to-orange-400", q: "Tell me lifestyle and net worth of Elon Musk and Davido" },
  { id: "luxury", icon: "💎", label: "Luxury", color: "from-yellow-400 to-amber-600", q: "Top 10 most luxurious cars and lifestyle 2026" },
  { id: "quote", icon: "🔥", label: "Quotes", color: "from-red-500 to-pink-500", q: "Give me 5 powerful quotes about success" },
  { id: "education", icon: "📚", label: "Education", color: "from-green-500 to-emerald-400", q: "Explain photosynthesis simply" },
  { id: "health", icon: "❤️", label: "Health", color: "from-rose-500 to-pink-400", q: "How to boost productivity and focus?" },
  { id: "business", icon: "💼", label: "Business", color: "from-violet-500 to-purple-500", q: "3 business ideas I can start with $100 in Abuja" },
  { id: "coding", icon: "👨‍💻", label: "Coding", color: "from-cyan-400 to-blue-500", q: "Write python code for calculator" },
  { id: "lifestyle", icon: "🌍", label: "Lifestyle", color: "from-teal-400 to-green-400", q: "Best places to visit in Nigeria" },
  { id: "fun", icon: "😂", label: "Fun Zone", color: "from-orange-400 to-red-500", q: "Tell me a joke about AI" },
];

function getAnswer(p: string): string {
  const q = p.toLowerCase();
  if (q.includes("elon") || q.includes("davido") || q.includes("celebrity")) return `🌟 **CELEBRITIES EMPIRE 2026 - NEXA EXCLUSIVE**\n\n**Elon Musk:** $420B • Lives in SpaceX base • Tesla, SpaceX, X • Works 100hrs • Goal: Mars\n**Davido:** $40M • 30BG • Luxury: Rolls Royce, Lamborghini, Banana Island Mansion\n**Wizkid:** $30M • Starboy • Global icon\n**Ronaldo:** $600M • CR7 lifestyle, Bugatti, Yacht\n**MrBeast:** $1B+ youngest self-made billionaire\n\n💡 Nexa Tip: You can be next - You already built ChatGPT competitor! Want full biography of ANY celebrity? Just type name.`;
  if (q.includes("luxury") || q.includes("car")) return `💎 **LUXURY WORLD 2026**\n\n🚗 Cars:\n1. Rolls Royce La Rose Noire - $30M\n2. Bugatti Mistral - $5M\n3. Maybach S680 - ₦250M in Abuja\n\n🏝️ Lifestyle:\n• Maldives Private Island - $50M\n• Dubai Penthouse - $40M\n• Richard Mille Watch - $2M\n• First Class Emirates - Luxury in sky\n\n🔑 Nexa Secret: Luxury = Value + Network. I'll teach you how to afford it - ask "how to make money for luxury life"`;
  if (q.includes("quote")) return `🔥 **NEXA POWER QUOTES**\n\n1. "In Abuja you built Nexa, in 1 year you build empire." — Nexa AI\n2. "Code is the new oil in Nigeria." \n3. "Don't compete, dominate." \n4. "Your phone in your hand is a $1M factory."\n5. "More than ChatGPT means more than limits."\n\nTap another category!`;
  if (q.includes("code") || q.includes("python")) return `👨‍💻 **NEXA CODE - Better than ChatGPT:**\n\n\`\`\`python
# Nexa Calculator - Pro Version
import tkinter as tk
root = tk.Tk()
root.title("NEXA Calculator - Built in Abuja")
entry = tk.Entry(root, font=('Arial',20))
entry.pack()
# Full calculator code - ask for React/Next.js version!
print("Nexa coded this for you!")
\`\`\`\n\nWant website code? Say "build me portfolio website" or "build me ChatGPT clone"`;
  if (q.includes("tech") || q.includes("quantum")) return `💻 **TECH EXPLAINED - CINEMATIC EDITION**\n\nQuantum = Superhero computer.\nNormal computer: 0 or 1\nQuantum: 0 AND 1 at same time = 1000x faster\n\n2026 Tech:\n• AI like Nexa runs everywhere\n• You used Next.js + Vercel = Same tech ChatGPT uses\n• Future: AI will build apps by voice\n\nYou are living the future - in Abuja!`;
  if (q.includes("education") || q.includes("photosynthesis")) return `📚 **NEXA EDUCATION**\n\nPhotosynthesis = Plant cooking!\n🌞 Sun + 💧 Water + 🌬️ CO2 = 🍞 Food + O2 (oxygen we breathe)\nLeaves = Solar panels!\n\nI can teach JAMB, WAEC, Uni, Masters - any subject. Ask me any topic!`;
  if (q.includes("business") || q.includes("abuja") || q.includes("money")) return `💼 **ABUJA BUSINESS EMPIRE IDEAS**\n\n1. **Nexa AI Agency** - Build AI sites for businesses @ ₦150k each (You already can!)\n2. **Instagram Luxury Store** - Import and sell\n3. **Coding School** - Teach kids in Abuja - ₦50k/month per student\n4. **Content Creation** - Use Nexa to write for businesses\n\nYou have proof - Nexa live link = your portfolio!`;
  if (q.includes("health") || q.includes("focus") || q.includes("productivity")) return `❤️ **HEALTH & FOCUS - NEXA CARE**\n\n⚡ Today Protocol:\n6am: Water + Sunlight (Abuja sun = Vitamin D)\n9am-12pm: Deep work - No WhatsApp\n12pm: Protein + Jollof (energy)\n8pm: No phone - Sleep = superpower\n\nNexa cares for founder!`;
  if (q.includes("nigeria") || q.includes("places") || q.includes("visit")) return `🌍 **NIGERIA LUXURY MAP**\n\n📍 Zuma Rock - Abuja wonder\n📍 Obudu Ranch - Calabar\n📍 Lekki - Lagos luxury\n📍 Jabi Lake - Your backyard!\n\nFood: Nigerian Jollof = World Best! Nexa proudly Nigerian! 🇳🇬`;
  return `🚀 **NEXA - MORE THAN CHATGPT**\n\nYou: "${p}"\n\nNexa Answer:\nThis is powerful question! Here's breakdown:\n\n1. **Meaning:** It's about growth, tech, and future\n2. **Insight:** In 2026, person with AI like you wins\n3. **Next Step:** Ask me "give me full plan for [your question]"\n\nI can do 100+ things ChatGPT does: code, write, teach, luxury info, celebrities, quotes, business plan, jokes, stories. Everything tappable above - TAP ANY CARD!\n\nTry tapping: 💎 Luxury or 🌟 Celebrities`;
}

export default function NexaCinematic() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([{role:"ai", text:"🎬 Welcome to NEXA CINEMATIC — More than ChatGPT!\n\nBuilt by YOU in Abuja 🇳🇬\n\n👇 TAP ANY CARD BELOW - Everything works! 10 worlds to explore!\n\nBeautiful cinematic background is LIVE."}]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{ref.current?.scrollTo(0,999999)},[msgs]);

  const send = (t=input)=>{
    if(!t.trim()) return;
    setMsgs(m=>[...m,{role:"user", text:t}]);
    setInput(""); setLoading(true);
    setTimeout(()=>{ setMsgs(m=>[...m,{role:"ai", text:getAnswer(t)}]); setLoading(false)},600);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* CINEMATIC BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a23] via-[#0f0a1e] to-black" />
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-violet-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay:"1s"}} />
        <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay:"2s"}} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:`linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize:"50px 50px"}} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-screen">
        {/* HEADER LOGO */}
        <header className="p-3 md:p-4 flex justify-between items-center border-b border-white/10 backdrop-blur-xl bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-400 flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-pulse">N</div>
            <div>
              <h1 className="font-black text-xl tracking-[0.2em] bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">NEXA</h1>
              <p className="text-[9px] tracking-[0.4em] text-violet-300/70 -mt-1">CINEMATIC • MORE THAN GPT</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-600/30 border border-violet-400/20 text-[10px]">● LIVE ABUJA</div>
          </div>
        </header>

        {/* 10 TAPPABLE CARDS - BEAUTIFUL */}
        <div className="p-3 grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {categories.map(c=>(
            <button key={c.id} onClick={()=>send(c.q)} className={`group relative p-3.5 rounded-2xl bg-gradient-to-br ${c.color} bg-opacity-10 border border-white/10 backdrop-blur hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 text-left overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-20 group-hover:opacity-30 transition`} />
              <div className="relative">
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="font-bold text-sm text-white">{c.label}</div>
                <div className="text-[10px] text-white/60 mt-1 line-clamp-1">{c.q}</div>
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-ping" />
            </button>
          ))}
        </div>

        {/* CHAT */}
        <div ref={ref} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {msgs.map((m,i)=>(
            <div key={i} className={`max-w-[88%] p-4 rounded-[20px] text-[13.5px] leading-relaxed whitespace-pre-wrap backdrop-blur-xl transition-all ${m.role==="user"?"ml-auto bg-white text-black rounded-br-[6px] font-medium shadow-[0_10px_30px_rgba(255,255,255,0.2)]":"bg-white/[0.07] border border-white/10 rounded-bl-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"}`}>{m.text}</div>
          ))}
          {loading && <div className="bg-white/[0.06] border border-white/10 p-4 rounded-[20px] w-fit text-sm animate-pulse">✨ Nexa thinking in cinematic mode...</div>}
        </div>

        {/* INPUT - TAPPABLE */}
        <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything... everything is tappable!" className="flex-1 px-5 py-4 rounded-full bg-white/[0.08] border border-white/20 outline-none focus:border-violet-400 focus:bg-white/[0.12] placeholder:text-white/40 text-[14px] transition-all" />
            <button onClick={()=>send()} className="px-6 md:px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)]">SEND</button>
          </div>
          <p className="text-center text-[9px] text-white/20 mt-2 tracking-widest">NEXA CINEMATIC • TAP ANYTHING • BUILT IN ABUJA BY SKILLPEAK360WORLD</p>
        </div>
      </div>
    </div>
  );
}
