const { Service } = require("egg");

class CommonService extends Service {
  async login(user) {
    return await this.app.mysql.get("user", { username: user.username });
  }
  async register(user) {
    return await this.app.mysql.insert("user", user);
  }
}

module.exports = CommonService;
