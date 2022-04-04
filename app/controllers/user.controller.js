const { user } = require("../models");
const db = require("../models");
const Bite = db.bite;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  Bite.findAll({
    attributes: ['id', 'post', 'createdAt'],
    include: [{
      model: user,
      required: true,
      attributes: ['username']
    }]
  })
    .then(bites => {
      res.status(200).send(bites);
    })
    .catch(err=> {
      res.status(500).send({ message: err.message });
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};