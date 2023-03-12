const fs = require('fs');

fs.writeFileSync('file.txt','This is the main content of the file')

const data = fs.readFileSync('example.txt');
