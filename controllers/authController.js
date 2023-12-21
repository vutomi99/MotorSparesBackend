const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      // create a user with an encrypted password
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: CryptoJs.AES.encrypt(req.body.password, process.env.HASH).toString(),
    });

    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  loginUser: async (req, res) => {
    try {
      // search for a user
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Wrong credentials provided. Please provide a valid email!");
      }

      // Decrypt password if the user is found and convert it to a string
      const decryptedPassword = CryptoJs.AES.decrypt(user.password, process.env.HASH);
      const decryptedpass = decryptedPassword.toString(CryptoJs.enc.Utf8);

      // Compare decrypted password to the one entered by the user
      if (decryptedpass !== req.body.password) {
        return res.status(401).json("Wrong Password!");
      }

      // If the data is correct, create a jwt token
      const userToken = jwt.sign(
        {
          id: user.id
        },
        process.env.JWT_SEC,
        { expiresIn: "45d" }
      );

      // Prevent sending back unnecessary data to the user
      const { password, __v, createdAt, updatedAt, ...userdata } = user._doc;

      // Sending back the data to the user
      return res.status(200).json({ ...userdata, token: userToken });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};
