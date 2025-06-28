module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define(
    "Settings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: DataTypes.STRING,
      value: DataTypes.STRING,
      branch_id: {
        type: DataTypes.INTEGER,
        References: { model: "Branch", key: "id" },
      },
    },
    {
      tableName: "Settings",
      timestamps: false,
    }
  );

  return Settings;
};
