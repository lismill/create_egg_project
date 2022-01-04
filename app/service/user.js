const { Service } = require("egg");

class CommonService extends Service {
  /**
   * 查询全部
   * @returns
   */
  async index() {
    const { app } = this;
    return await app.model.User.findAll({
      limit: 10,
      offset: 0,
      order: [["id", "desc"]],
    });
  }

  /**
   * 查询一个
   * @param {Object} user
   * @returns
   */
  async query(user) {
    const { ctx } = this;
    const USER = await ctx.model.User.findOne({ where: user });
    if (!USER) throw new Error("用户不存在");
    delete USER.dataValues.password;
    return USER.dataValues;
  }

  /**
   * 创建
   * @param {Object} user
   * @returns
   */
  async create(user) {
    const { ctx, app } = this;

    const USER = await ctx.model.User.findOne({ where: user });
    if (USER) throw new Error("用户已存在");

    const result = await ctx.model.User.create(user);
    delete result.dataValues.password;
    const token = app.jwt.sign(result.dataValues, app.config.jwt.secret);
    return {
      ...result.dataValues,
      token,
    };
  }

  /**
   * 更新
   * @param {Object}} user
   * @returns
   */
  async update(user) {
    const { ctx } = this;

    const USER = await ctx.model.User.findByPk(user.id);
    if (!USER) throw new Error("用户不存在");
    const result = await USER.update(user);
    delete USER.dataValues.password;
    return USER.dataValues;
  }

  /**
   * 删除
   * @param {number} id
   * @returns
   */
  async delete(id) {
    const { ctx } = this;

    const USER = await ctx.model.User.findByPk(id);
    if (!USER) throw new Error("用户不存在");
    const result = await USER.destroy();
    return { id, massage: "删除成功" };
  }
}

module.exports = CommonService;
