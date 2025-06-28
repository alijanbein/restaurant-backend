const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuItemIngredientController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", controller.getAll);
router.get("/:menu_item_id", controller.getByMenuItemId);
router.post("/", controller.create);
router.put("/:menu_item_id/:ingredient_id", requireAuth, controller.update);
router.delete("/:menu_item_id/:ingredient_id", controller.delete);

module.exports = router;
