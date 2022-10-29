"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkTheme = exports.lightTheme = void 0;
var lightTheme = {
  type: "light",
  shade: 5,
  primary: primaryL,
  secondary: secondaryL,
  bg: "#eeeee9",
  surface: "#F9F8F1",
  text: {
    primary: "#22211f",
    secondary: "#a8a299",
    disabled: "rgba(36,35,34,0.9)",
    hint: "#2f0000"
  },
  warning: "#c39247",
  info: "#95b4ce",
  success: "#97ad88",
  divider: "#595755"
};
exports.lightTheme = lightTheme;
var darkTheme = {
  type: "dark",
  shade: 5,
  primary: primaryD,
  secondary: secondaryD,
  bg: "#101118",
  surface: "#06070e",
  text: {
    primary: "#dee4ee",
    secondary: "#575d66",
    disabled: "rgba(121,121,121,0.66)",
    hint: "#2f0000"
  },
  warning: "#c39247",
  info: "#95b4ce",
  success: "#97ad88",
  divider: "#1C2027"
};
exports.darkTheme = darkTheme;