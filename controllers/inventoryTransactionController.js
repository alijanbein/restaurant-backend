const { InventoryTransaction } = require("../models");

exports.createTransaction = async (req, res) => {
  try {
    const {
      quantity_change,
      transaction_type,
      reference_id,
      notes,
      inventory_id,
    } = req.body;

    const transaction = await InventoryTransaction.create({
      quantity_change,
      transaction_type,
      reference_id,
      notes,
      created_at: new Date(),
      inventory_id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await InventoryTransaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await InventoryTransaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction", error });
  }
};
