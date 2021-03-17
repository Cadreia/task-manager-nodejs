const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  /***** auth protected routes *****/
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/groups", [authJwt.verifyToken], controller.allGroups);
  app.get("/api/mygroups", [authJwt.verifyToken], controller.myGroups);
  app.get("/api/invitations", [authJwt.verifyToken], controller.invitations);
  app.get("/api/requests", [authJwt.verifyToken], controller.requests);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  /***** admin protected routes *****/
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.allUsers);
  app.get("/api/admins", [authJwt.verifyToken, authJwt.isAdmin], controller.allAdmins);
};
