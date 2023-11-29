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
  rich: 4,
  number: 5
};
var UserStatus = {
  active: 1,
  inactive: 2
};
var PublishStatus = {
  progress: 0,
  finished: 1,
  canceled: 2
};
var UniwebService = /*#__PURE__*/function () {
  function UniwebService() {
    var _this = this;
    this.url = "";
    this.lang = "en";
    this.authKey = null;
    this.setAuth = function ({
      key: key
    }) {
      _this.authKey = key;
    };
    this.config = function ({
      url: url,
      lang: lang,
      key: key
    }) {
      if (url) _this.url = url;
      if (lang) _this.lang = lang;
      if (key) _this.authKey = key;
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
      }(),
      verifyEmail: function () {
        var _verifyEmail = _asyncToGenerator(function* (input) {
          var _result$data2;
          var result = yield _this.request({
            method: "POST",
            endpoint: "/auth/verify-email",
            data: input
          });
          if (result.status === 200 && result.data) _this.setAuth({
            key: (_result$data2 = result.data) == null ? void 0 : _result$data2.access_token
          });
          return result;
        });
        function verifyEmail(_x2) {
          return _verifyEmail.apply(this, arguments);
        }
        return verifyEmail;
      }(),
      resetPassword: function resetPassword(input) {
        return _this.request({
          method: "POST",
          endpoint: "/auth/reset-password",
          data: input
        });
      },
      setPassword: function setPassword(input) {
        return _this.request({
          method: "POST",
          endpoint: "/auth/set-password",
          data: input
        });
      }
    };
    this.manage = {
      oss: {
        upload: function () {
          var _upload = _asyncToGenerator(function* (file) {
            var result = yield _this.request({
              method: "GET",
              endpoint: "/manage/get-upload-url"
            });
            if (result && result.data) {
              var fileKey = result.data.key + "." + file.name.split(".").pop();
              var formData = new FormData();
              formData.append("key", fileKey);
              formData.append("policy", result.data.policy);
              formData.append("OSSAccessKeyId", result.data.accessid);
              formData.append("success_action_status", "200");
              formData.append("Signature", result.data.signature);
              formData.append("file", file);
              var _upload2 = yield axios.request({
                method: "POST",
                url: result.data.host,
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                data: formData
              });
              if (_upload2.status === 200) {
                return {
                  status: 200,
                  data: {
                    host: result.data.host,
                    key: fileKey
                  }
                };
              } else {
                return {
                  status: _upload2.status,
                  message: _upload2.statusText
                };
              }
            } else {
              return {
                status: 500,
                message: "Internal Server Error"
              };
            }
          });
          function upload(_x3) {
            return _upload.apply(this, arguments);
          }
          return upload;
        }()
      },
      publish: {
        create: function create(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/create-publish",
            data: input
          });
        },
        list: function list() {
          return _this.request({
            method: "GET",
            endpoint: "/manage/list-publish"
          });
        },
        get: function get(input) {
          return _this.request({
            method: "GET",
            endpoint: "/query/publish",
            data: input
          });
        },
        cancel: function cancel(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/cancel-publish",
            data: input
          });
        },
        validate: function validate() {
          return _this.request({
            method: "GET",
            endpoint: "/manage/validate-publish"
          });
        },
        republish: function republish(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/republish",
            data: input
          });
        }
      },
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
        },
        resendEmailInvite: function resendEmailInvite(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/resend-email-invite",
            data: input
          });
        }
      },
      struct: {
        weight: function weight(input) {
          return _this.request({
            method: "POST",
            endpoint: "/manage/weight-struct",
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
        weight: function weight(input) {
          return _this.request({
            method: "POST",
            endpoint: "/mutation/weight-group",
            data: input
          });
        },
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
            endpoint: "/manage/list-group",
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
          "Content-Type": "application/json"
        }, this.lang && {
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
        var _err$response, _err$response2, _err$response3;
        return {
          status: (_err$response = err.response) == null ? void 0 : _err$response.status,
          errors: (_err$response2 = err.response) == null ? void 0 : _err$response2.data.errors,
          message: (_err$response3 = err.response) == null ? void 0 : _err$response3.data.message
        };
      });
    });
    function request(_x4) {
      return _request.apply(this, arguments);
    }
    return request;
  }();
  return UniwebService;
}();
var UniwebInstance = new UniwebService();

export { Group, PublishStatus, Resource, Role, UniwebInstance, UniwebService, UserStatus };
//# sourceMappingURL=index.mjs.map
