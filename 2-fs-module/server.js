const fs = require("fs");
const path = "./input.txt";

// fs.readFile(path, 'utf8', (err, data) => {
//     if (err) {
//         console.log('Error reading file', err);
//         return;
//     }
//     console.log(data);
// })

const items = fs.readdirSync("./files/", (err, files) => {
  if (err) {
    console.log("Error reading directory", err);
    return;
  }
  return files;
});

console.log(items);
const files = items.filter((item) => {
  const itemPath = "./files/" + item;
  console.log(itemPath);
  return fs.statSync(itemPath).isFile();
});

console.log(files);

// fs.writeFile('output.txt', 'Hello Node.js', (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('File created');
// });
