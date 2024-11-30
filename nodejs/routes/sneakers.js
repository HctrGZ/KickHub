const {Router} = require('express');
const {getAllSneakers, getSneakerById, createNewSneaker, deleteSneakerById, updateSneakerById} = require('../controllers/sneakers');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/", [validateJWT], getAllSneakers);


router.get("/:id", [validateJWT, verifyAdminRole], getSneakerById);
router.post("/", [validateJWT, verifyAdminRole] , createNewSneaker); 
router.delete("/:id", [validateJWT, verifyAdminRole] , deleteSneakerById);
router.put("/:id", [validateJWT, verifyAdminRole] , updateSneakerById);

module.exports = router;