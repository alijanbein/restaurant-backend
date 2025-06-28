const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, inventoryController.createInventory);
router.get("/", requireAuth, inventoryController.getAllInventory);
router.get("/:id", requireAuth, inventoryController.getInventoryById);
router.put("/:id", requireAuth, inventoryController.updateInventory);
router.delete("/delete_many/", inventoryController.deleteMultipleIventories);
router.delete("/:id", requireAuth, inventoryController.deleteInventory);

module.exports = router;
