const { TableSession, Table ,Order, OrderItem ,MenuItem  } = require("../models");

exports.getAllTableSessions = async (req,res) => {
    try{
        const sessions = await TableSession.findAll();
        res.json( sessions );
    }catch(err){
        res.status(500).json("faild to ftech sessions");
    }
}

//get active session by table id with its order and order items
exports.getActiveSessionByTableId = async (req, res) => {
  try {
    const { table_id } = req.params;

    const activeSession = await TableSession.findOne({
      where: {
        table_id,
        status: "active",
      },
    });

    if (!activeSession) {
      return res.status(404).json({ message: "No active session found for this table" });
    }

    const order = await Order.findOne({
      where: { table_session_id: activeSession.id }
    });

    if (!order) {
      return res.status(404).json({ message: "No order found for this active session" });
    }

    const orderItems = await OrderItem.findAll({
      where: { order_id: order.id },
      include: [
        {
          model: MenuItem,
          as: "menu_item", // make sure this matches your association
        }
      ]
    });

    if(!orderItems){
        return res.status(404).json({ message: "No order items found for this order id" });
    }

    res.status(200).json({ activeSession, order , orderItems});
  } catch (error) {
    console.error("Error fetching active session:", error);
    res.status(500).json({ message: "Failed to retrieve active session" });
  }
};


exports.startSession = async (req, res) => {
  const transaction = await TableSession.sequelize.transaction();

  try {
    const session = await TableSession.create(
      {
        ...req.body,
        start_time: new Date(),
        created_at: new Date(),
        status: "active",
      },
      { transaction }
    );

    // Update the table status to "booked"
    await Table.update(
      { status: "booked" },
      {
        where: { id: req.body.table_id }, // assuming table_id is in req.body
        transaction,
      }
    );

    await transaction.commit();

    res.status(201).json(session);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json("Failed to start session");
  }
};

exports.endSession = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Fetch the session to get the table_id
    const session = await TableSession.findByPk(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Step 2: End the session
    await session.update({
      end_time: new Date(),
      status: "closed"
    });

    // Step 3: Update the table status to "available"
    await Table.update(
      { status: "available" },
      { where: { id: session.table_id } }
    );

    res.json({ message: "Session ended and table is now available" });

  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({ message: "Failed to end session" });
  }
};