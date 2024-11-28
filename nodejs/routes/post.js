const {Router} = require('express');

const { validateJWT } = require('../middlewares/verifyJWT');
const { getAllPost, getPostById, createNewPost, deletePostById, updatePostById } = require('../controllers/posts');
const router = Router();

router.get("/", getAllPost);


router.get("/:id", getPostById);
router.post("/", createNewPost); 
router.delete("/:id", deletePostById);
router.put("/:id", updatePostById);

module.exports = router;