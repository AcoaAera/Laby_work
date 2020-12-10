const express = require('express');
const redis = require("redis");
const client = redis.createClient(); // По дефолту host	127.0.0.1	 port	6379

client.on('connect', () => console.log('Connected to Redis') )

client.set("count", 0);

//счетчик
var counter = 0;

// константы
const port = 8081; //Меняем это значение
const host = '127.0.0.1';

// приложение
const app = express();
app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  client.get("count", (er, reply) =>{
    counter = reply;
  })
  client.incr("count");

  res.end(`<h1>${host}:${port} visit cointer is ${counter}</h1>`);

});

app.listen(port, host);
console.log(`running on http://${host}:${port}`);