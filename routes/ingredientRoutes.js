const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", ingredientController.getAllIngredients);
router.get("/:id", ingredientController.getIngredientById);
router.get(
  "/by_branch_id/:branch_id",
  ingredientController.getIngredientByBranchId
);
router.post("/", requireAuth, ingredientController.createIngredient);
router.put("/:id", ingredientController.updateIngredient);
router.delete("/delete_many", ingredientController.deleteMultipleIngredients);
router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;
