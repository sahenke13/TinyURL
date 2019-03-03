const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortURLSchema = new Schema({
  user: String,
  shortURL: String,
  longURL: String,
  count: Number
});

const ShortURL = mongoose.model("ShortURL", shortURLSchema);

module.exports = ShortURL;
