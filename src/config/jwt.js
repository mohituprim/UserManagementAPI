const jwt = require('jwt-simple');
const moment = require('moment');
const debug = require('debug')('app:Jwt');

class JwtManager {
  createAndSendToken(user, res) {
    debug('jwt');
    const payload = {
      sub: this.user.id,
      exp: moment().add(10, 'days').unix(),
    };

    const token = jwt.encode(payload, 'shhh..');

    res.status(200).send({
      user,
      token,
    });
  }
}
module.exports = new JwtManager();
