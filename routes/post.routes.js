const express = require("express");
const {
  setPosts,
  getPosts,
  editPost,
  deletePost,
  likePost,
  dislikePost,
} = require("../controllers/post.controller");
const { auth } = require("../controllers/QAuthen");
const router = express.Router();
//routes pour acceder a l'url  get
router.get("/", getPosts);
//routes pour acceder a l'url  post
router.post("/inscription", setPosts);
router.post("/connexion", auth);

// mettre a jour les donnée avec id
router.put("/:id", editPost);

// route pout supprimer un message avec id
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePost);
router.patch("/dislike-post/:id", dislikePost);
module.exports = router;
