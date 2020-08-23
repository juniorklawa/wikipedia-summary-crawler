const mongoose = require("mongoose");

const PageSummarySchema = new mongoose.Schema({
  todayFeaturedArticle: String,
  todayFeaturedImageSrc: String,
  didYouKnow: String,
  didYouKnowImage: String,
  unique: Boolean
});

module.exports = mongoose.model("PageSummary", PageSummarySchema);
