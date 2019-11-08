const Sequelize = require('sequelize');
const db = require('../config/config');
const itemDatafields = {

    invoice_id: Sequelize.STRING,
    services: Sequelize.STRING,
    detail: Sequelize.STRING,
    qty: Sequelize.STRING,
    price: Sequelize.STRING,
};
const configs = { paranoid: true, underscored: true, };
const itemsdata = db.define('items_data', itemDatafields, configs);
itemsdata.sync(
    // { force: true }
)
    .then(() => {
        // console.log('items Data is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;
module.exports = itemsdata;