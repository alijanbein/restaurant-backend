const { Restaurant } = require("../models");

// Add new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, logo_url } = req.body;
    const restaurant = await Restaurant.create({
      name,
      logo_url,
      created_at: new Date(),
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurants", error });
  }
};

// Get by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurant", error });
  }
};

// Update
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await restaurant.update(req.body);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

// Delete
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await restaurant.destroy();
    res.status(200).json({ message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error });
  }
};
