const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Branch = require("./branch")(sequelize, DataTypes);
db.BranchCost = require("./branchCost")(sequelize, DataTypes);
db.Category = require("./category")(sequelize, DataTypes);
db.Bill = require("./bill")(sequelize, DataTypes);
db.Ingredient = require("./ingredient")(sequelize, DataTypes);
db.Inventory = require("./inventory")(sequelize, DataTypes);
db.InventoryTransactions = require("./inventoryTransactions")(
  sequelize,
  DataTypes
);
db.MenuItem = require("./menuItem")(sequelize, DataTypes);
db.MenuItemIngredient = require("./menuItemIngredient")(sequelize, DataTypes);
db.Offer = require("./offer")(sequelize, DataTypes);
db.OfferItemMenu = require("./offerItemMenu")(sequelize, DataTypes);
db.Order = require("./order")(sequelize, DataTypes);
db.OrderItem = require("./orderItem")(sequelize, DataTypes);
db.Payment = require("./payment")(sequelize, DataTypes);
db.Table = require("./table")(sequelize, DataTypes);
db.TableSession = require("./tableSession")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.Restaurant = require("./restaurant")(sequelize, DataTypes);
db.ExchangeRate = require("./exchangeRate")(sequelize, DataTypes);
db.Settings = require("./settings")(sequelize, DataTypes);

// ✅ Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
