const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.get("/by_branch_id/:id", categoryController.getCategoryByBranchId);
router.put("/:id",upload.single("image"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory)
router.post(
  "/",
  requireAuth,
  upload.single("image"),
  categoryController.createCategory
);
module.exports = router;
