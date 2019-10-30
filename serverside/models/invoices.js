const Sequelize=require('sequelize');
const db=require('../config/config');

const invoicesSchema={
    c_name:Sequelize.STRING,
    c_email:Sequelize.STRING,
    c_address:Sequelize.STRING,
    c_number:Sequelize.STRING,
    services:Sequelize.STRING,
    items:Sequelize.STRING,
    quantity:Sequelize.STRING,
    total_amount:Sequelize.STRING,
}
const configs = { paranoid: true, underscored: true, }
const Invoices=db.define('Invoice', invoicesSchema, configs);
Invoices.sync(
  //  { force: true }
)
    .then(() => {
        console.log('invoices is ready')
    })
    .catch((err) => {
        console.log(err)
    })
;
module.exports =Invoices;




