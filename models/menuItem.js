module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define(
    "MenuItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      branch_id: {
        type: DataTypes.INTEGER,
        references: { model: "Branch", key: "id" },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: { model: "Category", key: "id" },
      },
      name_en: DataTypes.STRING,
      name_ar: DataTypes.STRING,
      name_fr: DataTypes.STRING,
      description_en: DataTypes.STRING,
      description_ar: DataTypes.STRING,
      description_fr: DataTypes.STRING,
      price_usd: DataTypes.DECIMAL,
      calories: DataTypes.INTEGER,
      is_vegetarian: DataTypes.BOOLEAN,
      is_vegan: DataTypes.BOOLEAN,
      is_gluten_free: DataTypes.BOOLEAN,
      spice_level: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "MenuItem",
    }
  );
  MenuItem.associate = (models) => {
    MenuItem.hasMany(models.OrderItem, {
      foreignKey: "menu_item_id",
      as: "order_items"
    });
  };
  return MenuItem;
};
