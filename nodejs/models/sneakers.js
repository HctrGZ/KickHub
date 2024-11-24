const mongoose = require("mongoose");

const sneakersSchema = mongoose.Schema({
    name: String,
    year: Number,
    episodes: Number,
    image: String, 
    description: String,
    genre: String,
    likes: [String] 
});

module.exports = mongoose.model("sneakers", sneakersSchema);