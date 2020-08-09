'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeWxappFunctions = exports.wxappInvoke = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _request = require('./_request');

var _request2 = _interopRequireDefault(_request);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:lib:_actionInvoke');


/**
 * 根据参数去调用微信的接口.
 *
 * @param {object} dataAction 为HTTP请求的配置,如下例
 *   code2Session: {
 *     method: 'GET',
 *     url: 'https://api.weixin.qq.com/sns/jscode2session',
 *     params: ['appid', 'secret', 'js_code', 'grant_type'],
 *     def: {
 *       grant_type: 'authorization_code'
 *     }
 *   }
 * @param {object} cfg 为小程序或公众号配置,一般是常用参数
 *  {
 *    appid:"xxxx",
 *    secret:"xxxxx"
 *  }
 * @param {object} params HTTP请求中get的参数
 *  {
 *    js_code:"xxxx"
 *  }
 * @param {object} body HTTP-POST请求中body的参数
 *  {
 *    js_code:"xxxx"
 *  }
 *
 */
var wxappInvoke = exports.wxappInvoke = function wxappInvoke(dataAction) {
  return function (cfg) {
    return function (params, body) {
      if (!dataAction) return;
      var def = dataAction.def || {};
      cfg = cfg || {};
      params = params || {};
      body = body || {};
      var data1 = (0, _extends3.default)({}, def, cfg, params);
      var data2 = (0, _extends3.default)({}, def, cfg, body);

      var ndata1 = [];
      dataAction.params && dataAction.params.map(function (key) {
        var subkeys = key.split('|');
        for (var i = subkeys.length - 1; i >= 0; i--) {
          var subkey = subkeys[i];
          if (data1.hasOwnProperty(subkey)) {
            ndata1.push(subkey + '=' + data1[subkey]);
          }
        }
      });

      var ndata2 = {};
      dataAction.body && dataAction.body.map(function (key) {
        var subkeys = key.split('|');
        for (var i = subkeys.length - 1; i >= 0; i--) {
          var subkey = subkeys[i];
          if (data2.hasOwnProperty(subkey)) {
            ndata2[subkey] = data2[subkey];
          }
        }
      });

      var url = dataAction.url;
      var qs = ndata1.join('&');
      if (qs) url += '?' + qs;
      return (0, _request2.default)(dataAction.method, url, ndata2);
    };
  };
};

/**
 * 通过配置生成HTTP请求函数集合.
 * @param {object} actions 集合
 *  let actions = {
 *    code2Session: {
 *      method: 'GET',
 *      url: 'https://api.weixin.qq.com/sns/jscode2session',
 *      params: ['appid', 'secret', 'js_code', 'grant_type'],
 *      def: {
 *        grant_type: 'authorization_code'
 *      }
 *    }
 *  };
 */
var makeWxappFunctions = exports.makeWxappFunctions = function makeWxappFunctions(actions) {
  var fns = {};
  (0, _mapValues2.default)(actions, function (value, key) {
    fns[key] = wxappInvoke(value);
  });
  return fns;
};

exports.default = makeWxappFunctions;