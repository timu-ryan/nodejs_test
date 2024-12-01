const http = require('http');

// передадим обработчик
const server = http.createServer((req, res) => {
  console.log('Пришёл запрос!');
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'text/html; charset=utf8');

  res.end('<h1>Привет, мир!</h1>', 'utf8');
});

server.listen(3004);