const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");
const upload = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

router.post(
  "/",
  requireAuth,
  upload.single("image"),
  menuItemController.createMenuItem
);

router.get("/", menuItemController.getAllMenuItems);

router.get("/:id", menuItemController.getMenuItemById);

router.get(
  "/by_category_id/:category_id",
  menuItemController.getMenuItemByCategoryId
);

router.get(
  "/by_branch_id/:branch_id",
  menuItemController.getMenuItemByBranchId
);

router.put("/:id", menuItemController.updateMenuItem);

router.delete("/delete_many/", menuItemController.deleteMultipleMenuItems);

router.delete("/:id", menuItemController.deleteMenuItem);

module.exports = router;
