import _debug from 'debug';
const debug = _debug('app:lib:wxappAuth');
import _ from 'lodash';
import makeWxappFunctions from './_actionInvoke';

let actions = {
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

module.exports = makeWxappFunctions(actions);
