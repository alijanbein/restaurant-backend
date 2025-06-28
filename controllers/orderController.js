const { Order, TableSession } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      created_at: new Date(),
      order_type: "dine-in",
      payment_status: "unpaid",
    });
    res.status(201).json( newOrder );
  } catch (error) {
    res.status(500).json( "Failed to create order" );
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
};

//get order by active session
exports.getOrderByTableSession = async (req, res) => {
  try {
    const { table_session_id } = req.params;

    const orders = await Order.findAll({
      where: { table_session_id },
      include: [
        {
          model: TableSession,
          as: "table_session",
          where: { status: "active" },
          attributes: [] // exclude session fields from result if not needed
        }
      ]
    });

    res.status(200).json({ data: orders });
  } catch (error) {
    console.error("Error fetching orders by table_session:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
};
