import { images } from '@/data';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === "dark";

  const BREAKPOINT = theme.fn.smallerThan("md");
  let bgColor =
    theme.colorScheme === "dark"
      ? theme.other.surface
      : theme.fn.lighten(theme.other.surface, 0.7);

  return {
    paper: {
      boxShadow: `${theme.fn.rgba(
        isDark ? theme.black : theme.other.text.primary,
        0.35,
      )} -4px -3px 16px`,
    },
    wrapper: {
      display: "flex",
      backgroundColor: bgColor,
      borderRadius: theme.radius.lg,
      padding: 0,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg - 2,
      backgroundImage: `url(${
        isDark ? images.contactDark : images.contactLight
      })`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: "2rem 1rem",
      flex: "0 0 280px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      //fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export default useStyles;
