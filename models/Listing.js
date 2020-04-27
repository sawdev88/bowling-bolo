const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ListingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: String,
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateSold: {
    type: Date,
    default: null
  },
  sold: {
    type: Boolean,
    default: false
  },
  images: {
    data: Buffer,
    contentType: String
  }
});

module.exports = Listing = mongoose.model("listings", ListingSchema);
