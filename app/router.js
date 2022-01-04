"use strict";
const common = require("./router/common");
const user = require("./router/user");
module.exports = (app) => {
  const routes = [common, user];
  routes.forEach((router) => router(app));
};
