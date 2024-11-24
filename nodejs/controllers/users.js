const {response, request} = require('express')
const sneakerSch = require("../models/sneakers");
const { UserRepository } = require('../repositories/user.js');


const getAllUsers = async(req = request, res = response) =>{
  try{
    const result = await UserRepository.getAll({}) //Consulta de datos y filtrado mediante parámetros de consulta
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg:"Error al obtener los datos"
    })
  }
}


const createNewUser = async (req = request, res = response) =>{

    const {username, password, role} = req.body;
    const userData = {username, password, role};

    if(!username || !password || !role){
        return res.status(400).json({
            msg: "Información incompleta"
        })
    }

    try{
        const savedUser = await UserRepository.create(userData);
            res.status(201).json(
                savedUser
            )
    }catch(error){
        console.log(500);
        res.status(500).json({
            msg: "Error al agregar nuevo elemento"
        })
    }
}



module.exports={
    getAllUsers,
    createNewUser
}