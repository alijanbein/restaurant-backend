const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/inventoryTransactionController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, transactionController.createTransaction);
router.get("/", requireAuth, transactionController.getAllTransactions);
router.get("/:id", requireAuth, transactionController.getTransactionById);

module.exports = router;
