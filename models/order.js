module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_number: DataTypes.STRING,
      order_type: DataTypes.STRING,
      subtotal_usd: DataTypes.DECIMAL,
      subtotal_lbp: DataTypes.DECIMAL,
      tax_usd: DataTypes.DECIMAL,
      tax_lbp: DataTypes.DECIMAL,
      delivery_fee_usd: DataTypes.DECIMAL,
      delivery_fee_lbp: DataTypes.DECIMAL,
      total_usd: DataTypes.DECIMAL,
      total_lbp: DataTypes.DECIMAL,
      payment_method: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      notes: DataTypes.STRING,
      created_at: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        References: { model: "User", key: "id" },
      },
      branch_id: {
        type: DataTypes.INTEGER,
        References: { model: "Branch", key: "id" },
      },
      table_session_id: {
        type: DataTypes.INTEGER,
        References: { model: "TableSession", key: "id" },
      },
      staff_id: {
        type: DataTypes.INTEGER,
        References: { model: "User", key: "id" },
      },
    },
    {
      tableName: "Order",
      timestamps: false,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.TableSession, {
      as: "table_session",
      foreignKey: "table_session_id"
    });
  };

  return Order;
};
