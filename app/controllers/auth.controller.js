const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
//sign up function
exports.signup = (req, res) => {
  // Create user entry in database
  User.create({
    //pull values from HTTP request
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      //all this happens after the db confirms the user is created
      if (req.body.roles) {
        //select the roles of the user from db
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            //tell user account was created without errors if this command is successful
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1, which is normal user
        user.setRoles([1]).then(() => {
          //tell user account was created without errors if this command is successful
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      //catch for errors
      res.status(500).send({ message: err.message });
    });
};
//sign in function
exports.signin = (req, res) => {
  //find a single entry in the db where username is equal to that in the body of the request
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        //no user found
        return res.status(404).send({ message: "User Not found." });
      }
      //ensure that the password matches what is in the database, after unhashing
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      //if password doesn't match
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      //generate sign in token for user if password is correct
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        //return all values to client
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      //catch errors
      res.status(500).send({ message: err.message });
    });
};
