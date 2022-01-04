module.exports = (app) => {
  const { router, controller, jwt } = app;
  router.post("/login", "common.login");
  router.post("/register", "common.register");
  router.get("/", jwt, controller.common.index);
  router.post("/upload", jwt, controller.common.upload);
};
