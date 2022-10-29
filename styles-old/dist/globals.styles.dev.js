"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkTheme = exports.lightTheme = void 0;
var lightTheme = {
  palette: {
    type: "light",
    primary: {
      main: "#7C1609"
    },
    secondary: {
      main: "#A8A198"
    },
    background: {
      "default": "#eeeee9",
      paper: "#F9F8F1"
    },
    text: {
      primary: "#22211f",
      secondary: "#a8a299",
      disabled: "rgba(36,35,34,0.9)",
      hint: "#2f0000"
    },
    warning: {
      main: "#c39247"
    },
    info: {
      main: "#95b4ce"
    },
    success: {
      main: "#97ad88"
    },
    divider: "#595755"
  },
  typography: {
    fontFamily: "Newsreader"
  }
};
exports.lightTheme = lightTheme;
var darkTheme = {
  palette: {
    type: "dark",
    primary: {
      main: "#57A8B5"
    },
    secondary: {
      main: "#575c65"
    },
    background: {
      "default": "#101118",
      paper: "#06070e"
    },
    text: {
      primary: "#dee4ee",
      secondary: "#575d66",
      disabled: "rgba(121,121,121,0.66)",
      hint: "#2f0000"
    },
    warning: {
      main: "#c39247"
    },
    info: {
      main: "#95b4ce"
    },
    success: {
      main: "#97ad88"
    },
    divider: "#1C2027"
  },
  typography: {
    fontFamily: "Newsreader"
  }
};
exports.darkTheme = darkTheme;