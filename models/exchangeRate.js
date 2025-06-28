module.exports = (sequelize, DataTypes) => {
  const ExchangeRate = sequelize.define(
    "ExchangeRate",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "ExchangeRate",
      timestamps: false,
    }
  );

  return ExchangeRate;
};
