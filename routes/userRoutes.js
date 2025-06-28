const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);

router.get("/", userController.getAllAccounts);

router.post("/login/", userController.login);

router.patch("/", userController.updateAccount);

router.delete("/", userController.deleteAccount);

router.delete("/delete_many/", userController.deleteMultipleAccounts);

module.exports = router;
