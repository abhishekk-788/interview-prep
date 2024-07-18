const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get("/hello/:username", (req, res) => {
    const username = req.params.username;
    res.send("Hello " + username);
});

app.get("/hello", (req, res) => {
    const username = req.query.name || 'Express';
    res.send('Hello ' + username);
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.status(404).send("URL not found");
});

app.listen(3000, (req, res) => { 
    console.log("Server listening");
});