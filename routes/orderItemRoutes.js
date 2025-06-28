const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderItemController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, controller.addItems);
router.get("/order/:order_id", controller.getItemsByOrder);

module.exports = router;
