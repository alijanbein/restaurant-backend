const { Offer } = require("../models"); // Import the Branch model from models/index.js

// Controller method to get all branches
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.status(200).json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({
      message: "Failed to retrieve offers",
    });
  }
};

exports.getOffersByBranchId = async (req, res) => {
  try {
    const branchId = parseInt(req.params.id);
    const Offers = await Offer.findAll({
      where: { branch_id: branchId },
    });
    if (!Offers) {
      res
        .status(404)
        .json({ message: `Offer with id:${branchId} is not found` });
    }
    res.status(200).json(Offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({
      message: "Failed to retrieve offers",
    });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    console.log("heree: ", req.params);
    const OfferObj = await Offer.findByPk(req.params.id);
    if (!OfferObj) {
      res
        .status(404)
        .json({ message: `Offer with id:${req.params.id} is not found` });
    }
    res.status(200).json(OfferObj);
  } catch (error) {
    console.error("Error fetching offer:", error);
    res.status(500).json({
      message: "Failed to retrieve offer",
    });
  }
};

// Controller method to create a new branch
exports.createOffer = async (req, res) => {
  try {
    const {
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      offer_type,
      discount_percentage,
      discount_amount_usd,
      discount_amount_lbp,
      final_price_usd,
      final_price_lbp,
      start_date,
      end_date,
      is_active,
      created_at,
      branch_id,
    } = req.body;

    const offer = await Offer.create({
      name_en,
      name_ar,
      name_fr,
      description_en,
      description_ar,
      description_fr,
      offer_type,
      discount_percentage,
      discount_amount_usd,
      discount_amount_lbp,
      final_price_usd,
      final_price_lbp,
      start_date,
      end_date,
      is_active,
      created_at,
      branch_id,
    });

    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: "Error creating Offer", error });
  }
};
