module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_en: DataTypes.STRING,
      name_ar: DataTypes.STRING,
      name_fr: DataTypes.STRING,
      description_en: DataTypes.STRING,
      description_ar: DataTypes.STRING,
      description_fr: DataTypes.STRING,
      image_url: DataTypes.STRING,
      display_order: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      branch_id: {
        type: DataTypes.INTEGER,
        references: { model: "Branch", key: "id" },
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        references: { model: "Restaurant", key: "id" },
      },
    },
    {
      timestamps: false,
      tableName: "Category",
    }
  );

  return Category;
};
