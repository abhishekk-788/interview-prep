const fs = require('fs');

fs.readFile('./data.json', 'utf8', (err, data) => { 
    if (err) {
        console.log('Error reading data', err);
        return;
    }

    let jsonData = JSON.parse(data);
    jsonData.totalRecords = jsonData.users.length;

    const newJsonData = JSON.stringify(jsonData, null, 2);
    fs.writeFile('./data.json', newJsonData, (err) => {
        if (err) {
            console.log('Error writing data', err);
            return;
        }
        console.log('JSON file updated');
    })
})