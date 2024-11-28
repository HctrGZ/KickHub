const {response, request} = require('express')
const sneakerSch = require("../models/sneakers");
const { postRepository } = require('../repositories/post');
const { ObjectId } = require('mongoose').Types;



const getAllPost = async (req = request, res = response) => {
    try {
        const result = await postRepository.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({
            msg: "Error al obtener los datos",
        });
    }
};

  

const getPostById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
      const result = await postRepository.getById(id);
      if (result == null) {
          return res.status(404).json({
              msg: "No se encontró el post"
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

const jwt = require("jsonwebtoken"); // Asegúrate de tener este paquete instalado
const user = require('../models/user');

const createNewPost = async (req = request, res = response) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({
            msg: "No autorizado, falta el token"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const username = decoded.username;

        const { content, image, likes, createdAt, updatedAt } = req.body;

        // Validar que todos los campos estén presentes
        if (!content || !image || !likes || !createdAt || !updatedAt) {
            return res.status(400).json({
                msg: "Información incompleta"
            });
        }

        const postData = { username, content, image, likes, createdAt, updatedAt };
        const savedPost = await postRepository.create(postData);
        return res.status(201).json(savedPost);

    } catch (error) {
        console.error("Error en crear post:", error);
        res.status(500).json({
            msg: "Error al agregar nuevo post"
        });
    }
};


const updatePostById = async (req = request, res = response) => {
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
        const updatedSneaker = await postRepository.updateById(id, updateData);

        // Validar si se encontró y actualizó
        if (!updatedSneaker || updatedSneaker.matchedCount === 0) {
            return res.status(404).json({
                msg: "Post no encontrado"
            });
        }

        res.status(200).json({
            msg: "Post actualizado exitosamente",
            updatedSneaker
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al actualizar el sneaker"
        });
    }
};


const deletePostById = async (req = request, res = response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: "ID no válido"
        });
    }

    try {
        const deletedPost = await postRepository.deleteById(id);

        if (!deletedPost || deletedPost.deletedCount === 0) {
            return res.status(404).json({
                msg: "Post no encontrado"
            });
        }

        return res.status(200).json({
            msg: "Post eliminado exitosamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al eliminar el post"
        });
    }
};



module.exports={
    getAllPost,
    createNewPost,
    getPostById,
    updatePostById,
    deletePostById
}