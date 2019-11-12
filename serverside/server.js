const express = require("express");
var server = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 5000;
// const router = express.Router();



server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(cors());



// app.use('/brp', require('./Routes/allRoutes'));
require('./Routes/route-clients')(server)
require('./Routes/route-invoiceDetails')(server)
require('./Routes/route-invoices')(server)




server.listen(port, () => { console.log('server is runing on port', port); });