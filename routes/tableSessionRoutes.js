const express = require("express");
const router = express.Router();
const controller = require("../controllers/tableSessionController");

router.get("/", controller.getAllTableSessions);
router.post("/", controller.startSession);
router.put("/:id/end", controller.endSession);
router.get("/active-session/:table_id", controller.getActiveSessionByTableId);

module.exports = router;
