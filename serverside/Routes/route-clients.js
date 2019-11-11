const Clients = require('../models/clients');


module.exports = (server) => {

    server.get('/getAllClients', (req, res) => {
        Clients.findAll()
            .then(clients => res.json({ success: true, data: clients }))
            .catch(err => res.json({ success: false, err: err }));
    });

    //Get a Single Client
    server.get('/getSpecificClient/:id', (req, res) => {
        const client_id = req.params.id;
        // if (!client_id) {
        //     console.log("Client id is null ");
        // } else {
        //     console.log("Client id is ", client_id);
        // }
        Clients.findAll({
            where: {
                id: client_id
            }
        })
            .then(client => res.json({ success: true, data: client }))
            .catch(err => res.json({ success: false, err: err }));
    });

    //Creat a New Client
    server.post('/addNewClient', (req, res) => {
        const newClient = {
            cl_name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            number: req.body.number,
            company: req.body.company
        }
        Clients.create(newClient)
            .then((client) => res.json({ success: true, data: client, message: 'Client has been created successfully.' }))
            .catch(err => res.json({ success: false, err: err }))
    });

    //Update an existing Client
    server.put('/updateClient/:id', (req, res) => {
        const c_id = req.params.id;
        Clients.update(
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
            .then((client) => res.json({ success: true, data: client, message: 'Client has been updated successfully.' }))
            .catch(err => res.json({ success: false, err: err }))
    });

    //delete a single client
    server.delete('/deleteClient/:id', (req, res) => {
        Clients.destroy(
            {
                where: {
                    id: req.params.id
                }
            }).then((client) => {
                // console.log(client);
                res.json({ success: true, data: client, message: 'Client has been deleted successfully.' })
            })
            .catch(err => res.json({ success: false, err: err }));
    });
}