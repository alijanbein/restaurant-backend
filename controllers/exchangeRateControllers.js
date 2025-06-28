const { ExchangeRate } = require("../models"); // Import the Branch model from models/index.js

exports.getExchangeRate = async (req, res) => {
  try {
    const rate = await ExchangeRate.findOne();
    res.status(200).json(rate);
  } catch (error) {
    console.error("Error fetching exchange Rate ", error);
    res.status(500).json({
      message: "Failed to retrieve exchange Rate",
    });
  }
};

exports.createExchangeRate = async (req, res) => {
  try {
    const { rate_value } = req.body;

    const newRate = await ExchangeRate.create({
      rate: rate_value,
      updated_at: new Date(),
    });

    res.status(201).json(newRate);
  } catch (error) {
    console.error("Error creating Rate:", error);
    res.status(500).json({ message: "Failed to create Rate", error });
  }
};

exports.updateExchangeRate = async (req, res) => {
  try {
    const id = req.params.id;
    const { rate_value } = req.body;

    const exchangeRate = await ExchangeRate.findByPk(id);

    if (!exchangeRate) {
      return res
        .status(404)
        .json({ message: `ExchangeRate with ID ${id} not found` });
    }

    exchangeRate.rate = rate_value;
    exchangeRate.updated_at = new Date();
    await exchangeRate.save();

    res.status(200).json({
      message: "Exchange rate updated successfully",
      data: exchangeRate,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating exchange rate", error });
  }
};
