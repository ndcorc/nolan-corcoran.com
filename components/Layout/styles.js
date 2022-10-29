import { createStyles } from '@mantine/core';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme, _params, getRef) => {
  const isDark = theme.colorScheme === "dark";
  const { colors, other } = theme;
  return {
    navRoot: {
      position: "relative",
      zIndex: 1,
    },

    navHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
    },

    header: {
      borderBottom: 0,
      padding: "auto 80px",
      maxWidth: "100vw !important",
    },

    unscrolled: {
      backdropFilter: "blur(8px)",
      backgroundColor: "transparent",
    },

    scrolled: {
      backgroundColor: theme.fn.rgba(theme.other.background, 0.9),
      backdropFilter: "blur(40px)",
      color: theme.other.text.primary,
    },
    blog: {
      backgroundColor: theme.fn.rgba(theme.colors.dark[6], 0.5),
      color: theme.other.white,
      backdropFilter: "blur(8px)",
    },
    hInner: {
      height: HEADER_HEIGHT,
      display: "flex",
      alignItems: "center",
      minWidth: "100%",
      justifyContent: "space-between",
    },
    hLinks: {
      height: HEADER_HEIGHT,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },

    dropdown: {
      position: "absolute",
      top: HEADER_HEIGHT,
      left: 0,
      right: 0,
      zIndex: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopWidth: 0,
      overflow: "hidden",
      height: "100vh",
      backgroundColor: theme.other.background,

      [theme.fn.largerThan("md")]: {
        display: "none",
      },
    },
    logo: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },
    siteTitle: {
      width: "125px",
      height: "40px",
      [theme.fn.largerThan(2000)]: {
        width: "250px",
        height: "80px",
      },
    },
    link: {
      textTransform: "uppercase",
      fontSize: "1.75rem !important",
      fontFamily: `${theme.other.fonts[4]}`,
      padding: `0px ${theme.spacing.sm}px`,
      fontWeight: 500,
      transition: "border-color 100ms ease, opacity 100ms ease",
      "&:hover": {
        opacity: 1,
        textDecoration: "none",
        backgroundColor: `${theme.other.background} !important`,
      },
      color: `${
        isDark ? theme.colors.gray[4] : theme.other.primary
      } !important`,
    },
    linklabel: {
      fontSize: "2rem !important",
    },
    drawer: {
      display: "block",
      lineHeight: 1,
      padding: "8px 12px",
      borderRadius: theme.radius.sm,
      textDecoration: "uppercase",

      /*  theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7], */
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
      //color: `${theme.white} !important`,

      "&:hover": {
        backgroundColor: `${theme.colors.primary[4]} !important`,
        color: `${theme.white} !important`,
      },
      "&:active": {
        backgroundColor: `${theme.colors.primary[6]} !important`,
        color: `${theme.white} !important`,
      },

      [theme.fn.smallerThan("md")]: {
        borderRadius: 0,
        padding: theme.spacing.md,
      },
    },
    themeToggle: {
      width: "130px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
    },
    linkActive: {
      color: theme.white,
      opacity: 1,
      borderBottomColor:
        theme.colorScheme === "dark"
          ? theme.white
          : theme.colors[theme.primaryColor][5],
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1,
      ),
    },
    burger: {
      [theme.fn.largerThan("md")]: {
        display: "none",
      },
      padding: `${theme.spacing.md}px`,
    },
    footer: {
      borderTop: `1px solid ${isDark ? colors.dark[9] : colors.gray[4]}`,
    },
    fInner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${theme.spacing.md}px`,
      color: theme.other.text.primary,

      [theme.fn.smallerThan("md")]: {
        flexDirection: "column",
      },
    },

    fLinks: {
      textTransform: "uppercase",
      color: theme.other.text.primary,
      [theme.fn.smallerThan("md")]: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        display: "none",
      },
    },
    /*
    navbarLinks: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      listStyle: "none",
      [theme.fn.smallerThan(900)]: {
        display: "none",
      },
    },

    navbarLink: {
      margin: "0px 1.25rem",
      paddingBottom: "20px",
      cursor: "pointer",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      display: "flex",
      [`&:hover .${getRef("button")}`]: {
        transition: "all 0.3s easeIn-out",
        opacity: 1,
        color: isDark ? cyan[7] : primary[6],
      },
    },

    hoverDiv: {
      ref: getRef("button"),
      display: "flex",
      textAlign: "center",
      margin: "0px auto",
      fontSize: "32px",
      lineHeight: "1.5rem",
      color: primary[6],
      opacity: 0,
    },

    navbarLinkA: {
      color: isDark ? primary[1] : brown[1],
      textDecoration: "none",
      flexDirection: "column",
      textTransform: "uppercase",
      fontWeight: 600,
      fontSize: theme.fontSizes.sm,
      transition: "all 0.3 s easeIn-out",
      "&:hover": {
        color: isDark ? cyan[7] : primary[6],
        fontWeight: 600,
        transition: "width 0.4 s",
        transitionTimingFunction: "cubic-bezier(1, -0.65, 0, 2.31)",
      },
    },

    navbarP: {
      fontSize: "0.8rem",
      textAlign: "left",
      color: other.background,
      lineHeight: 1,
      [theme.fn.largerThan(2000)]: {
        fontSize: "1.75rem",
      },
    },

    navbarFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },



    hLinks: {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },

    hLink: {
      display: "flex",
      justifyContent: "space-between",
      height: "100%",
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      color: isDark ? dark[2] : brown[1],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      "&:hover": {
        color: isDark ? dark[2] : primary[6],
        backgroundColor: isDark ? dark[2] : gray[0],
        transition: "all 0.3s easeIn-out",
        "&:div": {
          background: primary[4],
          fontWeight: 600,
        },
      },

      [theme.fn.smallerThan("sm")]: {
        borderRadius: 0,
        padding: theme.spacing.md,
      },
    },

    hLinkActive: {
      "&, &:hover": {
        transition: "all 0.3s easeIn-out",
        "& div": {
          background: primary[4],
          fontWeight: 600,
        },
      },
    }, */
  };
});

export default useStyles;
