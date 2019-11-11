const Sequelize = require('sequelize');
const db = require('../config/config');

const invoiceSchema = {
    date: Sequelize.DATE,
    slagme: Sequelize.STRING,
    c_name: Sequelize.STRING,
    c_address: Sequelize.STRING,
    c_number: Sequelize.STRING,
    total_amount: Sequelize.STRING,
};
const configs = { paranoid: true, underscored: true, };
const Invoices = db.define('invoices', invoiceSchema, configs);
Invoices.sync(
    // { force: true }
)
    .then(() => {
        // console.log('invoices is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;
module.exports = Invoices;





