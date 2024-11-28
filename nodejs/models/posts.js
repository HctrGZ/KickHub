const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    likes: { type: [String], default: [] }, // Una lista de usuarios que dieron "like"
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", postSchema);
