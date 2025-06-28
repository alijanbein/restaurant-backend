module.exports = (sequelize, DataTypes) => {
  const BranchCost = sequelize.define(
    "BranchCost",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cost_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount_usd: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      month: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      notes: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Branchcost",
      timestamps: false,
    }
  );

  return BranchCost;
};
