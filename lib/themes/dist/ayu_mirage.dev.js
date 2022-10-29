"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _["default"])({
  colorScheme: "dark",
  primaryColor: "orange",
  other: {
    AppShell_backgroundColor: "#1F2430",
    hover: "#2a2f3b"
  },
  colors: {
    dark: ["#ffffff", "#91949A", "#6c707a", "#3F434E", "#313641", "#2A2F3B", "#2e333e", "#232834", "#11141A", "#0D1016"],
    orange: ["#FFFFFF", "#FCF6EA", "#F9EDD4", "#F3DAA8", "#F2D69D", "#F0D192", "#EFCC87", "#EDC77C", "#EABE66", "#E6B450"]
  }
});

exports["default"] = _default;