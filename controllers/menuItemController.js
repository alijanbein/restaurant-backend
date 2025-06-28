const { MenuItem, MenuItemIngredient } = require("../models");
const menuItemIngredientController = require("../controllers/menuItemIngredientController");
const { sequelize } = require("../models/index");

exports.createMenuItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const image_url = `/images/${req.file.filename}`;
    let {
      branch_id,
      category_id,
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      price_usd,
      calories,
      is_vegetarian,
      is_vegan,
      is_gluten_free,
      spice_level,
      available,
      ingredients,
    } = req.body;
    console.log(ingredients);

    branch_id = parseInt(branch_id);
    category_id = parseInt(category_id);
    spice_level = parseInt(spice_level);
    price_usd = parseFloat(price_usd);
    calories = parseFloat(calories);

    const menuItem = await MenuItem.create(
      {
        branch_id,
        category_id,
        name_en,
        name_ar,
        name_fr,
        description_en,
        description_ar,
        description_fr,
        price_usd,
        calories,
        is_vegetarian,
        is_vegan,
        is_gluten_free,
        spice_level,
        image_url,
        available,
        created_at: new Date(),
      },
      { transaction: t }
    );
    const parsedIngredients = JSON.parse(ingredients);

    for (let ingredient of parsedIngredients) {
      await menuItemIngredientController.createMenuItemIngredient(
        {
          menuItemId: parseInt(menuItem.id),
          ingredientId: parseInt(ingredient.ingredient_id),
          weightGrams: parseFloat(ingredient.quantity),
          isOptional: false,
        },
        t
      );
    }

    await t.commit();
    res.status(201).json(menuItem);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Error creating MenuItem", error });
  }
};

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving MenuItems", error });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByPk(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving MenuItem", error });
  }
};

exports.getMenuItemByCategoryId = async (req, res) => {
  try {
    const cat_id = parseInt(req.params.category_id);
    const menuItem = await MenuItem.findAll({
      where: { category_id: cat_id },
    });
    if (!menuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving MenuItem", error });
  }
};

exports.getMenuItemByBranchId = async (req, res) => {
  try {
    const branch_id = parseInt(req.params.branch_id);
    const menuItem = await MenuItem.findAll({
      where: { branch_id: branch_id },
    });
    if (!menuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving MenuItem", error });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByPk(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "MenuItem not found" });
    }

    const {
      branch_id,
      category_id,
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      price_usd,
      price_lbp,
      calories,
      is_vegetarian,
      is_vegan,
      is_gluten_free,
      spice_level,
      image_url,
      available,
      created_at,
    } = req.body;

    await menuItem.update({
      branch_id,
      category_id,
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      price_usd,
      price_lbp,
      calories,
      is_vegetarian,
      is_vegan,
      is_gluten_free,
      spice_level,
      image_url,
      available,
      created_at,
    });

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating MenuItem", error });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    // First, delete all related ingredients for this menu item
    await MenuItemIngredient.destroy({
      where: { menu_item_id: id },
    });

    // Then, delete the menu item
    const deleted = await MenuItem.destroy({
      where: { id },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: `MenuItem with id ${id} not found` });
    }

    res
      .status(200)
      .json({ message: `MenuItem with id ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting MenuItem:", error);
    res.status(500).json({ message: "Error deleting MenuItem", error });
  }
};

exports.deleteMultipleMenuItems = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log("after: ", ids);
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
          const MItem = await MenuItem.findByPk(id);

          if (!MItem) {
            results.notFound.push(id);
            return;
          }

          await MItem.destroy();
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
        message: "None of the provided MenuItems were found",
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
