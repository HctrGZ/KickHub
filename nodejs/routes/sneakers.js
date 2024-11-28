const {Router} = require('express');
const {getAllSneakers, getSneakerById, createNewSneaker, deleteSneakerById, updateSneakerById} = require('../controllers/sneakers');
const { validateJWT } = require('../middlewares/verifyJWT');
const router = Router();

router.get("/"/* , [validateJWT] */, getAllSneakers);


router.get("/:id", getSneakerById);
router.post("/", createNewSneaker); 
router.delete("/:id", deleteSneakerById);
router.put("/:id", updateSneakerById);

module.exports = router;