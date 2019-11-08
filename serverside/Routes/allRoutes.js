const express = require('express');
const router = express.Router();
const db = require('../config/config');
const Client = require('../models/clients');
const Invoice = require('../models/invoices');
const Item = require('../models/itemData');

//CLIENT MODULE HERE...
//Get All Clients

router.get('/clients', (req, res) => {

    Client.findAll({
        attributes: ['id', 'cl_name', 'email', 'address', 'number', 'company']
    })
        .then(clients => res.send(clients))
        .catch(err => console.log(err));
});

//Get a Single Client
router.get('/clients/:id', (req, res) => {
    const client_id = req.params.id;
    if (!client_id) {
        console.log("Client id is null ");
    } else {
        console.log("Client id is ", client_id);
    }

    Client.findAll({
        where: {
            id: client_id
        },
        attributes: ['id', 'cl_name', 'email', 'address', 'number', 'company']
    })
        .then(clients => res.send(clients))
        .catch(err => console.log(err));
});
//Creat a New Client
router.post('/client', (req, res) => {
    const clients = {
        cl_name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        number: req.body.number,
        company: req.body.company
    }

    Client.create(clients)
        .then((clients) => res.json({ success: true, data: clients, message: 'Client has been created successfully :)' }))
        .catch(err => console.log(err))
});
//Update an existing Client
router.put('/updateclient/:id', (req, res) => {

    const c_id = req.params.id;
    Client.update(
        {
            cl_name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            number: req.body.number,
            company: req.body.company
        },
        {
            where:
                { id: c_id }
        }
    )
        .then((update) => res.json({ error: false, data: update, message: 'client has been updated successfully' }))
        .catch(err => res.send(err))
});
//delete a single client
router.delete('/deleteclient/:id', (req, res) => {
    Client.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then((data) => {
            console.log(data);
            res.json({ success: true, ourData: data, message: 'Client has been deleted successfully' })
        })
        .catch(err => console.log(err));

});
//INVOICES MODULE HERE...

//Get All Invoices
router.get('/invoices', (req, res) => {

    Invoice.findAll({
        attributes: ['id', 'c_name', 'c_address', 'date', 'c_number', 'total_amount', 'slagme', 'created_at']
    })
        .then(invoices => res.json({ succces: true, invoices: invoices }))
        .catch(err => console.log(err));
});
//Get one Invoices
router.get('/invoices/:id', (req, res) => {
    const invoice_id = req.params.id;
    if (!invoice_id) {
        console.log("invoice id is null ");
    } else {
        console.log("invoice id is ", invoice_id);
    }

    Invoice.findAll({
        where: {
            id: invoice_id
        },
        attributes: ['id', 'slagme', 'date', 'c_name', 'c_address', 'c_number', 'total_amount', 'created_at']

    })
        .then(invoices => res.json({ error: false, invoice: invoices, status: 200 }))
        .catch(err => console.log(err));
});
//Create New Invoice
router.post('/invoice', (req, res) => {

    const invoices = {
        slagme: req.body.slagme,
        c_name: req.body.name,
        c_address: req.body.address,
        c_number: req.body.number,
        date: req.body.date,
        services: req.body.services,
        items: req.body.description,
        total_amount: req.body.total_amount,

    };

    Invoice.create(invoices)
        .then((invoices) => {
            console.log(invoices);

            res.json({ success: true, data: invoices, message: 'invoices has been created successfully' })
        })
        .catch(err => console.log(err))
});

//Delete single Invoices
router.delete('/deleteinvoice/:id', (req, res) => {
    Invoice.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then((data) =>
            res.json({ success: true, ourData: data, message: 'Client has been deleted successfully' }

            ))
        .catch(err => console.log(err));

});
//Update Invoices Invoices

router.put('/updateinvoice/:id', (req, res) => {

    const invoice_id = req.params.id;
    Invoice.update(
        {
            c_name: req.body.cl_name,
            c_address: req.body.address,
            c_number: req.body.number,
            services: req.body.services,
            items: req.body.items,
            quantity: req.body.quantity,
            total_amount: req.body.total
        },
        {
            where:
                { id: invoice_id }
        }
    )
        .then((update) => res.json({ error: false, data: update, messsage: 'invoice updated successfully' }))
        .catch(err => res.json(err))
});

router.post('/itemsdata', (req, res) => {
    const items = req.body;
    Item.bulkCreate(items)
        .then((res) => res.json({ error: false, message: 'Items Created' }))
        .catch(err => res.send(err));
});

router.get('/oneitemdata/:slagme', (req, res) => {
    const invoice_id = req.params.slagme;
    if (!invoice_id) {
        console.log("no Data crosspond to this id  ");
    } else {
        console.log("invoice items data is ", invoice_id);
    }

    Item.findAll({
        where: {
            invoice_id: invoice_id
        },
        attributes: ['services', 'detail', 'qty', 'price']
    })
        .then(items => res.send(items))
        .catch(err => console.log(err));
});

router.delete('/deleteitemsdata/:slagme', (req, res) => {
    Item.destroy(
        {
            where: {
                invoice_id: req.params.slagme
            }
        }).then((data) =>
            res.json({ success: true, ourData: data, message: 'invoice Data has been deleted successfully' }

            ))
        .catch(err => console.log(err));

});

module.exports = router;




