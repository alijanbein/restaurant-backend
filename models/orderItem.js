module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: DataTypes.INTEGER,
      price_at_order_usd: DataTypes.DECIMAL,
      price_at_order_lbp: DataTypes.DECIMAL,
      notes: DataTypes.STRING,
      created_at: DataTypes.DATE,
      order_id: {
        type: DataTypes.INTEGER,
        References: { model: "Order", key: "id" },
      },
      menu_item_id: {
        type: DataTypes.INTEGER,
        References: { model: "MenuItem", key: "id" },
      },
      served_by: {
        type: DataTypes.INTEGER,
        References: { model: "User", key: "id" },
      },
    },
    {
      tableName: "OrderItem",
      timestamps: false,
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.MenuItem, {
      foreignKey: "menu_item_id",
      as: "menu_item"
    });
  };
  return OrderItem;
};
