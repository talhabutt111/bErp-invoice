const express = require("express");
var cors = require('cors');
// var app = express();
var server = express();
var bodyParser = require('body-parser');
// const router = express.Router();



server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
var port = 5000;
server.use(cors());

server.get('/', (req, res) => {
    res.send("Welcome to the BRP_Invoices system");
});



// app.use('/brp', require('./Routes/allRoutes'));
require('./Routes/route-clients')(server)
require('./Routes/route-invoiceDetails')(server)
require('./Routes/route-invoices')(server)




server.listen(port, () => { console.log('server is runing on port', port); });