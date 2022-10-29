"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _["default"])({
  colorScheme: "light",
  primaryColor: "orange",
  other: {
    AppShell_backgroundColor: "#FAFAFA",
    hover: "#FAFAFA"
  },
  colors: {
    orange: ["#FFFFFF", "#FCF6EA", "#F9EDD4", "#F3DAA8", "#F2D69D", "#F0D192", "#EFCC87", "#EDC77C", "#EABE66", "#E6B450"]
  }
});

exports["default"] = _default;