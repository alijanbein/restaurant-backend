const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderAndTableSessionController");
const requireAuth = require("../middleware/requireAuth");

router.post("/start", requireAuth, controller.startSessionAndOrder);

module.exports = router;
