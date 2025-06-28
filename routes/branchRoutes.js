const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const requireAuth = require("../middleware/requireAuth");

// Define GET route to fetch all branches
router.get("/", requireAuth, branchController.getAllBranches);

router.get("/:id", branchController.getBranchById);

router.get("/by_restaurant_id/:id", branchController.getBranchesByRestaurantId);
// Define POST route to create a new branch
router.post("/", requireAuth, branchController.createBranch);

module.exports = router;
