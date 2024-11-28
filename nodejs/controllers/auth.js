const {response, request} = require('express');
const { UserRepository } = require('../repositories/user.js');
const { Validations } = require('../helpers/validations.js');
const bcrypt = require("bcrypt");
const { generateJWT } = require('../helpers/jdwt.js');

const login = async (req = request, res = response) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            msg: "Datos Invalidos"
        })
    }

    const user = await UserRepository.getOne({username: username }) //Solo se compara el usuario
    if(!user){
        return res.status(401).json({
            msg:"Usuario y/o contraseña inválidos"
        })
    }

    /* Parte de la "Desencriptación" */

    const validPassword = await bcrypt.compare(password, user.password); //se compara la contraseña dada por la que el usuario tiene
    if(!validPassword){
        return res.status(401).json({
            msg:"Usuario y/o contraseña inválidos"
        }) 
    }
    
    /* Parte del token */
    try{
        const { password: _, ...simpleUser} = user.toObject();
        const token = await generateJWT(username);
        return res.status(200).json({
            msj: "Login OK",
            token: token,
            user: simpleUser
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: "Internal Error"
        })
    }

    res.status(200).json({
        msg: "login Ok"
    })
}

const register = async (req = request, res = response) =>{
    const {username, password} = req.body;
    const saltRounds = process.env.SALTROUNDS || 10

    try{
        Validations.username(username);
        Validations.password(password);
    }catch(error){
        return res.status(400).json({
            msg: error.message
        })
    }
    
    try{
        const user = await UserRepository.getOne({username : username});
        if(user){
            return res.status(400).json({
                msg: "Username ya existente"
            });
        }
        const hashedPassword = await bcrypt.hash(password, Number(saltRounds));

        const newUser = await UserRepository.create({
            username: username,
            password: hashedPassword,
            role: "user"
        })

        /* const simpleUser = {
            username: newUser.user,
            role: newUser.role,
            id: newUser.id
        } */

        const { password: _, ...simpleUser} = newUser.toObject();

        res.status(200).json({
            msg:"Usuario creado",
            user: simpleUser
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Internal Error"
        })
    }
}

module.exports = {
    login,
    register
}