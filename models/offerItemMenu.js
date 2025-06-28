module.exports = (sequelize, DataTypes) => {
  const OfferMenuItem = sequelize.define(
    "OfferMenuItem",
    {
      created_at: DataTypes.DATE,
      offer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        References: { model: "Offer", key: "id" },
      },
      menu_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        References: { model: "MenuItem", key: "id" },
      },
    },
    {
      tableName: "Offer_menu_item",
      timestamps: false,
    }
  );

  return OfferMenuItem;
};
