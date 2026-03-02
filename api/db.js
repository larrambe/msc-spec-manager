const store = {};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  const key = req.query.key || "specs";
  if (req.method === "GET") {
    return res.status(200).json(store[key] || {});
  }
  if (req.method === "POST") {
    store[key] = req.body;
    return res.status(200).json({ok:true});
  }
  return res.status(405).json({error:"bad method"});
}
