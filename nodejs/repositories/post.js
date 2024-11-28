const post = require("../models/posts.js");
const ObjectId = require("mongoose").Types.ObjectId;

class postRepository{

    static async getAll(query = {}) { // Asegúrate de tener un valor predeterminado
        try {
            return await post.find(query); // Esto debería devolver todos los documentos
        } catch (error) {
            console.error("Error en getAll:", error);
            throw error;
        }
    }
    

    static async getById(id) {
        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }
            return await post.findOne({ _id: id });
        } catch (error) {
            console.error("Error en getById:", error);
            throw error;
        }
    }

    static async create(postData){
        const Post = new post(postData);
        return await Post.save();
    }

    static async deleteById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await post.deleteOne({_id: id});
    }

    static async updateById(id, updateData){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await post.updateOne({_id: id}, updateData);
    }
}

module.exports = { postRepository }