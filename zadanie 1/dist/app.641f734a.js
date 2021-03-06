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
})({"public/ts/Calculations.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calculations = void 0;

var Calculations = /*#__PURE__*/function () {
  function Calculations(elementsInput) {
    _classCallCheck(this, Calculations);

    this.elementsInput = 0;
    this.arrayNumber = [];
    this.elementsInput = elementsInput;
    this.calc();
  }

  _createClass(Calculations, [{
    key: "calc",
    value: function calc() {
      var _this = this;

      var _a;

      (_a = document.getElementById('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
        _this.addElement();

        _this.settingsField();

        _this.showText();

        _this.clearArray();
      });
    }
  }, {
    key: "showText",
    value: function showText() {
      document.querySelector(".show").style.display = "block";
    }
  }, {
    key: "clearArray",
    value: function clearArray() {
      this.arrayNumber = [];
    }
  }, {
    key: "addElement",
    value: function addElement() {
      for (var index = 0; index < this.elementsInput; index++) {
        this.arrayNumber.push(document.querySelector("input#obj" + index).value);
      }
    }
  }, {
    key: "settingsField",
    value: function settingsField() {
      Math.min.apply(Math, _toConsumableArray(this.arrayNumber)) ? document.querySelector('span#fourth').innerHTML = Math.min.apply(Math, _toConsumableArray(this.arrayNumber)) : document.querySelector('span#fourth').innerHTML = "czekaj...";
      Math.max.apply(Math, _toConsumableArray(this.arrayNumber)) ? document.querySelector('span#third').innerHTML = Math.max.apply(Math, _toConsumableArray(this.arrayNumber)) : document.querySelector('span#third').innerHTML = "czekaj...";
      this.arithmeticAverage(this.arrayNumber) ? document.querySelector('span#secound').innerHTML = this.arithmeticAverage(this.arrayNumber) : document.querySelector('span#secound').innerHTML = "czekaj...";
      this.sum(this.arrayNumber) ? document.querySelector('span#first').innerHTML = this.sum(this.arrayNumber) : document.querySelector('span#first').innerHTML = "czekaj...";
    }
  }, {
    key: "sum",
    value: function sum(array) {
      var average = 0;
      array.forEach(function (element) {
        average += Number(element);
      });
      var result = average;
      return result;
    }
  }, {
    key: "arithmeticAverage",
    value: function arithmeticAverage(array) {
      var average = 0;
      array.forEach(function (element) {
        average += Number(element);
      });
      var result = average / this.elementsInput;
      return result;
    }
  }]);

  return Calculations;
}();

exports.Calculations = Calculations;
},{}],"public/ts/CreateInputs.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateInputs = void 0;

var Calculations_1 = require("./Calculations");

var CreateInputs = /*#__PURE__*/function () {
  function CreateInputs() {
    _classCallCheck(this, CreateInputs);

    this.elementsInput = 0;
    this.arrayString = [];
    this.objectHtml = "";
    this.buildInputs();
  }

  _createClass(CreateInputs, [{
    key: "clearInputs",
    value: function clearInputs() {
      var _this = this;

      var button = document.querySelector("#buttonDelete");
      button === null || button === void 0 ? void 0 : button.addEventListener('click', function (event) {
        _this.arrayString = [];
        _this.objectHtml = "";
        _this.elementsInput = 0;
        document.querySelector("#generate").value = "";

        _this.render();
      });
    }
  }, {
    key: "clearInput",
    value: function clearInput() {
      var _this2 = this;

      var elementsClear = document.querySelectorAll("#clearElement");
      elementsClear.forEach(function (element, index) {
        element === null || element === void 0 ? void 0 : element.addEventListener('click', function (event) {
          var element = _this2.arrayString.indexOf(_this2.arrayString[index]);

          _this2.arrayString.splice(element, 1);

          _this2.createInputsElement();

          _this2.elementsInput = _this2.elementsInput - 1;

          _this2.render();
        });
      });
    }
  }, {
    key: "buildInputs",
    value: function buildInputs() {
      var _this3 = this;

      var counter = document.querySelector("#generate");
      counter === null || counter === void 0 ? void 0 : counter.addEventListener("keydown", function (event) {
        _this3.clearInputs();

        _this3.clear();

        var evKey = event;
        _this3.elementsInput += parseInt(evKey.key);

        _this3.createInputs();

        _this3.settings_button();

        new Calculations_1.Calculations(_this3.elementsInput);

        _this3.render();
      });
    }
  }, {
    key: "settings_button",
    value: function settings_button() {
      if (this.elementsInput != 0) {
        document.querySelector("#button").style.display = "block";
        document.querySelector("#buttonDelete").style.display = "block";
      } else {
        document.querySelector("#button").style.display = "none";
        document.querySelector("#buttonDelete").style.display = "none";
      }
    }
  }, {
    key: "render",
    value: function render() {
      document.querySelector(".app").innerHTML = this.objectHtml;
      this.settings_button();
      new Calculations_1.Calculations(this.elementsInput);
      this.clearInput();
      document.querySelector(".show").style.display = "none";
    }
  }, {
    key: "createInputs",
    value: function createInputs() {
      for (var index = 0; index < this.elementsInput; index++) {
        this.arrayString.push("<label for=''>Liczba " + (index + 1) + "<input id='obj" + index + "' placeholder='podaj liczb??' type='text'><button id='clearElement'>-</button></label>");
      }

      this.createInputsElement();
      document.querySelector(".app").innerHTML = this.objectHtml;
    }
  }, {
    key: "createInputsElement",
    value: function createInputsElement() {
      this.objectHtml = this.arrayString.join("");
    }
  }, {
    key: "clear",
    value: function clear() {
      this.arrayString = [];
      this.objectHtml = "";
      this.elementsInput = 0;
    }
  }]);

  return CreateInputs;
}();

exports.CreateInputs = CreateInputs;
},{"./Calculations":"public/ts/Calculations.ts"}],"public/ts/app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CreateInputs_1 = require("./CreateInputs");

var test = new CreateInputs_1.CreateInputs();
},{"./CreateInputs":"public/ts/CreateInputs.ts"}],"../../AppData/Roaming/nvm/v16.0.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55815" + '/');

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
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
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
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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
},{}]},{},["../../AppData/Roaming/nvm/v16.0.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","public/ts/app.ts"], null)
//# sourceMappingURL=/app.641f734a.js.map