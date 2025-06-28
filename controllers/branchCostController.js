const { BranchCost } = require("../models"); // Import the Branch model from models/index.js

// Controller method to get all branches
exports.getAllBranchesCost = async (req, res) => {
  try {
    const branchesCost = await BranchCost.findAll(); // Fetch all branches
    res.status(200).json(branchesCost);
  } catch (error) {
    console.error("Error fetching branches Costs: ", error);
    res.status(500).json({
      message: "Failed to retrieve branches Costs",
    });
  }
};

exports.getBranchCostById = async (req, res) => {
  try {
    const branchCost = await BranchCost.findByPk(req.params.id);
    if (!branchCost) {
      res
        .status(404)
        .json({ message: `Branch Cost with id:${req.params.id} is not found` });
    }
    res.status(200).json(branchCost);
  } catch (error) {
    console.error("Error fetching branch Cost:", error);
    res.status(500).json({
      message: "Failed to retrieve branch Cost",
    });
  }
};

exports.getBranchesCostByBranchId = async (req, res) => {
  try {
    const branchesCost = await BranchCost.findAll({
      where: { branch_id: req.params.id },
    });
    if (!branchesCost || branchesCost.length <= 0) {
      res.status(404).json({
        message: `Branches Cost with branch_id:${req.params.id} are not found`,
      });
    }
    res.status(200).json(branchesCost);
  } catch (error) {
    console.error("Error fetching branches Cost:", error);
    res.status(500).json({
      message: "Failed to retrieve branches Cost",
    });
  }
};

// Controller method to create a new branch Cost
exports.createBranchCost = async (req, res) => {
  try {
    const { branch_id, cost_type, amount_usd, month, notes } = req.body;

    const newCost = await BranchCost.create({
      branch_id,
      cost_type,
      amount_usd,
      month,
      notes,
      created_at: new Date(),
    });

    res.status(201).json(newCost);
  } catch (error) {
    console.error("Error creating BranchCost:", error);
    res.status(500).json({ message: "Failed to create branch cost", error });
  }
};

exports.updateBranchCost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
    };
    const [updated] = await BranchCost.update(updates, { where: { id } });
    if (!updated) {
      return res
        .status(404)
        .json({ message: `BranchCost with id:${id} not found` });
    }
    const updatedBranchCost = await BranchCost.findByPk(id);
    res.status(200).json({ data: updatedBranchCost });
  } catch (error) {
    console.error("Error updating BranchCost:", error);
    res.status(500).json({ message: "Failed to update BranchCost" });
  }
};

exports.deleteBranchCost = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await BranchCost.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: `BranchCost with id ${id} not found` });
    }

    res
      .status(200)
      .json({ message: `BranchCost with id ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting BranchCost:", error);
    res.status(500).json({ message: "Failed to delete BranchCost" });
  }
};

exports.deleteMultipleBranchCosts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Please provide an array of ids in the request body",
      });
    }

    const results = {
      success: [],
      notFound: [],
      errors: [],
    };

    await Promise.all(
      ids.map(async (id) => {
        try {
          const bcost = await BranchCost.findByPk(id);

          if (!bcost) {
            results.notFound.push(id);
            return;
          }

          await bcost.destroy();
          results.success.push(id);
        } catch (error) {
          results.errors.push({ id, error: error.message });
        }
      })
    );

    if (results.errors.length > 0) {
      return res.status(207).json({
        message: "Batch deletion completed with some errors",
        ...results,
      });
    }

    if (results.notFound.length === ids.length) {
      return res.status(404).json({
        message: "None of the provided BranchCosts were found",
        ...results,
      });
    }

    res.status(200).json({
      message: "Batch deletion completed successfully",
      ...results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error during batch deletion",
      error: error.message,
    });
  }
};
