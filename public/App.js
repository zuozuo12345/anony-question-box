"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
var tokenClient;
var CLIENT_ID = "235123572069-3qul5k0egqtegb31bh7qs4fmeiljkfta.apps.googleusercontent.com";
var API_KEY = "AIzaSyDJPl5FJ4Y1QMISN4c5YBMTtTuYray0eyI";
var DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
var SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
var gapiInited = false;
var gisInited = false;
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}
function initializeGapiClient() {
  return _initializeGapiClient.apply(this, arguments);
}
function _initializeGapiClient() {
  _initializeGapiClient = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC]
          });
        case 2:
          gapiInited = true;
        case 3:
        case "end":
          return _context25.stop();
      }
    }, _callee25);
  }));
  return _initializeGapiClient.apply(this, arguments);
}
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: ''
  });
  gisInited = true;
}
function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}
function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(query) {
    var variables,
      response,
      body,
      result,
      error,
      _error$extensions$exc,
      details,
      _args26 = arguments;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          variables = _args26.length > 1 && _args26[1] !== undefined ? _args26[1] : {};
          _context26.prev = 1;
          _context26.next = 4;
          return fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          });
        case 4:
          response = _context26.sent;
          _context26.next = 7;
          return response.text();
        case 7:
          body = _context26.sent;
          result = JSON.parse(body, jsonDateReviver);
          if (result.errors) {
            error = result.errors[0];
            if (error.extensions.code === 'BAD_USER_INPUT') {
              details = (_error$extensions$exc = error.extensions.exception.errors) === null || _error$extensions$exc === void 0 ? void 0 : _error$extensions$exc.join('\n ');
              alert("".concat(error.message, ":\n ").concat(details));
            } else {
              alert("".concat(error.extensions.code, ": ").concat(error.message));
            }
          }
          return _context26.abrupt("return", result.data);
        case 13:
          _context26.prev = 13;
          _context26.t0 = _context26["catch"](1);
          alert("Error in sending data to server: ".concat(_context26.t0.message));
        case 16:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}
