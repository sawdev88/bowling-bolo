const express = require("express");
const router = express.Router();

// Load listings model
const Listing = require("../../models/Listing");

// @route Post api/listings/getAll
// @desc Get user scores
// @access Public
router.get("/get-all", (req, res) => {
  // get all listings
  Listing.find({}, (err, listings) => {
    if (err) return err;
    res.send(listings)
  })
});

// @route Post api/listings/create-update
// @desc Create or update listing item
// @access Public
router.post("/create", (req, res) => {
      console.log(req.body)
  // create or update listing
  Listing.findOne({ title: req.body.title }).then(item => {
    if (item) {
      return res.status(400).json({ title: "Title already exists" });
    } else {
      let listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        sold: req.body.sold
      });

      listing.save().then(listing => {
        res.json(listing)
      })
    }
  })
});

router.post("/delete", (req, res) => {
  // delete listing
});

module.exports = router;
