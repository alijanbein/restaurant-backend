module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "Restaurant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      logo_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      tableName: "Restaurant",
      timestamps: false,
    }
  );

  return Restaurant;
};
