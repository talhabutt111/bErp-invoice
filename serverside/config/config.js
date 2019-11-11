const Sequelize = require('sequelize');
const sequelize = new Sequelize('berpinvoice', 'asas', 'asas1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
});

sequelize.authenticate().then(() => console.log("database is connected")).catch(err => console.log(err));
module.exports = sequelize