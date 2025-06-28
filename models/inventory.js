module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define(
    "Inventory",
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
      ingredient_id: {
        type: DataTypes.INTEGER,
        references: { model: "Ingredient", key: "id" },
      },
      quantity: DataTypes.FLOAT,
      unit: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      tableName: "Inventory",
      timestamps: false,
    }
  );
  return Inventory;
};
