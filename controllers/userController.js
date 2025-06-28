const { User } = require("../models");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, address } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(501).json({ message: "Invalid Email format" });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(501).json({ message: "Email already exists" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(501).json({ message: "Weak Password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const acc = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      address,
      created_at: new Date(),
    });
    const token = createToken(acc.id);
    const userData = acc.toJSON();
    userData.token = token;
    res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await User.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving accounts", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const acc = await User.findOne({ where: { email } });
    if (!acc) {
      return res
        .status(404)
        .json({ message: `Account with email ${email} is not found` });
    }
    const match = await bcrypt.compare(password, acc.password);
    if (!match) {
      return res.status(501).json({ message: "Incorrect password" });
    }
    const token = createToken(acc.id);
    const userData = acc.toJSON();
    userData.token = token;
    res.status(200).json(userData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving Account ", error });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const oldacc = await User.findOne({ where: { email: req.body.email } });
    if (!oldacc) {
      return res
        .status(404)
        .json({ message: `Acc with email ${req.body.email} not found` });
    }

    await oldacc.update(req.body);
    res.status(200).json(oldacc);
  } catch (error) {
    return res.status(500).json({ message: "Error updating acc", error });
  }
};

// Delete
exports.deleteAccount = async (req, res) => {
  try {
    const acc = await User.findOne({ where: { email: req.body.email } });
    if (!acc) {
      return res
        .status(404)
        .json({ message: `Account with email ${req.body.email} not found` });
    }

    await acc.destroy();
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting account ", error });
  }
};

exports.deleteMultipleAccounts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: "Please provide an array of ids in the request body",
      });
    }

    const results = {
      success: [],
      notFound: [],
      errors: [],
    };

    await Promise.all(
      ids.map(async (id) => {
        try {
          const acc = await User.findByPk(id);

          if (!acc) {
            results.notFound.push(id);
            return;
          }

          await acc.destroy();
          results.success.push(id);
        } catch (error) {
          results.errors.push({ id, error: error.message });
        }
      })
    );

    if (results.errors.length > 0) {
      return res.status(207).json({
        message: "Batch deletion completed with some errors",
        ...results,
      });
    }

    if (results.notFound.length === ids.length) {
      return res.status(404).json({
        message: "None of the provided accounts were found",
        ...results,
      });
    }

    res.status(200).json({
      message: "Batch deletion completed successfully",
      ...results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error during batch deletion",
      error: error.message,
    });
  }
};
