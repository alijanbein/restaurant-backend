module.exports = (sequelize, DataTypes) => {
  const TableSession = sequelize.define(
    "TableSession",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_count: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      status: DataTypes.STRING,
      notes: DataTypes.STRING,
      created_at: DataTypes.DATE,
      table_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Table",
          key: "id",
        },
      },
    },
    {
      tableName: "TableSession",
      timestamps: false,
    }
  );
  
  TableSession.associate = (models) => {
    TableSession.hasMany(models.Order, {
      as: "orders",
      foreignKey: "table_session_id"
    });
  };


  return TableSession;
};
