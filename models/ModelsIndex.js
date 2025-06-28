const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("Restaurant_System", "postgres", "Noooo4321", {
  host: "localhost",
  dialect: "postgres",
});

const Category = require("./category")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Category,
};
