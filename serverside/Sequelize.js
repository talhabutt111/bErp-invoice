var sequelize = new Sequelize('brp_invoices', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});
export default sequelize;