function getInfo() {
  return _getInfo.apply(this, arguments);
}
function _getInfo() {
  _getInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
    var name, token, query;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          name = localStorage.getItem("name");
          token = localStorage.getItem("token");
          console.log("in signup and login token and name", token, name);
          if (!(name && token)) {
            _context27.next = 8;
            break;
          }
          query = "\n    query GetUserInfo($input: GetUserInfo!) {\n      getUserInfo(input: $input) {\n        userId\n        name\n        nickname\n        birthday\n        sex\n        hobbies\n        country_region\n      }\n    }\n  ";
          _context27.next = 7;
          return graphQLFetch(query, {
            input: {
              name: name,
              token: token
            }
          });
        case 7:
          return _context27.abrupt("return", _context27.sent);
        case 8:
          return _context27.abrupt("return", null);
        case 9:
        case "end":
          return _context27.stop();
      }
    }, _callee27);
  }));
  return _getInfo.apply(this, arguments);
}
var MyInfo = /*#__PURE__*/function (_React$Component) {
  _inherits(MyInfo, _React$Component);
  var _super = _createSuper(MyInfo);
  function MyInfo(props) {
    var _this;
    _classCallCheck(this, MyInfo);
    _this = _super.call(this, props);
    _this.state = {
      userInfo: null,
      editing: false
    };
    _this.handleEdit = _this.handleEdit.bind(_assertThisInitialized(_this));
    _this.handleFinish = _this.handleFinish.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleLogout = _this.handleLogout.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(MyInfo, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getInfo();
            case 2:
              result = _context.sent;
              if (result && result.getUserInfo) {
                this.setState({
                  userInfo: result.getUserInfo
                });
              } else {
                alert("Please login or signup first!");
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "handleEdit",
    value: function handleEdit() {
      this.setState({
        editing: true
      });
    }
  }, {
    key: "handleLogout",
    value: function handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      this.props.onLogout();
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;
      this.setState({
        userInfo: _objectSpread(_objectSpread({}, this.state.userInfo), {}, _defineProperty({}, name, value))
      });
    }
  }, {
    key: "handleFinish",
    value: function () {
      var _handleFinish = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var query, userInfo, _this$props, token, name, input, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              query = "\n      mutation UpdateUserInfo($input: UpdateUserInfo!) {\n        updateUserInfo(input: $input) {\n          successful\n          remark\n        }\n      }\n    ";
              userInfo = this.state.userInfo;
              _this$props = this.props, token = _this$props.token, name = _this$props.name;
              input = _objectSpread(_objectSpread({}, userInfo), {}, {
                token: token,
                name: name
              });
              _context2.next = 6;
              return graphQLFetch(query, {
                input: input
              });
            case 6:
              result = _context2.sent;
              if (result.updateUserInfo.successful) {
                this.setState({
                  editing: false
                });
              } else {
                alert(result.updateUserInfo.remark);
              }
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function handleFinish() {
        return _handleFinish.apply(this, arguments);
      }
      return handleFinish;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var name = this.props.name;
      var token = this.props.token;
      if (!name || !token) {
        return /*#__PURE__*/React.createElement(SignupAndLogin, {
          onLoginSuccess: this.props.onLoginSuccess
        });
      }
      var _this$state = this.state,
        userInfo = _this$state.userInfo,
        editing = _this$state.editing;
      if (!userInfo) return /*#__PURE__*/React.createElement("div", null, "Loading...");
      var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
      return /*#__PURE__*/React.createElement("div", {
        className: "myInfo",
        id: "my-info"
      }, /*#__PURE__*/React.createElement("h2", null, "Myself Info"), /*#__PURE__*/React.createElement("div", {
        className: "infoTable"
      }, Object.entries(userInfo).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        if (key === 'name') return null;
        if (key === 'userId') return null;
        var displayValue;
        if (editing) {
          if (key === 'sex') {
            displayValue = /*#__PURE__*/React.createElement("select", {
              name: "sex",
              value: value || '',
              onChange: _this2.handleInputChange
            }, /*#__PURE__*/React.createElement("option", {
              value: "not tell"
            }, "Not Tell"), /*#__PURE__*/React.createElement("option", {
              value: "male"
            }, "Male"), /*#__PURE__*/React.createElement("option", {
              value: "female"
            }, "Female"));
          } else if (key === 'country_region') {
            displayValue = /*#__PURE__*/React.createElement("select", {
              name: "country_region",
              value: value || '',
              onChange: _this2.handleInputChange
            }, /*#__PURE__*/React.createElement("option", {
              value: ""
            }, "Select Country"), countries.map(function (country) {
              return /*#__PURE__*/React.createElement("option", {
                key: country,
                value: country
              }, country);
            }));
          } else {
            displayValue = /*#__PURE__*/React.createElement("input", {
              type: key === 'birthday' ? 'date' : 'text',
              name: key,
              value: value || '',
              onChange: _this2.handleInputChange,
              readOnly: key === 'name' || key === 'userId'
            });
          }
        } else {
          displayValue = /*#__PURE__*/React.createElement("span", null, key === 'birthday' && value ? new Date(value).toLocaleDateString() : value || '-');
        }
        return /*#__PURE__*/React.createElement("div", {
          key: key
        }, /*#__PURE__*/React.createElement("label", null, key, ":"), displayValue);
      })), /*#__PURE__*/React.createElement("div", null, editing ? /*#__PURE__*/React.createElement("button", {
        onClick: this.handleFinish
      }, "Finish") : /*#__PURE__*/React.createElement("button", {
        onClick: this.handleEdit
      }, "Edit"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleLogout
      }, "Logout")));
    }
  }]);
  return MyInfo;
}(React.Component);
var Index = /*#__PURE__*/function (_React$Component2) {
  _inherits(Index, _React$Component2);
  var _super2 = _createSuper(Index);
  function Index() {
    _classCallCheck(this, Index);
    return _super2.apply(this, arguments);
  }
  _createClass(Index, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "index"
      }, /*#__PURE__*/React.createElement("p", {
        className: "title"
      }, "Welcome to the Anonymous Question Box!"), /*#__PURE__*/React.createElement("p", {
        className: "intro"
      }, "This is an anonymous question box, where you can share your question box with others via URL, and  expect questions from others. All the questions and answers will be anonymous. And don't worry, potentially hazardous contents are automatically filtered by NLP. Have fun!"));
    }
  }]);
  return Index;
}(React.Component);
var MyQuestion = /*#__PURE__*/function (_React$Component3) {
  _inherits(MyQuestion, _React$Component3);
  var _super3 = _createSuper(MyQuestion);
  function MyQuestion(props) {
    var _this3;
    _classCallCheck(this, MyQuestion);
    _this3 = _super3.call(this, props);
    _this3.state = {
      questionsWithAnswers: []
    };
    _this3.refresh = _this3.refresh.bind(_assertThisInitialized(_this3));
    return _this3;
  }
  _createClass(MyQuestion, [{
    key: "refresh",
    value: function () {
      var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var token, name, guestname, getQuestionsQuery, input, questionsResult, questions, questionsWithAnswers;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              token = localStorage.getItem('token');
              name = localStorage.getItem('name');
              if (!(!token || !name)) {
                _context4.next = 5;
                break;
              }
              this.props.history.push('/signup-and-login');
              return _context4.abrupt("return");
            case 5:
              guestname = name; // Replace the getQuestions call with a GraphQL query
              getQuestionsQuery = "\n      query gbg($input: GetQuestionsByGuest!) {\n        getQuestionsByGuest(input: $input) {\n          successful, questions{questionId, content, timestamp, hostname, guestname}, remark\n        }\n      }\n    ";
              input = {
                guestname: guestname,
                token: token
              };
              _context4.next = 10;
              return graphQLFetch(getQuestionsQuery, {
                input: input
              });
            case 10:
              questionsResult = _context4.sent;
              if (questionsResult.getQuestionsByGuest.successful) {
                _context4.next = 15;
                break;
              }
              alert(questionsResult.getQuestionsByGuest.remark);
              this.props.history.push('/');
              return _context4.abrupt("return");
            case 15:
              questions = questionsResult.getQuestionsByGuest.questions;
              _context4.next = 18;
              return Promise.all(questions.map( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(question) {
                  var getAnswersQuery, answersResult, answers;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        // Replace the getAnswers call with a GraphQL query
                        getAnswersQuery = "\n            query GetAnswers($input: GetAnswers!) {\n              getAnswers(input: $input) {\n                content\n                isHost\n                questionId\n                timestamp\n              }\n            }\n          ";
                        _context3.next = 3;
                        return graphQLFetch(getAnswersQuery, {
                          input: {
                            questionId: question.questionId
                          }
                        });
                      case 3:
                        answersResult = _context3.sent;
                        answers = answersResult.getAnswers;
                        if (!(answers.length > 0)) {
                          _context3.next = 7;
                          break;
                        }
                        return _context3.abrupt("return", {
                          question: question,
                          answers: answers
                        });
                      case 7:
                        return _context3.abrupt("return", {
                          question: question,
                          answers: []
                        });
                      case 8:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 18:
              questionsWithAnswers = _context4.sent;
              this.setState({
                questionsWithAnswers: questionsWithAnswers.filter(function (q) {
                  return q !== null;
                })
              });
            case 20:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function refresh() {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.refresh();
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function componentDidMount() {
        return _componentDidMount2.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/React.createElement("div", null, this.state.questionsWithAnswers.map(function (q, index) {
        return /*#__PURE__*/React.createElement(QuestionAndAnswer, _extends({
          key: index,
          refreshHandler: _this4.refresh,
          canDelete: true,
          showHost: true
        }, q));
      }));
    }
  }]);
  return MyQuestion;
}(React.Component);
var MyAnswers = /*#__PURE__*/function (_React$Component4) {
  _inherits(MyAnswers, _React$Component4);
  var _super4 = _createSuper(MyAnswers);
  function MyAnswers() {
    _classCallCheck(this, MyAnswers);
    return _super4.apply(this, arguments);
  }
  _createClass(MyAnswers, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("span", null, "My Answers");
    }
  }]);
  return MyAnswers;
}(React.Component);
var MyGroup = /*#__PURE__*/function (_React$Component5) {
  _inherits(MyGroup, _React$Component5);
  var _super5 = _createSuper(MyGroup);
  function MyGroup() {
    _classCallCheck(this, MyGroup);
    return _super5.apply(this, arguments);
  }
  _createClass(MyGroup, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("span", null, "My Group");
    }
  }]);
  return MyGroup;
}(React.Component);
var AskQuestionBox = /*#__PURE__*/function (_React$Component6) {
  _inherits(AskQuestionBox, _React$Component6);
  var _super6 = _createSuper(AskQuestionBox);
  function AskQuestionBox(props) {
    var _this5;
    _classCallCheck(this, AskQuestionBox);
    _this5 = _super6.call(this, props);
    _this5.state = {
      question: '',
      submitted: false,
      questionsWithAnswers: []
    };
    _this5.handleInputChange = _this5.handleInputChange.bind(_assertThisInitialized(_this5));
    _this5.handleSubmit = _this5.handleSubmit.bind(_assertThisInitialized(_this5));
    _this5.fetchQuestions = _this5.fetchQuestions.bind(_assertThisInitialized(_this5));
    return _this5;
  }
  _createClass(AskQuestionBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchQuestions();
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      var token = localStorage.getItem('token');
      var name = localStorage.getItem('name');
      var hostname = new URLSearchParams(this.props.location.search).get('name');
      if (!token || !name) {
        // Redirect to SignupAndLogin
        localStorage.setItem('hostname', hostname);
        this.props.history.push('/signup-and-login');
        return;
      }
      this.setState({
        question: e.target.value
      });
    }
  }, {
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
        var question, token, name, hostname, guestname, query, input, result;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              e.preventDefault();
              question = this.state.question; // Check if there's a token and name in localStorage
              token = localStorage.getItem('token');
              name = localStorage.getItem('name');
              if (!(!token || !name)) {
                _context6.next = 8;
                break;
              }
              // Redirect to SignupAndLogin
              localStorage.setItem('hostname', hostname);
              this.props.history.push('/signup-and-login');
              return _context6.abrupt("return");
            case 8:
              hostname = new URLSearchParams(this.props.location.search).get('name');
              guestname = localStorage.getItem('name');
              query = "\n      mutation CreateQuestion($input: CreateQuestion!) {\n        createQuestion(input: $input) {\n          successful\n          questionId\n          remark\n        }\n      }\n    ";
              input = {
                hostname: hostname,
                guestname: guestname,
                content: question,
                token: token
              };
              _context6.next = 14;
              return graphQLFetch(query, {
                input: input
              });
            case 14:
              result = _context6.sent;
              if (result.createQuestion.successful) {
                alert('Question submitted successfully.');
                this.setState({
                  submitted: true
                });
              } else {
                alert("Error: ".concat(result.createQuestion.remark));
              }
              // Submit the question and fetch updated questions list
              // ... your submission logic here ...
              // this.fetchQuestions();
            case 16:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function handleSubmit(_x3) {
        return _handleSubmit.apply(this, arguments);
      }
      return handleSubmit;
    }()
  }, {
    key: "fetchQuestions",
    value: function () {
      var _fetchQuestions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var token, name, hostname, getQuestionsQuery, questionsResult, questions, questionsWithAnswers;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              token = localStorage.getItem('token');
              name = localStorage.getItem('name'); // if (!token || !name) {
              //   this.props.history.push('/signup-and-login');
              //   return;
              // }
              hostname = this.props.location.search.split('=')[1]; // Replace the getQuestions call with a GraphQL query
              getQuestionsQuery = "\n            query GetQuestions($input: GetQuestions!) {\n              getQuestions(input: $input) {\n                questionId\n                content\n                timestamp\n              }\n            }\n          ";
              _context8.next = 6;
              return graphQLFetch(getQuestionsQuery, {
                input: {
                  hostname: hostname
                }
              });
            case 6:
              questionsResult = _context8.sent;
              questions = questionsResult.getQuestions;
              _context8.next = 10;
              return Promise.all(questions.map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(question) {
                  var getAnswersQuery, answersResult, answers;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        // Replace the getAnswers call with a GraphQL query
                        getAnswersQuery = "\n                    query GetAnswers($input: GetAnswers!) {\n                      getAnswers(input: $input) {\n                        content\n                        isHost\n                        questionId\n                        timestamp\n                      }\n                    }\n                  ";
                        _context7.next = 3;
                        return graphQLFetch(getAnswersQuery, {
                          input: {
                            questionId: question.questionId
                          }
                        });
                      case 3:
                        answersResult = _context7.sent;
                        answers = answersResult.getAnswers;
                        if (!(answers.length > 0)) {
                          _context7.next = 7;
                          break;
                        }
                        return _context7.abrupt("return", {
                          question: question,
                          answers: answers
                        });
                      case 7:
                        return _context7.abrupt("return", {
                          question: question,
                          answers: []
                        });
                      case 8:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7);
                }));
                return function (_x4) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 10:
              questionsWithAnswers = _context8.sent;
              this.setState({
                questionsWithAnswers: questionsWithAnswers.filter(function (q) {
                  return q !== null;
                })
              });
            case 12:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function fetchQuestions() {
        return _fetchQuestions.apply(this, arguments);
      }
      return fetchQuestions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;
      var _this$state2 = this.state,
        question = _this$state2.question,
        submitted = _this$state2.submitted,
        questionsWithAnswers = _this$state2.questionsWithAnswers;
      var hostname = this.props.location.search.split('=')[1];
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "ask-question-box"
      }, /*#__PURE__*/React.createElement("h2", null, "Ask a question to ", new URLSearchParams(this.props.location.search).get('name')), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        value: question,
        onChange: this.handleInputChange,
        placeholder: "Ask a question",
        required: true
      }), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Submit"))), /*#__PURE__*/React.createElement("div", null, questionsWithAnswers.map(function (q, index) {
        return /*#__PURE__*/React.createElement(QuestionAndAnswer, _extends({
          key: index,
          refreshHandler: _this6.refresh,
          canDelete: true
        }, q));
      })));
    }
  }]);
  return AskQuestionBox;
}(React.Component);
var GenerateQuestionBox = /*#__PURE__*/function (_React$Component7) {
  _inherits(GenerateQuestionBox, _React$Component7);
  var _super7 = _createSuper(GenerateQuestionBox);
  function GenerateQuestionBox(props) {
    var _this7;
    _classCallCheck(this, GenerateQuestionBox);
    _this7 = _super7.call(this, props);
    _this7.state = {
      questionsWithAnswers: [],
      showUrl: false
    };
    _this7.urlRef = React.createRef();
    _this7.refresh = _this7.refresh.bind(_assertThisInitialized(_this7));
    return _this7;
  }
  _createClass(GenerateQuestionBox, [{
    key: "refresh",
    value: function () {
      var _refresh2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var token, name, hostname, getQuestionsQuery, questionsResult, questions, questionsWithAnswers;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              token = localStorage.getItem('token');
              name = localStorage.getItem('name');
              if (!(!token || !name)) {
                _context10.next = 5;
                break;
              }
              this.props.history.push('/signup-and-login');
              return _context10.abrupt("return");
            case 5:
              hostname = name; // Replace the getQuestions call with a GraphQL query
              getQuestionsQuery = "\n      query GetQuestions($input: GetQuestions!) {\n        getQuestions(input: $input) {\n          questionId\n          content\n          timestamp\n        }\n      }\n    ";
              _context10.next = 9;
              return graphQLFetch(getQuestionsQuery, {
                input: {
                  hostname: hostname
                }
              });
            case 9:
              questionsResult = _context10.sent;
              questions = questionsResult.getQuestions;
              _context10.next = 13;
              return Promise.all(questions.map( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(question) {
                  var getAnswersQuery, answersResult, answers;
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        // Replace the getAnswers call with a GraphQL query
                        getAnswersQuery = "\n        query GetAnswers($input: GetAnswers!) {\n          getAnswers(input: $input) {\n            content\n            isHost\n            questionId\n            timestamp\n          }\n        }\n      ";
                        _context9.next = 3;
                        return graphQLFetch(getAnswersQuery, {
                          input: {
                            questionId: question.questionId
                          }
                        });
                      case 3:
                        answersResult = _context9.sent;
                        answers = answersResult.getAnswers;
                        if (!(answers.length > 0)) {
                          _context9.next = 7;
                          break;
                        }
                        return _context9.abrupt("return", {
                          question: question,
                          answers: answers
                        });
                      case 7:
                        return _context9.abrupt("return", null);
                      case 8:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                }));
                return function (_x5) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 13:
              questionsWithAnswers = _context10.sent;
              this.setState({
                questionsWithAnswers: questionsWithAnswers.filter(function (q) {
                  return q !== null;
                })
              });
            case 15:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function refresh() {
        return _refresh2.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.refresh();
            case 2:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function componentDidMount() {
        return _componentDidMount3.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "generateUrl",
    value: function generateUrl() {
      var name = localStorage.getItem('name');
      return "localhost:3000/ask-question?name=".concat(name);
    }
  }, {
    key: "copyUrlToClipboard",
    value: function copyUrlToClipboard() {
      this.urlRef.current.select();
      document.execCommand('copy');
      alert('URL copied to clipboard!');
    }
  }, {
    key: "handleClickGenerate",
    value: function handleClickGenerate() {
      this.setState({
        showUrl: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;
      var _this$state3 = this.state,
        questionsWithAnswers = _this$state3.questionsWithAnswers,
        showUrl = _this$state3.showUrl;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        ref: this.urlRef,
        value: this.generateUrl(),
        readOnly: true,
        style: {
          width: '80%',
          marginRight: '10px'
        }
      }), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return _this8.copyUrlToClipboard();
        }
      }, "Copy URL")), /*#__PURE__*/React.createElement("div", null, questionsWithAnswers.map(function (q, index) {
        return /*#__PURE__*/React.createElement(QuestionAndAnswer, _extends({
          key: index,
          refreshHandler: _this8.refresh,
          canDelete: true
        }, q));
      })));
    }
  }]);
  return GenerateQuestionBox;
}(React.Component);
var SignupAndLogin = /*#__PURE__*/function (_React$Component8) {
  _inherits(SignupAndLogin, _React$Component8);
  var _super8 = _createSuper(SignupAndLogin);
  function SignupAndLogin(props) {
    var _this9;
    _classCallCheck(this, SignupAndLogin);
    _this9 = _super8.call(this, props);
    _this9.state = {
      signupForm: {
        name: "",
        nickname: "",
        password: ""
      },
      loginForm: {
        name: "",
        nickname: "",
        password: ""
      }
    };
    _this9.handleSignupChange = _this9.handleSignupChange.bind(_assertThisInitialized(_this9));
    _this9.handleLoginChange = _this9.handleLoginChange.bind(_assertThisInitialized(_this9));
    _this9.handleSubmitSignUp = _this9.handleSubmitSignUp.bind(_assertThisInitialized(_this9));
    _this9.handleSubmitLogIn = _this9.handleSubmitLogIn.bind(_assertThisInitialized(_this9));
    return _this9;
  }
  _createClass(SignupAndLogin, [{
    key: "handleSignupChange",
    value: function handleSignupChange(e) {
      this.setState({
        signupForm: _objectSpread(_objectSpread({}, this.state.signupForm), {}, _defineProperty({}, e.target.name, e.target.value))
      });
    }
  }, {
    key: "handleLoginChange",
    value: function handleLoginChange(e) {
      this.setState({
        loginForm: _objectSpread(_objectSpread({}, this.state.loginForm), {}, _defineProperty({}, e.target.name, e.target.value))
      });
    }
  }, {
    key: "handleSubmitSignUp",
    value: function () {
      var _handleSubmitSignUp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(e) {
        var query, result;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              e.preventDefault();
              query = "\n      mutation SignUp($input: SignUpInput!) {\n        signUp(input: $input) {\n          successful\n          token\n          expiration\n          remark\n\n        }\n      }\n    ";
              _context12.next = 4;
              return graphQLFetch(query, {
                input: this.state.signupForm
              });
            case 4:
              result = _context12.sent;
              if (result.signUp.successful) {
                this.props.onLoginSuccess({
                  token: result.signUp.token,
                  name: this.state.signupForm.name
                });
              } else {
                alert(result.signUp.remark);
              }
            case 6:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function handleSubmitSignUp(_x6) {
        return _handleSubmitSignUp.apply(this, arguments);
      }
      return handleSubmitSignUp;
    }()
  }, {
    key: "handleSubmitLogIn",
    value: function () {
      var _handleSubmitLogIn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(e) {
        var query, result, hostname;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              e.preventDefault();
              query = "\n    mutation LogIn($input: LogInInput!) {\n      logIn(input: $input) {\n        successful\n        token\n        expiration\n        remark\n        userId\n      }\n    }\n  ";
              _context13.next = 4;
              return graphQLFetch(query, {
                input: this.state.loginForm
              });
            case 4:
              result = _context13.sent;
              if (result.logIn.successful) {
                this.props.onLoginSuccess({
                  token: result.logIn.token,
                  name: this.state.loginForm.name
                });
                alert("Login successfully!");
                hostname = localStorage.getItem('hostname');
                localStorage.removeItem('hostname');
                if (hostname) {
                  this.props.history.push("/ask-question?name=".concat(hostname));
                }
                // Navigate to the new URL after a successful login
              } else {
                alert(result.logIn.remark);
              }
            case 6:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function handleSubmitLogIn(_x7) {
        return _handleSubmitLogIn.apply(this, arguments);
      }
      return handleSubmitLogIn;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
        signupForm = _this$state4.signupForm,
        loginForm = _this$state4.loginForm;
      return /*#__PURE__*/React.createElement("div", {
        className: "App"
      }, /*#__PURE__*/React.createElement("div", {
        className: "sign-up"
      }, /*#__PURE__*/React.createElement("h2", null, "Sign Up"), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmitSignUp
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        value: signupForm.name,
        onChange: this.handleSignupChange,
        placeholder: "Name(Unique)",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "nickname",
        value: signupForm.nickname,
        onChange: this.handleSignupChange,
        placeholder: "Nickname",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "password",
        name: "password",
        value: signupForm.password,
        onChange: this.handleSignupChange,
        placeholder: "Password",
        required: true
      }), /*#__PURE__*/React.createElement("div", null, "The password should include 1 Upper character and 1 number, and total length of it over 6 characters."), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Sign Up"))), /*#__PURE__*/React.createElement("div", {
        className: "log-in"
      }, /*#__PURE__*/React.createElement("h2", null, "Login"), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmitLogIn
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        value: loginForm.name,
        onChange: this.handleLoginChange,
        placeholder: "Name",
        required: true
      }), /*#__PURE__*/React.createElement("input", {
        type: "password",
        name: "password",
        value: loginForm.password,
        onChange: this.handleLoginChange,
        placeholder: "Password",
        required: true
      }), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Log In"))));
    }
  }]);
  return SignupAndLogin;
}(React.Component);
var Question = /*#__PURE__*/function (_React$Component9) {
  _inherits(Question, _React$Component9);
  var _super9 = _createSuper(Question);
  function Question(props) {
    var _this10;
    _classCallCheck(this, Question);
    _this10 = _super9.call(this, props);
    _this10.state = {
      questionId: _this10.props.location.search.split('=')[1],
      questionContent: "",
      timestamp: "",
      answers: [],
      answerContent: "",
      redirected: false,
      info: "birthday",
      infoDisplay: ""
    };
    _this10.myInfo = ["birthday", "hobbies", "country_region", "events of today"];
    _this10.handleAnswerChange = _this10.handleAnswerChange.bind(_assertThisInitialized(_this10));
    _this10.submitAnswer = _this10.submitAnswer.bind(_assertThisInitialized(_this10));
    _this10.changeSelect = _this10.changeSelect.bind(_assertThisInitialized(_this10));
    _this10.queryInfo = _this10.queryInfo.bind(_assertThisInitialized(_this10));
    _this10.showCalendarEvents = _this10.showCalendarEvents.bind(_assertThisInitialized(_this10));
    return _this10;
  }
  _createClass(Question, [{
    key: "refresh",
    value: function () {
      var _refresh3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
        var queryDetail, inputDetail, digest, queryAnswers, inputAnswers, answers;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              queryDetail = "\n      query gq($input:GetQuestionDetail!) {\n        getQuestionDetail(input:$input) {\n          questionId, content, timestamp\n        }\n      }\n    ";
              inputDetail = {
                questionId: this.state.questionId
              };
              _context14.next = 4;
              return graphQLFetch(queryDetail, {
                input: inputDetail
              });
            case 4:
              digest = _context14.sent;
              if (!(!digest || !digest.getQuestionDetail)) {
                _context14.next = 8;
                break;
              }
              this.setState({
                redirected: true
              });
              return _context14.abrupt("return");
            case 8:
              this.setState({
                questionContent: digest.getQuestionDetail.content,
                timestamp: digest.getQuestionDetail.timestamp.toString()
              });
              queryAnswers = "\n      query ga($input:GetAnswers!) {\n        getAnswers(input:$input){\n          content, isHost, timestamp\n        }\n      }\n    ";
              inputAnswers = {
                questionId: this.state.questionId,
                limit: 100
              };
              _context14.next = 13;
              return graphQLFetch(queryAnswers, {
                input: inputAnswers
              });
            case 13:
              answers = _context14.sent;
              console.log(answers.getAnswers);
              this.setState({
                answers: answers.getAnswers
              });
            case 16:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function refresh() {
        return _refresh3.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.refresh();
            case 2:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function componentDidMount() {
        return _componentDidMount4.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "handleAnswerChange",
    value: function handleAnswerChange(e) {
      this.setState({
        answerContent: e.target.value
      });
    }
  }, {
    key: "submitAnswer",
    value: function () {
      var _submitAnswer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(e) {
        var query, input, result, remark;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              e.preventDefault();
              query = "\n      mutation ca($input: CreateAnswer!) {\n        createAnswer(input:$input) {\n          successful, answerId, remark\n        }\n      }\n    ";
              input = {
                questionId: this.state.questionId,
                content: this.state.answerContent,
                guestname: localStorage.getItem("name"),
                token: localStorage.getItem("token")
              };
              _context16.next = 5;
              return graphQLFetch(query, {
                input: input
              });
            case 5:
              result = _context16.sent;
              if (!result.createAnswer.successful) {
                _context16.next = 12;
                break;
              }
              this.setState({
                answerContent: ""
              });
              _context16.next = 10;
              return this.refresh();
            case 10:
              _context16.next = 15;
              break;
            case 12:
              remark = result.createAnswer.remark;
              alert(remark);
              if (remark.startsWith("ERR_TOKEN") || remark.startsWith("ERR_QUESTION")) {
                this.setState({
                  redirected: true
                });
              }
            case 15:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function submitAnswer(_x8) {
        return _submitAnswer.apply(this, arguments);
      }
      return submitAnswer;
    }()
  }, {
    key: "changeSelect",
    value: function () {
      var _changeSelect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(e) {
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              this.setState({
                info: e.target.value
              });
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function changeSelect(_x9) {
        return _changeSelect.apply(this, arguments);
      }
      return changeSelect;
    }()
  }, {
    key: "queryInfo",
    value: function () {
      var _queryInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(e) {
        var _this11 = this;
        var info, result, birthday;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              info = this.state.info;
              if (!(info === "events of today")) {
                _context19.next = 6;
                break;
              }
              tokenClient.callback = /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(resp) {
                  return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        if (!(resp.error !== undefined)) {
                          _context18.next = 3;
                          break;
                        }
                        alert(resp);
                        return _context18.abrupt("return");
                      case 3:
                        _context18.next = 5;
                        return _this11.showCalendarEvents();
                      case 5:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                }));
                return function (_x11) {
                  return _ref6.apply(this, arguments);
                };
              }();
              if (gapi.client.getToken() === null) {
                tokenClient.requestAccessToken({
                  prompt: "consent"
                });
              } else {
                tokenClient.requestAccessToken({
                  prompt: ""
                });
              }
              _context19.next = 15;
              break;
            case 6:
              if (!info) {
                _context19.next = 14;
                break;
              }
              _context19.next = 9;
              return getInfo();
            case 9:
              result = _context19.sent;
              console.log(result);
              if (!result || !result.getUserInfo) {
                alert("Log in session expired, please log in again!");
                this.setState({
                  infoDisplay: ""
                });
              } else {
                if (info === "birthday") {
                  birthday = result.getUserInfo[info];
                  if (birthday) {
                    this.setState({
                      infoDisplay: birthday.toISOString().split('T')[0]
                    });
                  } else {
                    this.setState({
                      infoDisplay: ""
                    });
                  }
                } else {
                  this.setState({
                    infoDisplay: result.getUserInfo[info] || ""
                  });
                }
              }
              _context19.next = 15;
              break;
            case 14:
              this.setState({
                infoDisplay: ""
              });
            case 15:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function queryInfo(_x10) {
        return _queryInfo.apply(this, arguments);
      }
      return queryInfo;
    }()
  }, {
    key: "showCalendarEvents",
    value: function () {
      var _showCalendarEvents = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
        var response, listRequest, calendarIds, start, end, events, _iterator, _step, id, getResult;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              this.setState({
                infoDisplay: "Getting calendar events..."
              });
              _context20.prev = 1;
              listRequest = {
                'maxResults': 100
              };
              _context20.next = 5;
              return gapi.client.calendar.calendarList.list(listRequest);
            case 5:
              response = _context20.sent;
              _context20.next = 13;
              break;
            case 8:
              _context20.prev = 8;
              _context20.t0 = _context20["catch"](1);
              alert(_context20.t0);
              this.setState({
                infoDisplay: ""
              });
              return _context20.abrupt("return");
            case 13:
              calendarIds = response.result.items.map(function (x) {
                return x.id;
              });
              start = new Date();
              start.setHours(0, 0, 0, 0);
              end = new Date();
              end.setHours(23, 59, 59, 999);
              events = [];
              _context20.prev = 19;
              _iterator = _createForOfIteratorHelper(calendarIds);
              _context20.prev = 21;
              _iterator.s();
            case 23:
              if ((_step = _iterator.n()).done) {
                _context20.next = 31;
                break;
              }
              id = _step.value;
              _context20.next = 27;
              return gapi.client.calendar.events.list({
                calendarId: id,
                timeMin: start.toISOString(),
                timeMax: end.toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
              });
            case 27:
              getResult = _context20.sent;
              if (getResult && getResult.result.items) {
                events.push.apply(events, _toConsumableArray(getResult.result.items.map(function (x) {
                  return x.summary + ", starts from " + (x.start.dateTime || x.start.date);
                })));
              }
            case 29:
              _context20.next = 23;
              break;
            case 31:
              _context20.next = 36;
              break;
            case 33:
              _context20.prev = 33;
              _context20.t1 = _context20["catch"](21);
              _iterator.e(_context20.t1);
            case 36:
              _context20.prev = 36;
              _iterator.f();
              return _context20.finish(36);
            case 39:
              _context20.next = 46;
              break;
            case 41:
              _context20.prev = 41;
              _context20.t2 = _context20["catch"](19);
              alert(_context20.t2);
              this.setState({
                infoDisplay: ""
              });
              return _context20.abrupt("return");
            case 46:
              this.setState({
                infoDisplay: events ? events.join("\n") : "No events today!"
              });
            case 47:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this, [[1, 8], [19, 41], [21, 33, 36, 39]]);
      }));
      function showCalendarEvents() {
        return _showCalendarEvents.apply(this, arguments);
      }
      return showCalendarEvents;
    }()
  }, {
    key: "render",
    value: function render() {
      if (this.state.redirected) {
        return /*#__PURE__*/React.createElement(ReactRouterDOM.Navigate, {
          to: "/my-questions"
        });
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "question"
      }, /*#__PURE__*/React.createElement("div", {
        className: "questionTitle"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          color: "gray",
          fontSize: "10px"
        }
      }, this.state.timestamp), /*#__PURE__*/React.createElement("p", null, this.state.questionContent)), this.state.answers.map(function (answer, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "questionAnswer",
          key: index
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            color: "gray",
            fontSize: "10px"
          }
        }, answer.timestamp + (answer.isHost === "true" ? " by host" : "")), /*#__PURE__*/React.createElement("p", null, answer.content));
      }), /*#__PURE__*/React.createElement("div", {
        className: "questionInput"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "answerContent",
        value: this.state.answerContent,
        onChange: this.handleAnswerChange,
        placeholder: ""
      }), /*#__PURE__*/React.createElement("button", {
        onClick: this.submitAnswer
      }, "Submit")), /*#__PURE__*/React.createElement("div", {
        className: "questionFast"
      }, /*#__PURE__*/React.createElement("p", null, "The questions is related to your personal information? Check from here!"), /*#__PURE__*/React.createElement("select", {
        onChange: this.changeSelect
      }, this.myInfo.map(function (s, index) {
        return /*#__PURE__*/React.createElement("option", {
          key: index,
          value: s
        }, s);
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.queryInfo
      }, "Get"), /*#__PURE__*/React.createElement("p", null, this.state.infoDisplay)));
    }
  }]);
  return Question;
}(React.Component);
var QuestionAndAnswer = /*#__PURE__*/function (_React$Component10) {
  _inherits(QuestionAndAnswer, _React$Component10);
  var _super10 = _createSuper(QuestionAndAnswer);
  function QuestionAndAnswer(props) {
    var _this12;
    _classCallCheck(this, QuestionAndAnswer);
    _this12 = _super10.call(this, props);
    _this12.deleteThis = _this12.deleteThis.bind(_assertThisInitialized(_this12));
    return _this12;
  }
  _createClass(QuestionAndAnswer, [{
    key: "deleteThis",
    value: function () {
      var _deleteThis = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(e) {
        var mutation, input, deleteResult;
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              mutation = "\n      mutation dq($input: DeleteQuestion!) {\n        deleteQuestion(input:$input) {\n          successful, remark\n        }\n      }\n    ";
              input = {
                questionId: this.props.question.questionId,
                name: localStorage.getItem("name"),
                token: localStorage.getItem("token")
              };
              _context21.prev = 2;
              _context21.next = 5;
              return graphQLFetch(mutation, {
                input: input
              });
            case 5:
              deleteResult = _context21.sent;
              if (!deleteResult.deleteQuestion.successful) {
                alert(deleteResult.deleteQuestion.remark);
              }
              _context21.next = 12;
              break;
            case 9:
              _context21.prev = 9;
              _context21.t0 = _context21["catch"](2);
              alert('Error in deletion: ' + _context21.t0);
            case 12:
              if (this.props.refreshHandler) {
                this.props.refreshHandler();
              }
            case 13:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this, [[2, 9]]);
      }));
      function deleteThis(_x12) {
        return _deleteThis.apply(this, arguments);
      }
      return deleteThis;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "qna"
      }, /*#__PURE__*/React.createElement(ReactRouterDOM.Link, {
        to: "/question?id=" + this.props.question.questionId,
        style: {
          textDecoration: 'none'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "qnaTitle"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          color: "gray",
          fontSize: "10px"
        }
      }, this.props.question.timestamp.toISOString() + (this.props.showHost ? " to " + this.props.question.hostname : "")), /*#__PURE__*/React.createElement("p", null, this.props.question.content)), this.props.answers.map(function (answer, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "qnaAnswer",
          key: index
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            color: "gray",
            fontSize: "10px"
          }
        }, answer.timestamp.toString() + answer.isHost ? " by host" : ""), /*#__PURE__*/React.createElement("p", null, answer.content));
      })), this.props.canDelete && /*#__PURE__*/React.createElement("button", {
        className: "qnaDelete",
        onClick: this.deleteThis
      }, "Delete"));
    }
  }]);
  return QuestionAndAnswer;
}(React.Component);
var QuestionsForMe = /*#__PURE__*/function (_React$Component11) {
  _inherits(QuestionsForMe, _React$Component11);
  var _super11 = _createSuper(QuestionsForMe);
  function QuestionsForMe(props) {
    var _this13;
    _classCallCheck(this, QuestionsForMe);
    _this13 = _super11.call(this, props);
    _this13.state = {
      unansweredQuestions: [],
      answeredQuestions: []
    };
    _this13.refresh = _this13.refresh.bind(_assertThisInitialized(_this13));
    return _this13;
  }
  _createClass(QuestionsForMe, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return this.refresh();
            case 2:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function componentDidMount() {
        return _componentDidMount5.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
        var token, name, hostname, getQuestionsQuery, input, getQuestionsResult, questions, getAnswersQuery, qna;
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              token = localStorage.getItem("token");
              name = localStorage.getItem("name");
              if (!(!token || !name)) {
                _context24.next = 5;
                break;
              }
              this.props.history.push('signup-and-login');
              return _context24.abrupt("return");
            case 5:
              hostname = name;
              getQuestionsQuery = "\n      query gq($input: GetQuestions!) {\n        getQuestions(input:$input) {\n          questionId, content, timestamp, hostname, guestname\n        }\n      }\n    ";
              input = {
                hostname: hostname
              };
              _context24.next = 10;
              return graphQLFetch(getQuestionsQuery, {
                input: input
              });
            case 10:
              getQuestionsResult = _context24.sent;
              questions = getQuestionsResult.getQuestions;
              getAnswersQuery = "\n      query ga($input: GetAnswers!) {\n        getAnswers(input: $input) {\n          content, isHost, questionId, timestamp\n        }\n      }\n    ";
              _context24.next = 15;
              return Promise.all(questions.map( /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(question) {
                  var getAnswersResult;
                  return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                    while (1) switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.next = 2;
                        return graphQLFetch(getAnswersQuery, {
                          input: {
                            questionId: question.questionId
                          }
                        });
                      case 2:
                        getAnswersResult = _context23.sent;
                        return _context23.abrupt("return", {
                          question: question,
                          answers: getAnswersResult.getAnswers
                        });
                      case 4:
                      case "end":
                        return _context23.stop();
                    }
                  }, _callee23);
                }));
                return function (_x13) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 15:
              qna = _context24.sent;
              this.setState({
                answeredQuestions: qna.filter(function (x) {
                  return x.answers;
                }),
                unansweredQuestions: qna.filter(function (x) {
                  return !x.answers;
                })
              });
            case 17:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function refresh() {
        return _refresh4.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this14 = this;
      return /*#__PURE__*/React.createElement("div", null, this.state.unansweredQuestions.map(function (x, index) {
        return /*#__PURE__*/React.createElement(QuestionAndAnswer, _extends({
          key: index
        }, x, {
          refreshHandler: _this14.refresh,
          canDelete: true
        }));
      }), this.state.answeredQuestions.map(function (x, index) {
        return /*#__PURE__*/React.createElement(QuestionAndAnswer, _extends({
          key: index
        }, x, {
          refreshHandler: _this14.refresh,
          canDelete: true
        }));
      }));
    }
  }]);
  return QuestionsForMe;
}(React.Component);
var Main = /*#__PURE__*/function (_React$Component12) {
  _inherits(Main, _React$Component12);
  var _super12 = _createSuper(Main);
  function Main() {
    _classCallCheck(this, Main);
    return _super12.apply(this, arguments);
  }
  _createClass(Main, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ReactRouterDOM.Redirect, {
        to: "/index"
      });
    }
  }]);
  return Main;
}(React.Component);
var Navigation = /*#__PURE__*/function (_React$Component13) {
  _inherits(Navigation, _React$Component13);
  var _super13 = _createSuper(Navigation);
  function Navigation() {
    _classCallCheck(this, Navigation);
    return _super13.apply(this, arguments);
  }
  _createClass(Navigation, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(ReactRouterDOM.Link, {
        to: "/index"
      }, "Index")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(ReactRouterDOM.Link, {
        to: "/publish-question"
      }, "My Question Box")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(ReactRouterDOM.Link, {
        to: "/my-questions"
      }, "My Questions")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(ReactRouterDOM.Link, {
        to: "/questions-for-me"
      }, "Questions for Me")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(ReactRouterDOM.Link, {
        to: "/my-info"
      }, "My Info")))));
    }
  }]);
  return Navigation;
}(React.Component);
var App = /*#__PURE__*/function (_React$Component14) {
  _inherits(App, _React$Component14);
  var _super14 = _createSuper(App);
  function App(props) {
    var _this15;
    _classCallCheck(this, App);
    var token = localStorage.getItem("token");
    var name = localStorage.getItem("name");
    _this15 = _super14.call(this, props);
    _defineProperty(_assertThisInitialized(_this15), "handleLogout", function () {
      _this15.setState({
        token: null,
        name: null
      });
    });
    _this15.state = {
      token: token,
      name: name
    };
    _this15.handleLoginSuccess = _this15.handleLoginSuccess.bind(_assertThisInitialized(_this15));
    return _this15;
  }
  _createClass(App, [{
    key: "handleLoginSuccess",
    value: function handleLoginSuccess(_ref8) {
      var token = _ref8.token,
        name = _ref8.name;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      this.setState({
        token: token,
        name: name
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this16 = this;
      var _this$state5 = this.state,
        token = _this$state5.token,
        name = _this$state5.name;
      return /*#__PURE__*/React.createElement(ReactRouterDOM.BrowserRouter, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Navigation, null), /*#__PURE__*/React.createElement(ReactRouterDOM.Switch, null, /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        exact: true,
        path: "/",
        component: Main
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        exact: true,
        path: "/index",
        component: Index
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/publish-question",
        component: GenerateQuestionBox
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/ask-question",
        render: function render(props) {
          return /*#__PURE__*/React.createElement(AskQuestionBox, props);
        }
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/my-questions",
        component: MyQuestion
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/questions-for-me",
        component: QuestionsForMe
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/my-group",
        component: MyGroup
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/signup-and-login",
        render: function render(props) {
          return /*#__PURE__*/React.createElement(SignupAndLogin, _extends({}, props, {
            onLoginSuccess: _this16.handleLoginSuccess
          }));
        }
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/my-info",
        render: function render(props) {
          return /*#__PURE__*/React.createElement(MyInfo, _extends({}, props, {
            token: token,
            name: name,
            onLoginSuccess: _this16.handleLoginSuccess,
            onLogout: _this16.handleLogout
          }));
        }
      }), /*#__PURE__*/React.createElement(ReactRouterDOM.Route, {
        path: "/question",
        component: Question
      }))));
    }
  }]);
  return App;
}(React.Component); // export default ReactRouterDOM.withRouter(SignupAndLogin)
var element = /*#__PURE__*/React.createElement(App, null);
ReactDOM.render(element, document.getElementById("contents"));