import axios from 'axios';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var Lang = {
  en: "en",
  zh: "zh"
};
var Role = {
  admin: 1,
  user: 2,
  "super": 3
};
var Group = {
  list: 1
};
var Resource = {
  text: 1,
  image: 2,
  video: 3,
  rich: 4
};
var UniwebService = /*#__PURE__*/function () {
  function UniwebService() {
    var _this = this;
    this.url = "";
    this.lang = Lang.en;
    this.authKey = null;
    this.setAuth = function ({
      key: key
    }) {
      _this.authKey = key;
    };
    this.config = function ({
      url: url,
      lang: lang
    }) {
      if (url) _this.url = url;
      if (lang) _this.lang = lang;
    };
    this.auth = {
      login: function () {
        var _login = _asyncToGenerator(function* (input) {
          var _result$data;
          var result = yield _this.request({
            method: "POST",
            endpoint: "/auth/login",
            data: input
          });
          if (result.status === 200 && result.data) _this.setAuth({
            key: (_result$data = result.data) == null ? void 0 : _result$data.access_token
          });
          return result;
        });
        function login(_x) {
          return _login.apply(this, arguments);
        }
        return login;
      }()
    };
    this.manage = {
      user: {
        create: function create(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/create-user",
            data: input
          });
        },
        update: function update(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/update-user",
            data: input
          });
        },
        remove: function remove(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/remove-user",
            data: input
          });
        },
        list: function list() {
          return _this.request({
            method: "GET",
            endpoint: "/manage/list-user"
          });
        }
      },
      struct: {
        init: function init(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/init-struct",
            data: input
          });
        },
        create: function create(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/add-struct",
            data: input
          });
        },
        update: function update(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/update-struct",
            data: input
          });
        },
        remove: function remove(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/remove-struct",
            data: input
          });
        }
      },
      template: {
        create: function create(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/create-template",
            data: input
          });
        },
        update: function update(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/update-template",
            data: input
          });
        },
        remove: function remove(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/remove-template",
            data: input
          });
        },
        list: function list() {
          return _this.request({
            method: "GET",
            endpoint: "/manage/list-template"
          });
        },
        listValue: function listValue(input) {
          return _this.request({
            method: "GET",
            endpoint: "/manage/list-template-value",
            data: input
          });
        },
        createValue: function createValue(input) {
          return _this.request({
            method: "POST",
            endpoint: "/mutation/create-template-value",
            data: input
          });
        }
      },
      group: {
        create: function create(input) {
          return _this.request({
            method: "POST",
            endpoint: "/mutation/create-group",
            data: input
          });
        },
        update: function update(input) {
          return _this.request({
            method: "POST",
            endpoint: "/mutation/update-group",
            data: input
          });
        },
        remove: function remove(input) {
          return _this.request({
            method: "POST",
            endpoint: "/mutation/remove-group",
            data: input
          });
        },
        get: function get(input) {
          return _this.request({
            method: "GET",
            endpoint: "/query/group",
            data: input
          });
        }
      }
    };
  }
  var _proto = UniwebService.prototype;
  _proto.request = /*#__PURE__*/function () {
    var _request = _asyncToGenerator(function* ({
      method: method,
      endpoint: endpoint,
      data: data
    }) {
      return axios.request({
        method: method,
        url: endpoint,
        baseURL: this.url,
        headers: _extends({
          "Content-Type": "application/json",
          "Accept-Language": this.lang
        }, this.authKey && {
          Authorization: "Bearer " + this.authKey
        }),
        params: method === "GET" ? data : undefined,
        data: method === "GET" ? undefined : data
      }).then(function (res) {
        return {
          status: 200,
          data: res.data
        };
      })["catch"](function (err) {
        var _err$response, _err$response2;
        return {
          status: (_err$response = err.response) == null ? void 0 : _err$response.status,
          message: (_err$response2 = err.response) == null ? void 0 : _err$response2.data.message
        };
      });
    });
    function request(_x2) {
      return _request.apply(this, arguments);
    }
    return request;
  }();
  return UniwebService;
}();
var UniwebInstance = new UniwebService();

export { Group, Lang, Resource, Role, UniwebInstance, UniwebService };
//# sourceMappingURL=index.esm.js.map
