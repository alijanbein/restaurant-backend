module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Branch",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      opening_hours: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        references: { model: "Restaurant", key: "id" },
      },
    },
    {
      tableName: "Branch",
      timestamps: false,
    }
  );
};
