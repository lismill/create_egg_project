"use strict";
const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");

class UserController extends Controller {
  /**
   * 查询全部
   */
  async list() {
    const { ctx } = this;
    const users = await ctx.service.user.index();
    ctx.body = this.config.HttpSuccess(users);
  }

  /**
   * 查询一个
   */
  async query() {
    const { ctx, app } = this;
    const result = await ctx.service.user.query(ctx.request.query);
    ctx.body = app.config.HttpSuccess(result);
  }

  /**
   * 创建
   */
  async create() {
    const { ctx, app } = this;
    const { username, password, mobile } = ctx.request.body;
    if (!username) throw new Error("用户名不能为空");
    if (!password) throw new Error("密码不能为空");
    if (!mobile) throw new Error("手机号不能为空");
    const result = await ctx.service.user.create({ username, password, mobile });
    ctx.body = app.config.HttpSuccess(result);
  }

  /**
   * 更新
   */
  async update() {
    const { ctx, app } = this;
    const { id, username, password, mobile } = ctx.request.body;
    if (!id) throw new Error("用户id不能为空");
    if (!username) throw new Error("用户名不能为空");
    if (!password) throw new Error("密码不能为空");
    if (!mobile) throw new Error("手机号不能为空");
    const result = await ctx.service.user.update({ id, username, password, mobile });
    ctx.body = app.config.HttpSuccess(result);
  }
  /**
   * 删除
   */
  async delete() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    if (!id) throw new Error("用户id不能为空");
    const result = await ctx.service.user.delete(id);
    ctx.body = app.config.HttpSuccess(result);
  }
}

module.exports = UserController;
