"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var useFetch = function useFetch(url, method) {
  var body,
      headers,
      res,
      _args = arguments;
  return regeneratorRuntime.async(function useFetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          headers = {};
          if (body) headers["content-type"] = "application/json";
          _context.next = 5;
          return regeneratorRuntime.awrap(global.fetch(url, {
            body: body ? JSON.stringify(body) : null,
            method: method,
            headers: headers
          }));

        case 5:
          res = _context.sent;
          return _context.abrupt("return", res.json());

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = useFetch;
exports["default"] = _default;