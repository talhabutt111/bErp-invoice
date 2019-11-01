const Sequelize=require('sequelize');
module.exports = new Sequelize('berpinvoice', 'asas', 'asas1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
