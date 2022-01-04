/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1640855512570_9115";

  // add your middleware config here
  config.middleware = ["errorHandler", "notfoundHandler"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // jwt
  config.jwt = {
    secret: "0123456789",
  };

  // HttpSuccess
  config.HttpSuccess = (data) => ({ code: 200, data, message: "success" });

  // mysql
  config.mysql = {
    client: {
      host: "127.0.0.1",
      port: "3306",
      user: "leelean",
      password: "lixiaolin",
      database: "egg",
    },
  };

  // sequelize
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "egg",
    username: "leelean",
    password: "lixiaolin",
    timezone: "+08:00",
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  };

  // upload file
  config.multipart = {
    mode: "file",
    fieldSize: `${1024 * 10}kb`,
    files: 10,
  };

  return {
    ...config,
    ...userConfig,
  };
};
