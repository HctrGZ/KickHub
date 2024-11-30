const user = require("../models/user.js");
const User = require("../models/user.js");
const ObjectId = require("mongoose").Types.ObjectId;

class UserRepository{
    static async getAll(query){
        return await User.find(query);
    }

    static async getOne(query){
        return await User.findOne(query)
    }

    static async create(userData){
        const user = new User(userData);
        return await user.save();
    }
    static async deleteById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await User.deleteOne({_id: id});
    }

    static async updateById(id, updateData){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await User.updateOne({_id: id}, updateData);
    }
}

module.exports = {UserRepository};