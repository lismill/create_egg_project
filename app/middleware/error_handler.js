"use strict";
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      const { app } = ctx;
      // 记录一条错误日志
      app.emit("error", err, ctx);

      // 生产环境隐藏返回
      const status = err.status || 500;
      const error = status === 500 && app.config.env === "prod" ? "Internal Server Error" : err.message;

      // 返回结果
      ctx.body = {
        code: status,
        data: error,
        message: "",
      };
    }
  };
};
