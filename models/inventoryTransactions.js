module.exports = (sequelize, DataTypes) => {
  const InventoryTransaction = sequelize.define(
    "InventoryTransaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity_change: DataTypes.INTEGER,
      transaction_type: DataTypes.STRING,
      reference_id: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      created_at: DataTypes.DATE,
      inventory_id: {
        type: DataTypes.INTEGER,
        references: { model: "Inventory", key: "id" },
      },
    },
    {
      tableName: "InventoryTransaction",
      timestamps: false,
    }
  );

  return InventoryTransaction;
};
