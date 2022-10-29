"use strict";

var useStyles = createStyles(function (theme) {
  return {
    social: {
      margin: "1rem",
      "& > *": {
        color: theme.colors.yellow[0]
      },
      "&:hover > *": {
        color: theme.colors.yellow[7],
        cursor: "pointer"
      }
    }
  };
});