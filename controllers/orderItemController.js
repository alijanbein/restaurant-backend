const { OrderItem } = require("../models");

exports.addItems = async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [req.body];

    if (payload.length === 0 || !payload[0].order_id) {
      return res.status(400).json({ message: "Invalid payload: missing order_id" });
    }

    const orderId = payload[0].order_id;

    // Delete existing items for this order
    await OrderItem.destroy({ where: { order_id: orderId } });

    // Add new items
    const itemsToCreate = payload.map((item) => ({
      ...item,
      created_at: new Date(),
    }));

    const created = await OrderItem.bulkCreate(itemsToCreate);
    res.status(201).json(created);

  } catch (error) {
    console.error("Error adding items:", error);
    res.status(500).json({ message: "Failed to add items" });
  }
};

exports.getItemsByOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const items = await OrderItem.findAll({ where: { order_id } });
    res.json( items );
  } catch (error) {
    res.status(500).json( "Failed to fetch items" );
  }
};
