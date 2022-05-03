const { user } = require("../models");
const db = require("../models");
const Bite = db.bite;

//public content query
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

//normal user content query
exports.userBoard = (req, res) => {
  //requests all bites and associated usernames from db
  Bite.findAll({
    attributes: ['id', 'post', 'createdAt'],
    order: [['id','DESC']],
    include: [{
      model: user,
      required: true,
      attributes: ['username']
    }]
  })
    .then(bites => {
      //return bites
      res.status(200).send(bites);
    })
    .catch(err=> {
      //catch errors
      res.status(500).send({ message: err.message });
    });
};

//create a new post in db
exports.postBite = (req, res) => {
  //create bites with associated values from body of request
  Bite.create({
    subQuery: false,
    post: req.body.post,
    userId: req.body.uid,
  }).then(()=>{
    //if db inserts row successfully
    res.send({ message: "Bite posted successfully." });
  }).catch(err => {
    //catch errors
    res.status(500).send({ message: err.message });
  });
};

//delete a bite from db
exports.deleteBite = (req, res) => {
  //delete bite from db where id is equal to that of the request body
  Bite.destroy({
    where: {
      id: req.body.id
    }
  }).then(()=> {
    //row removed from db
    res.send({ message: "Bite removed successfully."});
  }).catch(err => {
    //catch error
    res.status(500).send({ message: err.message });
  });
};

//placeholder for sepearate mod and admin information queries
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};