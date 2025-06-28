module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    "Ingredient",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_en: DataTypes.STRING,
      name_ar: DataTypes.STRING,
      name_fr: DataTypes.STRING,
      is_available: DataTypes.BOOLEAN,
      cost_per_unit_usd: DataTypes.DECIMAL,
      unit: DataTypes.STRING,
      created_at: DataTypes.DATE,
      branch_id: {
        type: DataTypes.INTEGER,
        references: { model: "Branch", key: "id" },
      },
    },
    {
      timestamps: false,
      tableName: "Ingredient",
    }
  );
  return Ingredient;
};
