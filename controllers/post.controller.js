const PostModel = require("../models/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};
// creation de fonction pour cration de message
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

module.exports.setPosts = async (req, res, next) => {
  try {
    const { nom, prenom, email, password, tel } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new PostModel({
      nom,
      prenom,
      tel,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
// pour editer un post
module.exports.editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;

    // Vérifiez si le post existe
    const existingPost = await PostModel.findById(postId);
    if (!existingPost) {
      return res.status(400).json({ message: "Ce post n'existe pas" });
    }

    // Mise à jour du post
    const updatedPost = await PostModel.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du post", error });
  }
};
//creation de deletePost pour supprimer un user
module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(400).json("nexiste pas");
  }
  await post.deleteOne();
  res.status(200).json("Message suprimé" + req.params.id);
};
// pour likers un tableau
module.exports.likePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};
// pour dislikers un tableau
module.exports.dislikePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};
async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

const accessToken = (id) => {
  return jwt.sign({ data: { id } }, process.env.JWT, {
    expiresIn: "30d",
  });
};

/*module.exports.auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await PostModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    const validPassword = await validatePassword(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const token = accessToken(user._id);
    res.status(201).json({ message: "Successfully connected", token });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};*/
