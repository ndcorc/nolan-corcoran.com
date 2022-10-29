"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _["default"])({
  colorScheme: 'dark',
  primaryColor: 'blue',
  other: {
    AppShell_backgroundColor: '#2E3440',
    hover: '#6c727e'
  },
  colors: {
    dark: ['#FFFFFF', '#CED0D4', '#B6B9BF', '#9DA1A9', '#858A94', '#6C727E', '#606673', '#3B4252', '#484E5D', '#3B4252'],
    blue: ['#FFFFFF', '#E0E8F0', '#C0D0E0', '#B9CBDD', '#B1C5D9', '#A1B9D1', '#99B3CD', '#91ADC9', '#89A7C5', '#81A1C1']
  }
});

exports["default"] = _default;