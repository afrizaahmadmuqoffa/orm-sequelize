const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('latihan_orm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize