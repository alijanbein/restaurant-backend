const express = require("express");
const router = express.Router();
const branchCostController = require("../controllers/branchCostController");
const requireAuth = require("../middleware/requireAuth");
// Define GET route to fetch all branches
router.get("/", requireAuth, branchCostController.getAllBranchesCost);

router.get("/:id", requireAuth, branchCostController.getBranchCostById);

router.get(
  "/by_branch_id/:id",
  requireAuth,
  branchCostController.getBranchesCostByBranchId
);
// Define POST route to create a new branch
router.post("/", requireAuth, branchCostController.createBranchCost);

router.put("/:id", branchCostController.updateBranchCost);

router.delete("/delete_many/", branchCostController.deleteMultipleBranchCosts);

router.delete("/:id", branchCostController.deleteBranchCost);

module.exports = router;
