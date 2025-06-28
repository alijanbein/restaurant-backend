const express = require("express");
const router = express.Router();
const tablecontroller = require("../controllers/tableController");

router.get("/", tablecontroller.getAllTables);
router.post("/", tablecontroller.createTable);

// Route to update a specific table by ID
router.put('/:id', tablecontroller.updateTable);

// Route to delete a specific table by ID
router.delete('/:id', tablecontroller.deleteTable);

// Route to get tables by branch ID
router.get("/by_branch_id/:id", tablecontroller.getAllTablesByBranchId);

module.exports = router;
