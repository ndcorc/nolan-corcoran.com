"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@mantine/core");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = [{
  title: "Members in the community",
  num: "100000+"
}, {
  title: "Total rewards distributed",
  num: "$15000+"
}, {
  title: "AMAs Completed",
  num: "150+"
}];
var useStyles = (0, _core.createStyles)(function (theme) {
  return {
    root: _defineProperty({
      display: "flex",
      backgroundImage: "linear-gradient(-60deg, ".concat(theme.white, " 0%, ").concat(theme.colors.primary[6], " 100%)"),
      marginBlock: "1.5rem",
      paddingInline: theme.spacing.lg * 1.5,
      paddingBlock: theme.spacing.lg * 2,
      borderRadius: theme.radius.md
    }, theme.fn.smallerThan("sm"), {
      flexDirection: "column",
      gap: "1rem"
    }),
    title: {
      color: theme.other.text.primary,
      fontWeight: 700,
      fontSize: theme.fontSizes.lg
    },
    count: {
      color: theme.other.text.primary,
      fontSize: 32,
      lineHeight: 1,
      fontWeight: 700,
      marginBottom: theme.spacing.lg,
      fontFamily: theme.fontFamily
    },
    stat: {
      flex: 1,
      "& + &": _defineProperty({
        paddingLeft: theme.spacing.xl,
        marginLeft: theme.spacing.xl,
        borderLeft: "1px solid ".concat(theme.colors.primary[3])
      }, theme.fn.smallerThan("sm"), {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: "1px solid ".concat(theme.colors.primary[3])
      })
    }
  };
});
var _default = useStyles;
exports["default"] = _default;