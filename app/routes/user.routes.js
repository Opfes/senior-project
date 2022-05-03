const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //user all access route
  app.get("/api/test/all", controller.allAccess);
  //route for protected content
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  //placeholder for mod content
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  //placeholder for admin content
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  //route that allows users to make a post
  app.post(
    "/api/test/postbite",
    [authJwt.verifyToken],
    controller.postBite
  );
  //route that disallows users from making posts
  app.post(
    "/api/test/deleteBite",
    [authJwt.verifyToken],
    controller.deleteBite
  );
};
