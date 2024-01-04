const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PostModel = require("../models/post.model");

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

const accessToken = (id) => {
  return jwt.sign({ data: { id } }, process.env.JWT, {
    expiresIn: "30d",
  });
};

module.exports.auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await PostModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    const validPassword = await validatePassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const token = accessToken(user._id);
    res.status(201).json({ message: "Successfully connected", token });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
