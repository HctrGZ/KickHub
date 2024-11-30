const {Router} = require('express');

const { validateJWT } = require('../middlewares/verifyJWT');
const { getAllPost, getPostById, createNewPost, deletePostById, updatePostById } = require('../controllers/posts');
const router = Router();

router.get("/",[validateJWT],  getAllPost);

router.get("/:id",[validateJWT], getPostById);
router.post("/", [validateJWT] , createNewPost); 
router.delete("/:id", [validateJWT] , deletePostById);
router.put("/:id", [validateJWT] , updatePostById);

module.exports = router;