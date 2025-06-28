const { Inventory } = require("../models");

exports.createInventory = async (req, res) => {
  try {
    const { branch_id, ingredient_id, quantity, unit } = req.body;
    const newInventory = await Inventory.create({
      branch_id,
      ingredient_id,
      quantity,
      unit,
      created_at: new Date(),
    });
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: "Error creating Inventory", error });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Inventory", error });
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Inventory", error });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    await inventory.update(req.body);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error updating Inventory", error });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    await inventory.destroy();
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Inventory", error });
  }
};

exports.deleteMultipleIventories = async (req, res) => {
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
          const inv = await Inventory.findByPk(id);

          if (!inv) {
            results.notFound.push(id);
            return;
          }

          await inv.destroy();
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
        message: "None of the provided Inventories were found",
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
