module.exports = (sequelize, DataTypes) => {
  const MenuItemIngredient = sequelize.define(
    "MenuItemIngredient",
    {
      menu_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "MenuItem", key: "id" },
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "Ingredient", key: "id" },
      },
      weight_grams: DataTypes.FLOAT,
      is_optional: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      tableName: "MenuItemIngredient",
      timestamps: false,
    }
  );

  MenuItemIngredient.removeAttribute("id");

  // ✅ Define associations here
  MenuItemIngredient.associate = (models) => {
    MenuItemIngredient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredient_id',
      as: 'ingredient',
    });

    MenuItemIngredient.belongsTo(models.MenuItem, {
      foreignKey: 'menu_item_id',
      as: 'menuItem',
    });
  };

  return MenuItemIngredient;
};
