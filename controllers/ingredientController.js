const { Ingredient } = require("../models");

// Get all ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ message: "Failed to retrieve ingredients" });
  }
};

// Get ingredient by ID
exports.getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res
        .status(404)
        .json({ message: `Ingredient with id ${id} not found` });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    res.status(500).json({ message: "Failed to retrieve ingredient" });
  }
};

exports.getIngredientByBranchId = async (req, res) => {
  try {
    const { branch_id } = req.params;
    const ingredient = await Ingredient.findAll({
      where: { branch_id },
    });
    if (!ingredient) {
      return res
        .status(404)
        .json({ message: `Ingredient with id ${id} not found` });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    res.status(500).json({ message: "Failed to retrieve ingredient" });
  }
};

// Create a new ingredient
exports.createIngredient = async (req, res) => {
  try {
    const {
      name_en,
      name_ar,
      name_fr,
      unit,
      is_available,
      cost_per_unit_usd,
      created_at,
      branch_id,
    } = req.body;

    if (!name_en || !unit) {
      return res.status(400).json({
        message: "name_en and unit are required",
      });
    }

    const newIngredient = await Ingredient.create({
      name_en,
      name_ar,
      name_fr,
      unit,
      is_available,
      cost_per_unit_usd,
      branch_id,
      created_at: created_at || new Date(),
    });

    res.status(201).json({ data: newIngredient });
  } catch (error) {
    console.error("Error creating ingredient:", error);
    res.status(500).json({ message: "Failed to create ingredient" });
  }
};

//Update an ingredient
exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await Ingredient.update(updates, { where: { id } });

    if (!updated) {
      return res
        .status(404)
        .json({ message: `Ingredient with id ${id} not found` });
    }

    const updatedIngredient = await Ingredient.findByPk(id);
    res.status(200).json({ data: updatedIngredient });
  } catch (error) {
    console.error("Error updating ingredient:", error);
    res.status(500).json({ message: "Failed to update ingredient" });
  }
};

// Delete an ingredient
exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Ingredient.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: `Ingredient with id ${id} not found` });
    }

    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    res.status(500).json({ message: "Failed to delete ingredient" });
  }
};

exports.deleteMultipleIngredients = async (req, res) => {
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
          const ing = await Ingredient.findByPk(id);

          if (!ing) {
            results.notFound.push(id);
            return;
          }

          await ing.destroy();
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
        message: "None of the provided Ingredients were found",
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
