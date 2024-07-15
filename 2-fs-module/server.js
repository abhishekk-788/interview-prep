const fs = require("fs");
const path = './input.txt';

fs.readFile(path, 'utf8', (err, data) => { 
    if (err) {
        console.log('Error reading file', err);
        return;
    }
    console.log(data);
})

fs.readdir('./files', (err, files) => {
  if (err) {
    console.log("Error reading directory", err);
    return;
  }
    files.forEach(file => console.log(file));
});

fs.writeFile('output.txt', 'Hello Node.js', (err) => { 
    if (err) {
        console.log(err);
        return;
    }
    console.log('File created');
});