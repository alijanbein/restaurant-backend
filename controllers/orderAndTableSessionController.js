const { TableSession, Order, Table } = require("../models");

exports.startSessionAndOrder = async (req, res) => {
  const t = await require('../models').sequelize.transaction();

  try {
    const { table_id, customer_count, branch_id, staff_id, user_id, notes } = req.body;

    const session = await TableSession.create({
      table_id,
      customer_count,
      notes: notes || "",
      created_at: new Date(),
      start_time: new Date(),
      status: "active",
    }, { transaction: t });

    const order = await Order.create({
      order_number: `ORD-${Date.now()}`,
      order_type: "dine-in",
      subtotal_usd: 0,
      subtotal_lbp: 0,
      tax_usd: 0,
      tax_lbp: 0,
      delivery_fee_usd: 0,
      delivery_fee_lbp: 0,
      total_usd: 0,
      total_lbp: 0,
      payment_method: null,
      payment_status: "unpaid",
      notes: notes || "",
      created_at: new Date(),
      table_session_id: session.id,
      branch_id,
      user_id,
      staff_id,
    }, { transaction: t });

    // ✅ Update the table status to "booked"
    await Table.update(
      { status: "booked" },
      {
        where: { id: table_id },
        transaction: t,
      }
    );

    await t.commit();

    res.status(201).json({ message: "Session and order started", session, order });

  } catch (error) {
    await t.rollback();
    console.error("Error creating session and order:", error);
    res.status(500).json({ message: "Failed to start session and order" });
  }
};
