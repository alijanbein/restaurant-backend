const { where } = require("sequelize");
const { Table } = require("../models");

//get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.json( tables );
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tables" });
  }
};

//create one table
exports.createTable = async (req, res) => {
  try {
    const newTable = await Table.create({
      ...req.body,
      created_at: new Date(),
    });
    res.status(201).json( newTable);
  } catch (error) {
    res.status(500).json({ message: "Failed to create table" });
  }
};

// Update a table
exports.updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedCount] = await Table.update(req.body, {
      where: { id },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Table not found or no changes made" });
    }

    const updatedTable = await Table.findByPk(id);
    res.json( updatedTable );
  } catch (error) {
    res.status(500).json({ message: "Failed to update table" });
  }
};

// Delete a table
exports.deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Table.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete table" });
  }
};

exports.getAllTablesByBranchId = async (req,res) => {
    try{
        const Branch_id  = parseInt(req.params.id);
        const tables = await Table.findAll({
            where: { branch_id: Branch_id },
        });
        if (!tables){
            return res
                .status(404)
                .json(`tables with branchId:${branch_id} not found`)
        }
        return res.status(200).json(tables)
    } catch(error){
        res.status(500).json("Failed to fetch tables")
    }
}
