const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/raw-html') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Welcome - Elads Raw html print</h1>');
      res.end();
    } else if (req.url === '/users') {
      fs.readFile('./users/users.json', (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
      });
    } else if (req.url === '/') {
      fs.readFile('index.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      });
    } else if (req.url === './index.css') {
      fs.readFile('index.css', (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
        res.end();
      });
    } else if (req.url === '/index.js') {
      fs.readFile('index.js', (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        res.end();
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.write('405 Method Not Allowed');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});