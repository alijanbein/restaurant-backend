// index.js
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const db = require("./models"); // loads models + sequelize instance
const branchRoutes = require("./routes/branchRoutes"); // Note: We are importing branchRoutes here
const menuItemRoutes = require("./routes/menuItemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const offerRoutes = require("./routes/offerRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const branchCostRoutes = require("./routes/branchCostRoutes");
const exchangeRatesRoutes = require("./routes/exchangeRateRoutes");
const userRoutes = require("./routes/userRoutes");
const menuItemIngredientRoutes = require("./routes/menuItemIngredientRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const inventoryTransactionRoutes = require("./routes/inventoryTransactionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const tableRoutes = require("./routes/tableRoutes");
const tableSessionRoutes = require("./routes/tableSessionRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const orderAndTableSessionRoutes = require("./routes/orderAndTableSessionRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();
app.use(cors());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || origin.startsWith("http://localhost")) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Mount the branch routes under '/api'
app.use("/branch", branchRoutes);
app.use("/menuItem", menuItemRoutes);
app.use("/category", categoryRoutes);
app.use("/offer", offerRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/branchCost", branchCostRoutes);
app.use("/exchangeRate", exchangeRatesRoutes);
app.use("/user", userRoutes);
app.use("/menu-item-ingredient", menuItemIngredientRoutes);
app.use("/ingredient", ingredientRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/transaction", inventoryTransactionRoutes);
app.use("/media", uploadRoutes);
app.use("/tables", tableRoutes);
app.use("/table-sessions", tableSessionRoutes);
app.use("/order", orderRoutes);
app.use("/order-item", orderItemRoutes);
app.use("/order-session", orderAndTableSessionRoutes);
app.use("/settings", settingsRoutes);

// Connect and sync
db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to DB");
    return db.sequelize.sync();
  })
  .then(() => {
    console.log("📦 Models synced");
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
