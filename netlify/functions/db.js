const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  const H = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"GET,POST,OPTIONS"};
  if (event.httpMethod === "OPTIONS") return {statusCode:200,headers:H,body:""};
  try {
    const store = getStore({name:"msc-data",siteID:process.env.MY_SITE_ID,token:process.env.MY_NETLIFY_TOKEN});
    const key = event.queryStringParameters?.key || "specs";
    if (event.httpMethod === "GET") {
      try {const d = await store.get(key);return {statusCode:200,headers:H,body:d||"{}"}} catch{return {statusCode:200,headers:H,body:"{}"}}
    }
    if (event.httpMethod === "POST") {
      const parsed = JSON.parse(event.body);
      await store.set(key, JSON.stringify(parsed));
      return {statusCode:200,headers:H,body:JSON.stringify({ok:true})};
    }
    return {statusCode:405,headers:H,body:"{}"};
  } catch(e) {return {statusCode:500,headers:H,body:JSON.stringify({error:e.message})};}
};
