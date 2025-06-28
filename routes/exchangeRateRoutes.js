const express = require("express");
const router = express.Router();
const exchangeRateController = require("../controllers/exchangeRateControllers");

router.get("/", exchangeRateController.getExchangeRate);

router.post("/", exchangeRateController.createExchangeRate);

router.patch("/:id", exchangeRateController.updateExchangeRate);

module.exports = router;
