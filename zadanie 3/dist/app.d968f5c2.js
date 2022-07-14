// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"tsc/search.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;

var Search = /*#__PURE__*/function () {
  function Search() {
    _classCallCheck(this, Search);

    this._city = "";
    this.searchCity();
  }

  _createClass(Search, [{
    key: "searchCity",
    value: function searchCity() {
      this._city = document.querySelector(".inputCity").value;
    }
  }, {
    key: "city",
    get: function get() {
      return this._city;
    }
  }]);

  return Search;
}();

exports.Search = Search;
},{}],"tsc/getWeather.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetWeather = void 0;

var GetWeather = /*#__PURE__*/function () {
  function GetWeather(city) {
    _classCallCheck(this, GetWeather);

    this.city = "";
    this.time = this.countTime(2);
    this.city = city;
    this.settingApi(city);
    this.refresh(localStorage.getItem("city"));
  } // 3901c785d0664e444c3126d8e4fe8e8d


  _createClass(GetWeather, [{
    key: "countTime",
    value: function countTime(time) {
      return time * 60 * 1000;
    }
  }, {
    key: "settingApi",
    value: function settingApi(city) {
      this.apiCity("https://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&APPID=efa2ef11f117f7485b2fca8e87a3a2f5&units=metric");
    }
  }, {
    key: "refresh",
    value: function refresh(city) {
      var _this = this;

      setInterval(function () {
        console.log(city);

        var dataWeather = _this.settingApi(city);
      }, this.time);
    }
  }, {
    key: "apiCity",
    value: function apiCity(url) {
      var _this2 = this;

      return fetch(url).then(function (response) {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      }).then(function (data) {
        _this2.settingText(data);

        _this2.chart(data.coord.lon, data.coord.lat);

        return data;
      });
    }
  }, {
    key: "apiChart",
    value: function apiChart(url) {
      var _this3 = this;

      return fetch(url).then(function (response) {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      }).then(function (data) {
        console.log("data", data);

        _this3.printChart(data.hourly);

        return data;
      });
    }
  }, {
    key: "printChart",
    value: function printChart(hourly) {
      var _this4 = this;

      console.log(hourly);
      var arrayWeather = [];
      var data = new Date().getTime();
      var minute = 1000 * 60;
      var hour = minute * 60;
      arrayWeather = hourly.map(function (e, key) {
        return "<tr><td> " + new Date(data + hour * key).getHours() + "</td><td> " + e.temp + " ℃</td><td><img src=" + _this4.settingImg(e, false) + "></td></tr>";
      });
      arrayWeather.unshift("<tr><th>Godzina</th><th>Temperatura</th><th>Grafika</th></tr>");
      document.querySelector("table").innerHTML = arrayWeather.join("");
    }
  }, {
    key: "chart",
    value: function chart(lon, lat) {
      console.log(lon, lat);
      var api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily,minutely,current,alerts&units=metric&appid=efa2ef11f117f7485b2fca8e87a3a2f5";
      this.apiChart(api);
    }
  }, {
    key: "settingText",
    value: function settingText(data) {
      document.querySelector(".spanCity").innerHTML = data.name;
      document.querySelector(".spanHumidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".spanTemp").innerHTML = data.main.temp + "℃";
      document.querySelector(".spanPressure").innerHTML = data.main.pressure + "hPa";
      this.settingImg(data);
    }
  }, {
    key: "settingImg",
    value: function settingImg(data) {
      var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var status = data.weather[0].main;
      console.log(status);
      var url = "";

      switch (status) {
        case "Clear":
          url = "http://openweathermap.org/img/wn/01d@2x.png";
          break;

        case "Rain":
          url = "http://openweathermap.org/img/wn/10d@2x.png";
          break;

        case "Thunderstorm":
          url = "http://openweathermap.org/img/wn/11d@2x.png";
          break;

        case "Drizzle":
          url = "http://openweathermap.org/img/wn/09d@2x.png";
          break;

        case "Snow":
          url = "http://openweathermap.org/img/wn/13d@2x.png";
          break;

        case "Clouds":
          url = "http://openweathermap.org/img/wn/02d@2x.png";
          break;

        default:
          url = "https://ssl.gstatic.com/onebox/weather/48/sunny.png";
          break;
      } //ssl.gstatic.com/onebox/weather/64/rain_light.png


      if (flag) {
        document.querySelector(".weatherImg").src = url;
      } else {
        return url;
      }
    }
  }]);

  return GetWeather;
}();

exports.GetWeather = GetWeather;
},{}],"tsc/weather.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weather = void 0;

var search_1 = require("./search");

var getWeather_1 = require("./getWeather");

var Weather = /*#__PURE__*/function () {
  function Weather() {
    _classCallCheck(this, Weather);

    this.search = new search_1.Search();
    this.render(this.search);
  }

  _createClass(Weather, [{
    key: "render",
    value: function render(search) {
      var _this = this;

      var button = document.querySelector(".btn");
      button === null || button === void 0 ? void 0 : button.addEventListener('click', function (event) {
        _this.search = new search_1.Search();
        _this.api = new getWeather_1.GetWeather(_this.search.city);

        _this.showApp();

        localStorage.setItem("city", _this.search.city);
      });

      if (typeof localStorage.getItem("city") === "string") {
        this.showApp();
        this.api = new getWeather_1.GetWeather(this.search.city);
      }
    }
  }, {
    key: "showApp",
    value: function showApp() {
      document.querySelector(".app").style.display = "block";
    }
  }]);

  return Weather;
}();

exports.Weather = Weather;
},{"./search":"tsc/search.ts","./getWeather":"tsc/getWeather.ts"}],"tsc/app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var weather_1 = require("./weather");

var app = new weather_1.Weather(); //   let dataWeather = api("https://api.openweathermap.org/data/2.5/weather?q=Katowice&APPID=efa2ef11f117f7485b2fca8e87a3a2f5&units=metric")
//   console.log(dataWeather)
},{"./weather":"tsc/weather.ts"}],"../../../AppData/Roaming/nvm/v16.0.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57497" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/nvm/v16.0.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","tsc/app.ts"], null)
//# sourceMappingURL=/app.d968f5c2.js.map