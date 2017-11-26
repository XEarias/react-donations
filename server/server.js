const express = require('express')
const app = express()
var path = require('path');


app.use(express.static(path.join(__dirname, '/../client/')));

app.use('/dist', express.static(__dirname + '/../lib'));


app.listen(666, () => console.log('Server activo'))