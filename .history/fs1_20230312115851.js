const fs = require('fs');

fs.writeFileSync('file.txt','This is the main content of the file')

const data = fs.readFileSync('./file.txt');

fs.writeFileSync('fileCopy.txt', data);


fs.renameSync('file.txt', 'newFile.txt');

const files = fs.readdirSync('.');

fs.appendFileSync('newFile.txt', 'This wasnt here before', 'utf8');

fs.mkdirSync('newdir');


const newData = fs.readFileSync('./newFile.txt');


fs.writeFileSync('./newdir/newFile', newData);

