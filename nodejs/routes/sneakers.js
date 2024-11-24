const {Router} = require('express');
const {getAllSneakers, getSneakerById, createNewSneaker, deleteSneaker, updateSneaker} = require('../controllers/sneakers');
const router = Router();

router.get("/", getAllSneakers);
router.get("/:id", getSneakerById);
router.post("/", createNewSneaker); 
router.delete("/:id", deleteSneaker);
router.put("/:id", updateSneaker);

module.exports = router;