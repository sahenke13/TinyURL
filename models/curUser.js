const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const curUserSchema = new Schema({
  currentUser: String
});

const curUser = mongoose.model("curUser", curUserSchema);

module.exports = curUser;
