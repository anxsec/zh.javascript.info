let http = require('http');
let url = require('url');
let querystring = require('querystring');
let static = require('node-static');

let fileServer = new static.Server('.');

let subscribers = Object.create(null);

function onSubscribe(req, res) {
  let id = Math.random();

  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader("Cache-Control", "no-cache, must-revalidate");

  subscribers[id] = res;

  req.on('close', function() {
    delete subscribers[id];
  });

}

function publish(message) {

  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(message);
  }

  subscribers = Object.create(null);
}

function accept(req, res) {
  let urlParsed = url.parse(req.url, true);

<<<<<<< HEAD
  // 新客户端想要获取消息
=======
  // new client wants messages
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
  if (urlParsed.pathname == '/subscribe') {
    onSubscribe(req, res);
    return;
  }

<<<<<<< HEAD
  // 发送消息
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    // 接受 POST 请求
=======
  // sending a message
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    // accept POST
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
    req.setEncoding('utf8');
    let message = '';
    req.on('data', function(chunk) {
      message += chunk;
    }).on('end', function() {
<<<<<<< HEAD
      publish(message); // 广播给所有人
=======
      publish(message); // publish it to everyone
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
      res.end("ok");
    });

    return;
  }

<<<<<<< HEAD
  // 剩下的是静态的
=======
  // the rest is static
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
  fileServer.serve(req, res);

}

function close() {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end();
  }
}

// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Server running on port 8080');
} else {
  exports.accept = accept;

  if (process.send) { 
     process.on('message', (msg) => {
       if (msg === 'shutdown') {
         close();
       }
     });
  }

  process.on('SIGINT', close);
}
