const Sequelize = require('sequelize');
const db = require('../config/config');
const invoiceDetailsFields = {
    invoice_id: Sequelize.STRING,
    services: Sequelize.STRING,
    detail: Sequelize.STRING,
    qty: Sequelize.STRING,
    price: Sequelize.STRING,
};
const configs = { paranoid: true, underscored: true, };
const InvoiceDetails = db.define('invoice_details', invoiceDetailsFields, configs);
InvoiceDetails.sync(
    // { force: true }
)
    .then(() => {
        // console.log('items Data is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;
module.exports = InvoiceDetails;