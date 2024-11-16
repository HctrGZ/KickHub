const {Router} = require('express');
const {getAllSneakers, getSneakerById, createNewSneaker} = require('../controllers/sneakers');
const router = Router();

router.get("/", getAllSneakers);
router.get("/:id", getSneakerById);
router.post("/", createNewSneaker); 

module.exports = router;