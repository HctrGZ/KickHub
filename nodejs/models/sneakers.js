const mongoose = require("mongoose");

const sneakersSchema = mongoose.Schema({
    brandName: String, 
    name: String,
    description: String,
    image: String,
    price: Number,
    color: String,
    sizeRange: [Number]
})
module.exports = mongoose.model("sneakers", sneakersSchema);