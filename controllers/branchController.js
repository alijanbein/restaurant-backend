const { Branch } = require("../models"); // Import the Branch model from models/index.js

// Controller method to get all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll(); // Fetch all branches
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({
      message: "Failed to retrieve branches",
    });
  }
};

exports.getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) {
      res
        .status(404)
        .json({ message: `Branch with id:${req.params.id} is not found` });
    }
    res.status(200).json(branch);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({
      message: "Failed to retrieve branches",
    });
  }
};

exports.getBranchesByRestaurantId = async (req, res) => {
  try {
    const branches = await Branch.findAll({
      where: { restaurant_id: req.params.id },
    });
    if (!branches || branches.length <= 0) {
      res.status(404).json({
        message: `Branches with Restaurant_id:${req.params.id} are not found`,
      });
    }
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({
      message: "Failed to retrieve branches",
    });
  }
};

// Controller method to create a new branch
exports.createBranch = async (req, res) => {
  try {
    const { name, location, phone, opening_hours, is_active, restaurant_id } =
      req.body;

    // Validate required fields
    if (!name || !location || !phone) {
      return res.status(400).json({
        message: "Missing required fields: name, location, or phone",
      });
    }

    // Create a new branch record
    const newBranch = await Branch.create({
      name,
      location,
      phone,
      opening_hours,
      is_active,
      restaurant_id,
    });

    res.status(201).json(newBranch);
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).json({
      message: "Failed to create branch",
    });
  }
};
