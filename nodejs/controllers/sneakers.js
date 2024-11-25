const {response, request} = require('express')
const sneakerSch = require("../models/sneakers");
const { sneakerRepository } = require('../repositories/sneakers');
const { ObjectId } = require('mongoose').Types;



const getAllSneakers = async (req = request, res = response) => {
    const { searchTerm } = req.query; // Puedes tener otros parámetros aquí si es necesario.
  
    try {
      // Construimos el filtro condicionalmente.
      const filter = searchTerm
        ? { name: new RegExp(searchTerm, "i") } // Búsqueda no sensible a mayúsculas.
        : {}; // Si no hay término, devolvemos todos.
  
      const result = await sneakerRepository.getAll(filter);
  
      // Respondemos con el resultado.
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error al obtener los datos",
      });
    }
  };
  

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

    const {brandName, name, description, image, price, color, sizeRange} = req.body;
    const sneakerData = {brandName, name, description, image, price, color, sizeRange};

    if(!brandName || !name || !description || !image || !price || !color || !sizeRange){
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

const updateSneakerById = async (req = request, res = response) => {
    const { id } = req.params;
    const updateData = req.body;

    // Validar ID
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "ID no válido"
        });
    }

    // Validar que haya datos para actualizar
    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({
            msg: "No se proporcionaron datos para actualizar"
        });
    }

    try {
        const updatedSneaker = await sneakerRepository.updateById(id, updateData);

        // Validar si se encontró y actualizó
        if (!updatedSneaker || updatedSneaker.matchedCount === 0) {
            return res.status(404).json({
                msg: "Sneaker no encontrado"
            });
        }

        res.status(200).json({
            msg: "Sneaker actualizado exitosamente",
            updatedSneaker
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al actualizar el sneaker"
        });
    }
};


const deleteSneakerById = async (req = request, res = response) => {
    const { id } = req.params;

    // Validar ID
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "ID no válido"
        });
    }

    try {
        const deletedSneaker = await sneakerRepository.deleteById(id);

        // Validar si se encontró y eliminó
        if (!deletedSneaker || deletedSneaker.deletedCount === 0) {
            return res.status(404).json({
                msg: "Sneaker no encontrado"
            });
        }

        res.status(200).json({
            msg: "Sneaker eliminado exitosamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al eliminar el sneaker"
        });
    }
};


module.exports={
    getAllSneakers,
    createNewSneaker,
    getSneakerById,
    updateSneakerById,
    deleteSneakerById
}