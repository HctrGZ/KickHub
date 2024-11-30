const {Router} = require('express');
const { getAllUsers, createNewUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/",[validateJWT, verifyAdminRole], getAllUsers);
router.post("/",[validateJWT, verifyAdminRole], createNewUser);

module.exports = router;