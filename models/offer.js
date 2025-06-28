module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    "Offer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_en: DataTypes.STRING,
      name_ar: DataTypes.STRING,
      name_fr: DataTypes.STRING,
      description_en: DataTypes.STRING,
      description_ar: DataTypes.STRING,
      description_fr: DataTypes.STRING,
      offer_type: DataTypes.STRING,
      discount_percentage: DataTypes.FLOAT,
      discount_amount_usd: DataTypes.DECIMAL,
      discount_amount_lbp: DataTypes.DECIMAL,
      final_price_usd: DataTypes.DECIMAL,
      final_price_lbp: DataTypes.DECIMAL,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      is_active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      branch_id: {
        type: DataTypes.INTEGER,
        References: { model: "Branch", key: "id" },
      },
    },
    {
      tableName: "Offer",
      timestamps: false,
    }
  );

  return Offer;
};
