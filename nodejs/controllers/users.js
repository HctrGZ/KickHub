const {response, request} = require('express')

const getAllUsers = (req = request, res = response) =>{
    res.status(200).json({
        msg: "Users - GET - /",
        result : 12345
    });
}

const createNewUser = (req = request, res = response) =>{
    res.json({
        msg: "Users - POST - /",
        result : 12345
    });
}

module.exports={
    getAllUsers,
    createNewUser
}