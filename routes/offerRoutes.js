const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, offerController.createOffer);

router.get("/", offerController.getAllOffers);

router.get("/:id", offerController.getOfferById);

router.get("/get_offer_by_branch_id/:id", offerController.getOffersByBranchId);

module.exports = router;
