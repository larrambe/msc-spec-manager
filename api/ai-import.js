module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const KEY = process.env.ANTHROPIC_API_KEY;
  if (!KEY) return res.status(500).json({error:"ANTHROPIC_API_KEY not set"});
  try {
    const {messages,system} = req.body;
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":KEY,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4000,system,messages})});
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({error:data.error?.message||"API error"});
    return res.status(200).json(data);
  } catch(e) {return res.status(500).json({error:e.message});}
};
