const {Router} = require('express');
const { getAllUsers, createNewUser } = require('../controllers/users');
const router = Router();

router.get("/", getAllUsers);
router.post("/", createNewUser);

module.exports = router;