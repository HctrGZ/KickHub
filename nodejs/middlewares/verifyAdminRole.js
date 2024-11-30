const { request, response } = require("express");

const verifyAdminRole = (req = request, res = response, next) => {
    if (!req.userActive) {
        return res.status(401).json({
            msg: "Permiso Denegado"
        });
    }

    if (req.userActive.role !== "admin") {
        return res.status(401).json({
            msg: "Permiso Denegado"
        });
    }

    next(); // Continúa con el siguiente middleware o ruta
};

module.exports = { verifyAdminRole };
