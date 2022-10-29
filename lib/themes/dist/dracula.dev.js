"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _["default"])({
  colorScheme: "dark",
  primaryColor: "violet",
  other: {
    AppShell_backgroundColor: "#282A36",
    hover: "#4e5062"
  },
  colors: {
    dark: ["#FFFFFF", "#CED0D4", "#E8E8EB", "#D1D1D6", "#BABAC2", "#A2A3AD", "#4e5062", "#44475A", "#5C5E6F", "#44475A"],
    violet: ["#FFFFFF", "#F7F2FF", "#EFE4FE", "#EBDEFE", "#E7D7FD", "#DEC9FC", "#D6BCFC", "#CEAEFB", "#C6A1FA", "#BD93F9"]
  }
});

exports["default"] = _default;