const sneaker = require("../models/sneakers");
const ObjectId = require("mongoose").Types.ObjectId;

class sneakerRepository{

    static async getAll(query){
        return await sneaker.find(query);
    }

    static async getById(id) {
        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }
            return await sneaker.findOne({ _id: id });
        } catch (error) {
            console.error("Error en getById:", error);
            throw error;
        }
    }

    static async create(sneakerData){
        const Sneaker = new sneaker(sneakerData);
        return await Sneaker.save();
    }

    static async deleteById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await sneaker.deleteOne({_id: id});
    }

    static async updateById(id, updateData){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await sneaker.updateOne({_id: id}, updateData);
    }
}

module.exports = { sneakerRepository }