const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/", restaurantController.createRestaurant);

router.get("/", restaurantController.getAllRestaurants);

router.get("/:id", restaurantController.getRestaurantById);

router.patch("/:id", restaurantController.updateRestaurant);

router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
