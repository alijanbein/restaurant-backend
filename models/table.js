module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define(
    "Table",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      table_number: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      status: DataTypes.STRING,
      qr_code: DataTypes.STRING,
      created_at: DataTypes.DATE,
      branch_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Branch",
          key: "id"
        }
      }
    },
    {
      tableName: "Table",
      timestamps: false,
    }
  );

  return Table;
};
