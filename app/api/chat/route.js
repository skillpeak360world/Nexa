export async function POST(req) {
  const { messages } = await req.json();
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://nexa.vercel.app"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages
    })
  });
  const data = await res.json();
  return Response.json({ reply: data.choices[0].message.content });
}
