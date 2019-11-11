const Sequelize = require('sequelize');
const db = require('../config/config');

const clientSchema = {
    cl_name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    number: Sequelize.STRING,
    company: Sequelize.STRING,
}
const configs = { paranoid: true, underscored: true, }
const Clients = db.define('clients', clientSchema, configs);
Clients.sync(
    //  { force: true }
)
    .then(() => {
        // console.log('Client is ready')
    })
    .catch((err) => {
        console.log(err)
    });
module.exports = Clients;





