const { Settings } = require("../models");

exports.getSettingsByBranchId = async (req, res) => {
  try {
    const { type } = req.params;
    const value = await Settings.findAll({ where: { type } });

    res.status(200).json({ value });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings: ", error });
  }
};
exports.getAllSettingsByBranchId = async (req, res) => {
  try {
    const value = await Settings.findAll();
    res.status(200).json({ value });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings: ", error });
  }
};

exports.createSettings = async (req, res) => {
  try {
    const { type, value, branch_id } = req.body;
    console.log("here: ", type, value, branch_id);
    const newSetting = await Settings.create({
      type,
      value,
      branch_id,
    });
    console.log("nowww   ", newSetting);
    res.status(200).json({ newSetting });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Settings: ", error });
  }
};
