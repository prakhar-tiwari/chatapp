const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

Router.get("/getusers", (req, res, next) => {
  User.find()
    .then(users => {
      if (!users) {
        return res.json({ message: "There are no users available" });
      }
      return res.json(users);
    })
    .catch(err => {
      return res.json(err);
    });
});

Router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ email: username, password: password })
    .then(user => {
      if (!user) {
        return res.json({ message: "Wrong username or password" });
      }
      const payload = {
        id: user._id,
        name: user.name
      };

      jwt.sign(
        payload,
        "chatappkey", // secret key for generating token
        { expiresIn: 7200 },
        (err, token) => {
          if (err) {
            return res.json({ message: "Token cannot be generated" });
          }
          return res.json({
            token: "Bearer " + token
          });
        }
      );
    })
    .catch(err => {
      return res.json(err);
    });
});

Router.post("/register", (req, res, next) => {
  const { name, username, password } = req.body;
  User.findOne({ email: username })
    .then(user => {
      if (user) {
        return res.json({ message: "User already exist" });
      }
      return User.create({
        name: name,
        email: username,
        password: password
      });
    })
    .then(result => {
      return res.json({ message: "User created successfully" });
    })
    .catch(err => {
      return res.json(err);
    });
});


module.exports = Router;
