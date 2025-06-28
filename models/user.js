module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      address: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );

  return User;
};
