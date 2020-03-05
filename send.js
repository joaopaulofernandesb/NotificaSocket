const https = require("https");

const data = JSON.stringify({ name: "Teste de Email" });

const options = {
  hostname: "en80ulswfdl6240.m.pipedream.net",
  port: 443,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  },
  body: data
};

const req = https.request(options);
req.write(data);
req.end();
