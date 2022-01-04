"use strict";
const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");

class CommonController extends Controller {
  /**
   * 首页
   */
  async index() {
    const { ctx, app } = this;
    ctx.body = app.config.HttpSuccess({
      user: ctx.state.user,
      message: "hi, admin",
    });
  }

  /**
   * 登录接口
   * @returns
   */
  async login() {
    const { ctx, app } = this;
    // 校验用户名和密码
    const { username, password } = ctx.request.body;
    if (!username || !password) throw new Error("请输入用户名和密码");
    // 查询用户
    const USER = await ctx.service.common.login({ username, password });
    if (USER) {
      // 返回结果
      const token = app.jwt.sign({ username, password }, app.config.jwt.secret);
      delete USER.password;
      ctx.body = app.config.HttpSuccess({ ...USER, token });
    } else {
      throw new Error("用户名或密码不对");
    }
  }

  /**
   * 注册接口
   * @returns
   */
  async register() {
    const { ctx, app } = this;
    // 校验用户名和密码
    const { username, password, mobile } = ctx.request.body;
    if (!username || !password || !mobile) throw new Error("请输入用户名、密码、手机号");

    // 检测用户名是否存在
    if (await ctx.service.common.login({ username, mobile })) throw new Error("用户名已存在");

    // 新增用户
    const USER = await ctx.service.common.register({
      username,
      password,
      mobile,
    });
    const token = app.jwt.sign({ username, password }, app.config.jwt.secret);
    delete USER.password;
    ctx.body = app.config.HttpSuccess({ ...USER, token });
  }

  /**
   * 文件上传
   */
  async upload() {
    const { ctx, app } = this;
    try {
      if (ctx.request.files.length > 10) throw new Error("一次最多上传10个资源");
      // 遍历处理多个文件
      const files = [];
      for (const file of ctx.request.files) {
        const filename = file.filename;
        const date = `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`;
        const dir = `app/public/upload/images/${date}`;
        const targetPath = path.join(dir, filename);
        // 判断文件夹是否存在
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        // 读取文件
        const source = fs.createReadStream(file.filepath);
        // 创建写入流
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
        files.push(`/public/upload/images/${file.filename}`);
      }
      ctx.body = app.config.HttpSuccess({ message: "上传成功", files });
    } catch (e) {
      throw new Error(`上传失败：${e.message}`);
    } finally {
      // 删除临时文件
      await ctx.cleanupRequestFiles();
    }
  }
}

module.exports = CommonController;
