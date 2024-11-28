const { response, request} = require("express");
const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/user");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({
            msg: "Token inválido"
        });
    }

    try {
        const { username } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await UserRepository.getOne({ username: username });

        if (!user) {
            return res.status(401).json({
                msg: "Token inválido"
            });
        } else {
            // Aquí ya llamas a `next()` para continuar al siguiente middleware
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token inválido"
        });
    }
};


module.exports = {validateJWT}