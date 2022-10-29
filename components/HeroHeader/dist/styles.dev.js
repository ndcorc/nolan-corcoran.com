"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@mantine/core");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _core.createStyles)(function (theme) {
  var _title;

  return {
    hero: {
      position: "relative",
      backgroundImage: "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
      backgroundSize: "cover",
      minHeight: "100vh",
      backgroundPosition: "center"
    },
    container: _defineProperty({
      height: 700,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      paddingBottom: theme.spacing.xl * 6,
      zIndex: 1,
      position: "relative"
    }, theme.fn.smallerThan("sm"), {
      height: 500,
      paddingBottom: theme.spacing.xl * 3
    }),
    title: (_title = {
      color: theme.white,
      fontSize: 60,
      fontWeight: 900,
      lineHeight: 1.1
    }, _defineProperty(_title, theme.fn.smallerThan("sm"), {
      fontSize: 40,
      lineHeight: 1.2
    }), _defineProperty(_title, theme.fn.smallerThan("xs"), {
      fontSize: 28,
      lineHeight: 1.3
    }), _title),
    description: _defineProperty({
      color: theme.white,
      maxWidth: 600
    }, theme.fn.smallerThan("sm"), {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm
    }),
    control: _defineProperty({
      marginTop: theme.spacing.xl * 1.5
    }, theme.fn.smallerThan("sm"), {
      width: "100%"
    })
  };
});
var _default = useStyles;
exports["default"] = _default;