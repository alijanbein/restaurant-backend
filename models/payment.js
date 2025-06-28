module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount_usd: DataTypes.DECIMAL,
      amount_lbp: DataTypes.DECIMAL,
      payment_method: DataTypes.STRING,
      transaction_id: DataTypes.STRING,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      order_id: {
        type: DataTypes.INTEGER,
        references: { model: "Order", key: "id" },
      },
      bill_id: {
        type: DataTypes.INTEGER,
        references: { model: "Bill", key: "id" },
      },
    },
    {
      tableName: "Payment",
      timestamps: false,
    }
  );

  return Payment;
};
