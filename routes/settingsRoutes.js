const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");

router.post("/", settingsController.createSettings);
router.get("/get/all", settingsController.getAllSettingsByBranchId);
router.get("/:type", settingsController.getSettingsByBranchId);

module.exports = router;
