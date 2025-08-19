const { Sequelize } = require("sequelize");

sequelize = new Sequelize('productly', 'root', 'root1234', {
  dialect: "mysql",
  host: 'localhost',
  port: 3306,
});

module.exports = sequelize;