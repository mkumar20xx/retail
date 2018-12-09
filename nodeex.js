const http = require('http');

const hostname = '192.168.0.102';
const port = 3000;

const server = http.createServer((req, response) => {
  response.statusCode = 200;
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});