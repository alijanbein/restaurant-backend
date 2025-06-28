module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define(
    "Bill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bill_number: DataTypes.STRING,
      subtotal_usd: DataTypes.DECIMAL,
      subtotal_lbp: DataTypes.DECIMAL,
      tax_amount_usd: DataTypes.DECIMAL,
      tax_amount_lbp: DataTypes.DECIMAL,
      total_usd: DataTypes.DECIMAL,
      total_lbp: DataTypes.DECIMAL,
      payment_method: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      table_session_id: {
        type: DataTypes.INTEGER,
        References: { model: "TableSession", key: "id" },
      },
      order_id: {
        type: DataTypes.INTEGER,
        References: { model: "Order", key: "id" },
      },
      staff_id: {
        type: DataTypes.INTEGER,
        References: { model: "User", key: "id" },
      },
    },
    {
      tableName: "Bill",
      timestamps: false,
    }
  );

  return Bill;
};
