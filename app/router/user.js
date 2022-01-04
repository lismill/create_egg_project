module.exports = (app) => {
  const { router, controller, jwt } = app;
  router.get("/user/query", jwt, controller.user.query);
  router.get("/user/list", jwt, controller.user.list);
  router.post("/user/create", jwt, controller.user.create);
  router.post("/user/update", jwt, controller.user.update);
  router.post("/user/delete", jwt, controller.user.delete);
};
