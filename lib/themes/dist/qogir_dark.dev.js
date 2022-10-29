"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _["default"])({
  colorScheme: "dark",
  primaryColor: "blue",
  other: {
    AppShell_backgroundColor: "#32343d",
    hover: "#34363d"
  },
  colors: {
    dark: ["#FFFFFF", "#C9CACC", "#F5F5F5", "#78797E", "#5D5E64", "#42434A", "#34363D", "#262830", "#2A2C34", "#262830"],
    blue: ["#FFFFFF", "#E6F3FB", "#CDE6F6", "#B4D9F2", "#9ACCED", "#8EC6EB", "#81BFE9", "#67B2E4", "#4EA5E0", "#3498DB"]
  }
});

exports["default"] = _default;