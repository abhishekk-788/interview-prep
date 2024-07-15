const http = require('http');

const args = process.argv.slice(2);

const server = http.createServer((req, res) => { 
    res.writeHead(200, { 'Content-Type': 'application/json' })
    console.log(args[0]);
    
    const message = args[0] || 'World';
    res.end(`Hello ${message}`);
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});