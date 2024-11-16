const {response, request} = require('express')
const sneakerSch = require("../models/sneakers");
const { sneakerRepository } = require('../repositories/sneakers');


const getAllSneakers = async(req = request, res = response) =>{
  const {searchTerm} = req.query;
  const {otro} = req.query; //podemos tener varios parámetros de consulta
  try{
    const result = await sneakerRepository.getAll({name: RegExp(searchTerm)}) //Consulta de datos y filtrado mediante parámetros de consulta
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({
      msg:"Error al obtener los datos"
    })
  }
}

const getSneakerById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
      const result = await sneakerRepository.getById(id);
      if (result == null) {
          return res.status(404).json({
              msg: "No se encontró el sneaker"
          });
      }
      res.status(200).json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({
          msg: "Error al obtener los datos"
      });
  }
};

const createNewSneaker = (req = request, res = response) =>{
    res.json({
        msg: "sneaker - POST - /",
        result : 12345
    });
}

module.exports={
    getAllSneakers,
    createNewSneaker,
    getSneakerById
}