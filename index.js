var express  = require('express');
const path = require('path');

let app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/js/main.js', function(req, res){
    res.sendFile(path.join(__dirname+'/public/js/main.js'));
});

const portNumber = 3000;
app.listen(portNumber);
console.log('Running on port ' + portNumber + '...');