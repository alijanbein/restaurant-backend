const { MenuItemIngredient, Ingredient } = require("../models");

// Get all menu item ingredients
exports.getAll = async (req, res) => {
  try {
    const menuItemIngredient = await MenuItemIngredient.findAll();
    res.status(200).json(menuItemIngredient);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to retrieve data" });
  }
};

// // Get menuItemingredients by menu_item_id
// exports.getByMenuItemId = async (req, res) => {
//   try {
//     const { menu_item_id } = req.params;
//     const data = await MenuItemIngredient.findAll({ where: { menu_item_id } });

//     if (data.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No ingredients found for this menu item" });
//     }

//     res.status(200).json({ data });
//   } catch (error) {
//     console.error("Error fetching by menu_item_id:", error);
//     res.status(500).json({ message: "Failed to retrieve data" });
//   }
// };


// Get ingredients by menu_item_id
exports.getByMenuItemId = async (req, res) => {
  try {
    const { menu_item_id } = req.params;

    const data = await MenuItemIngredient.findAll({
      where: { menu_item_id },
      include: [
        {
          model: Ingredient,
          as: "ingredient"
        }
      ]
    });

    if (data.length === 0) {
      return res.status(404).json({
        message: "No ingredients found for this menu item"
      });
    }

    res.status(200).json({ data });

  } catch (error) {
    console.error("Error fetching by menu_item_id:", error);
    res.status(500).json({ message: "Failed to retrieve data" });
  }
};

// Create a new MenuItemIngredient entry
exports.create = async (req, res) => {
  try {
    const {
      menu_item_id,
      ingredient_id,
      weight_grams,
      is_optional,
      created_at,
    } = req.body;

    if (!menu_item_id || !ingredient_id) {
      return res.status(400).json({
        message: "menu_item_id and ingredient_id are required",
      });
    }

    const newEntry = await MenuItemIngredient.create({
      menu_item_id,
      ingredient_id,
      weight_grams,
      is_optional,
      created_at: created_at || new Date(),
    });

    res.status(201).json({ data: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Failed to create entry" });
  }
};

//local create function
exports.createMenuItemIngredient = async (
  { menuItemId, ingredientId, weightGrams, isOptional },
  transaction
) => {
  try {
    const menuItemIngredient = await MenuItemIngredient.create(
      {
        menu_item_id: menuItemId,
        ingredient_id: ingredientId,
        weight_grams: weightGrams,
        is_optional: isOptional,
        created_at: new Date(),
      },
      { transaction } // ✅ Use the transaction here!
    );
    return menuItemIngredient;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating MenuItemIngredient");
  }
};

// Update entry
exports.update = async (req, res) => {
  try {
    const { menu_item_id, ingredient_id } = req.params;
    const updated = await MenuItemIngredient.update(req.body, {
      where: { menu_item_id, ingredient_id },
    });

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const updatedEntry = await MenuItemIngredient.findOne({
      where: { menu_item_id, ingredient_id },
    });

    res.status(200).json({ data: updatedEntry });
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Failed to update entry" });
  }
};

// Delete entry
exports.delete = async (req, res) => {
  try {
    const { menu_item_id, ingredient_id } = req.params;
    const deleted = await MenuItemIngredient.destroy({
      where: { menu_item_id, ingredient_id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};
