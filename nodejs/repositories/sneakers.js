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
}

module.exports = { sneakerRepository }