'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestDelete = exports.requestGet = exports.requestPut = exports.requestPost = exports.request = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

require('isomorphic-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = exports.request = function request(method, url) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments[3];

  if (!method) {
    console.log('error! method=null!');
  }
  if (!url) {
    console.log('error! url=null!');
  }

  var body = null;
  if (method === 'GET' || method === 'DELETE') {
    body = null;
  } else {
    body = (0, _stringify2.default)(data);
  }

  var _headers$credentials = (0, _extends3.default)({
    headers: { 'Content-Type': 'application/json' },
    credentials: true
  }, options || {}),
      headers = _headers$credentials.headers,
      credentials = _headers$credentials.credentials;

  var opts = {
    method: method,
    headers: headers,
    body: body
  };
  if (credentials) {
    opts = (0, _extends3.default)({}, opts, {
      credentials: 'include'
    });
  }
  console.log('request', url);
  return fetch(url, opts).catch(function (error) {
    console.error('error!', error, url, opts);
    throw new Error('网络请求失败!');
  }).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    if (response.status === 204) {
      throw new Error('没有数据');
    }
    return response;
  }).then(function (response) {
    return response.json();
  });
  // .then(response => {
  //   let contentType = response.headers.get('content-type');
  //   //console.log ("contentType:", contentType);
  //   if (contentType.includes('application/json')) {
  //     return response.json();
  //   } else {
  //     console.log("Oops, we haven't got JSON!");
  //     return { errcode: -1, xContentType: contentType, xOrigData: response };
  //   }
  // })
  // .then(json => {
  //   if (!json.errcode) {
  //     return json;
  //   }
  //   throw json;
  // })
};

var requestPost = exports.requestPost = function requestPost(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return request('POST', url, data);
};

var requestPut = exports.requestPut = function requestPut(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return request('PUT', url, data);
};

var requestGet = exports.requestGet = function requestGet(url, options) {
  return request('GET', url, null, options);
};

var requestDelete = exports.requestDelete = function requestDelete(url) {
  return request('DELETE', url);
};

exports.default = request;