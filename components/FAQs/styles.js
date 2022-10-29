import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  social: {
    margin: "1rem",
    "& > *": {
      color: theme.colors.yellow[0],
    },
    "&:hover > *": {
      color: theme.colors.yellow[7],
      cursor: "pointer",
    },
  },
}));

export default useStyles;
