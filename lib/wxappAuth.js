'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _actionInvoke = require('./_actionInvoke');

var _actionInvoke2 = _interopRequireDefault(_actionInvoke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:lib:wxappAuth');


var actions = {
  code2Session: {
    // 见<https://developers.weixin.qq.com/miniprogram/dev/api-backend/auth.code2Session.html>
    // 返回值: {
    //   openid,
    //   unionid, // 当关联开放平台时有此值
    //   session_key,
    //   errcode,
    //   errmsg
    // },
    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    params: ['appid', 'secret', 'js_code', 'grant_type'],
    def: {
      grant_type: 'authorization_code'
    }
  }
};

module.exports = (0, _actionInvoke2.default)(actions);