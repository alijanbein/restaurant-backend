const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, controller.createOrder);
router.get("/", requireAuth, controller.getAllOrders);

router.get(
  "/table-session/:table_session_id",
  controller.getOrderByTableSession
);

module.exports = router;
