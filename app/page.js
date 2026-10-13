"use client";
import { useState } from "react";
export default function Page() {
  const [msgs, setMsgs] = useState([{role:"assistant",content:"Hi I'm Nexa — more than ChatGPT! Ask me anything or say 'draw a cat'"}]);
  const [input, setInput] = useState("");
  async function send() {
    if(!input) return;
    const newMsgs = [...msgs, {role:"user", content: input}];
    setMsgs(newMsgs); setInput("");
    const r = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({messages:newMsgs}) });
    const j = await r.json();
    setMsgs([...newMsgs, {role:"assistant", content:j.reply}]);
  }
  return (
    <div style={{maxWidth:700,margin:"40px auto",padding:20}}>
      <h1 style={{fontSize:40}}>Nexa ⚡️ More than ChatGPT</h1>
      <div style={{background:"#111",padding:15,borderRadius:12,minHeight:300}}>
        {msgs.map((m,i)=><div key={i} style={{margin:"10px 0",color:m.role=="user"?"#8af":"#fff"}}><b>{m.role}:</b> {m.content}</div>)}
      </div>
      <div style={{display:"flex",gap:10,marginTop:15}}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type..." style={{flex:1,padding:12,borderRadius:8}} />
        <button onClick={send} style={{padding:"12px 20px",background:"#fff",color:"#000",borderRadius:8,fontWeight:"bold"}}>Send</button>
      </div>
    </div>
  );
}
