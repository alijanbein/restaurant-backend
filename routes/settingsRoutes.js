const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");

router.get("/:type", settingsController.getSettingsByBranchId);
router.post("/", settingsController.createSettings);
router.get("/all", settingsController.getAllSettingsByBranchId);

module.exports = router;
