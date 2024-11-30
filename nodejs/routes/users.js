const {Router} = require('express');
const { getAllUsers, createNewUser, deleteUserById, updateUserById } = require('../controllers/users');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/",[validateJWT, verifyAdminRole], getAllUsers);
router.post("/",[validateJWT, verifyAdminRole], createNewUser);
router.delete("/:id",[validateJWT, verifyAdminRole] , deleteUserById);
router.put("/:id",[validateJWT, verifyAdminRole], updateUserById);
module.exports = router;