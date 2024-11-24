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

const createNewSneaker = async (req = request, res = response) =>{

    const {name, year, episodes, image, description, genre} = req.body;
    const sneakerData = {name, year, episodes, image, description, genre};

    if(!name || !year || !episodes || !image || !description || !genre){
        return res.status(400).json({
            msg: "Información incompleta"
        })
    }

    try{
        const savedSneaker = await sneakerRepository.create(sneakerData);
            res.status(201).json(
                savedSneaker
            )
    }catch(error){
        console.log(500);
        res.status(500).json({
            msg: "Error al agregar nuevo elemento"
        })
    }
}

const updateSneaker = async (req= request, res = response) =>{

}

const deleteSneaker = async (req= request, res = response) =>{
    
}

module.exports={
    getAllSneakers,
    createNewSneaker,
    getSneakerById,
    updateSneaker,
    deleteSneaker
}