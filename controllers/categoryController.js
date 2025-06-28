const { Category } = require("../models"); // Import the Category model from models/index.js
const { MenuItem } = require("../models");
// Controller method to get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch all categories
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      message: "Failed to retrieve categories",
    });
  }
};

// Controller method to get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with id:${req.params.id} is not found` });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      message: "Failed to retrieve category",
    });
  }
};

exports.getCategoryByBranchId = async (req, res) => {
  try {
    const Branch_id = parseInt(req.params.id);
    const category = await Category.findAll({
      order: [["id", "ASC"]],
      where: { branch_id: Branch_id },
    });
    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with branchid:${Branch_id} is not found` });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      message: "Failed to retrieve category",
    });
  }
};

// Controller method to create a new category
exports.createCategory = async (req, res) => {
  try {
    const image_url = `/images/${req.file.filename}`;
    let {
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      display_order,
      is_active,
      restaurant_id,
      branch_id,
    } = req.body;
    display_order = parseInt(display_order);
    restaurant_id = parseInt(restaurant_id);
    branch_id = parseInt(branch_id);
    // Validate required fields
    if (
      !name_en ||
      !name_ar ||
      !name_fr ||
      !description_en ||
      !description_ar ||
      !description_fr
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Create a new category record
    const newCategory = await Category.create({
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      image_url,
      display_order,
      is_active,
      branch_id,
      restaurant_id,
      created_at: new Date(),
    });

    res.status(201).json({
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      message: "Failed to create category",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional image update
    let image_url;
    if (req.file) {
      image_url = `/images/${req.file.filename}`;
    }

    const updates = {
      ...req.body,
      ...(image_url && { image_url }),
    };

    const [updated] = await Category.update(updates, { where: { id } });

    if (!updated) {
      return res
        .status(404)
        .json({ message: `Category with id:${id} not found` });
    }

    const updatedCategory = await Category.findByPk(id);
    res.status(200).json({ data: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const linkedItems = await MenuItem.findOne({ where: { category_id: id } });

    if (linkedItems) {
      return res
        .status(400)
        .json({
          message: "Cannot delete category. It is still used by menu items.",
        });
    }

    const deleted = await Category.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: `Category with id ${id} not found` });
    }

    res
      .status(200)
      .json({ message: `Category with id ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
