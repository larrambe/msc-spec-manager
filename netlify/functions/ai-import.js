exports.handler = async (event) => {
  const headers = {'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST,OPTIONS'};
  if (event.httpMethod === 'OPTIONS') return {statusCode:200,headers,body:''};
  if (event.httpMethod !== 'POST') return {statusCode:405,headers,body:'Method not allowed'};
  const KEY = process.env.ANTHROPIC_API_KEY;
  if (!KEY) return {statusCode:500,headers,body:JSON.stringify({error:'ANTHROPIC_API_KEY not set in Netlify env vars'})};
  try {
    const {messages,system} = JSON.parse(event.body);
    const r = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:4000,system,messages})});
    const data = await r.json();
    if (!r.ok) return {statusCode:r.status,headers,body:JSON.stringify({error:data.error?.message||'API error'})};
    return {statusCode:200,headers,body:JSON.stringify(data)};
  } catch(e) {return {statusCode:500,headers,body:JSON.stringify({error:e.message})};}
};
