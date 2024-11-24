const {response, request} = require('express');
const { UserRepository } = require('../repositories/user.js');

const login = async (req = request, res = response) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            msg: "Datos Invalidos"
        })
    }

    const user = await UserRepository.getOne({username: username, password: password})
    if(!user){
        return res.status(401).json({
            msg:"Usuario y/o contraseña inválidos"
        })
    }

    res.status(200).json({
        msg: "login Ok"
    })
}

module.exports = {
    login
}