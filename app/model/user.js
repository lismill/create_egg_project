"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    create_time: DATE,
    update_time: DATE,
    username: STRING(18),
    password: STRING(255),
    mobile: INTEGER(11),
  });

  return User;
};
