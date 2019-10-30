const express=require("express");
var cors = require('cors');
var app=express();
var bodyParser = require('body-parser');
var DB=require('./config/config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var mysql = require('mysql');
var port=5000;
app.use(cors());

DB.authenticate().then(() =>console.log("database is connected")).catch(err =>console.log(err));

app.get('/', (req,res) => {
    res.send("Welcome to the BRP_Invoices system");
});
app.use('/brp',require('./Routes/allRoutes'));





app.listen(port,()  =>{ console.log('server in runing on port',port);});