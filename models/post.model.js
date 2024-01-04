const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    nom: { type: String },
    prenom: { type: String },
    tel: { type: Number },
    email: { type: String },
    password: { type: String },
    message: { type: String },
    age: { type: Number },
    likers: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
