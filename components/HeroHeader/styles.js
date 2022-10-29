import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const isDark = theme.colorScheme === "dark";
  const colors = theme.colors;

  return {
    "& #home": {
      position: "relative",
      //backgroundImage: isDark ? "url(/bgDark.png)" : "url(/bgIMG.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      fontFamily: `${theme.other.fonts[4]} !important`,
    },
    overlay: {
      height: "100%",
      backgroundImage: `${theme.fn.rgba(0, 0, 0, 0.85)} !important`,
    },

    flex: { display: "flex" },

    bgImg: {
      //boxShadow: "0 -40rem 2rem -2rem blue inset !important",
    },

    header: {
      flex: 1,
      display: "flex",
      width: "100%",
      minHeight: "100vh",
      flexDirection: "row",
      padding: "5rem 4rem 5rem",
      fontFamily: `${theme.other.fonts[4]} !important`,
      [theme.fn.largerThan(2000)]: {
        paddingTop: "8rem",
      },
      [theme.fn.smallerThan(1023)]: {
        flexDirection: "column",
        marginTop: "-2rem",
      },
      [theme.fn.smallerThan(450)]: {
        padding: "6rem 1rem 2rem",
      },
    },

    wrapper: {
      ref: getRef("wrapper"),
    },

    copyright: {
      ref: getRef("copyright"),
    },

    badgeTagResume: {
      ref: getRef("badgeTagResume"),
      padding: "1rem 2rem",
      backgroundColor: colors.white,
      borderRadius: "15px",
      flexDirection: "row",
      width: "auto",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      [theme.fn.smallerThan(1023)]: { padding: "1rem 1rem" },
    },

    cmpResume: {
      ref: getRef("cmpResume"),
      flexDirection: "column",
      marginTop: "3rem",
    },

    tagResume: {
      ref: getRef("tagResume"),
      "&:hover": {
        backgroundColor: theme.other.secondary,
      },
    },

    badgeCmp: {
      ref: getRef("badgeCmp"),
      padding: "1rem 2rem",
      backgroundColor: theme.white,
      borderRadius: "15px",
      flexDirection: "row",
      width: "auto",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      [theme.fn.smallerThan(1023)]: { padding: "1rem 1rem" },
    },

    tagCmp: {
      ref: getRef("tagCmp"),
      flexDirection: "column",
      marginTop: "3rem",
      [`& + .${getRef("p")}`]: {
        width: "100%",
        textTransform: "uppercase",
        textAlign: "right",
      },
    },

    p: {
      ref: getRef("p"),
    },

    span: {
      ref: getRef("span"),
      fontSize: "2.5rem",
      [theme.fn.largerThan(2000)]: { fontSize: "5rem" },
    },
    badgeP: {
      ref: getRef("badgeP"),
      width: "100%",
      textTransform: "uppercase",
      textAlign: "right",
    },
    headerCards: {
      height: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      marginTop: "0rem",
      [theme.fn.smallerThan("sm")]: {
        height: "500px",
        paddingBottom: theme.spacing.xl * 3,
      },
    },

    headerInfo: {
      flex: "0.5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      margin: "5rem 2rem",
      [theme.fn.smallerThan(1023)]: {
        width: "100%",
        marginRight: "0rem",
      },
    },

    headerBadge: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      flexDirection: "column",
      [theme.fn.smallerThan(1023)]: {
        width: "90%",
        height: "80%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
    },

    headerImg: {
      flex: 1,
      display: "flex",
      maxHeight: "80%",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      margin: "2rem 2rem",
      position: "relative",
      //backgroundImage: theme.fn.linearGradient(24, "#000", "#fff"),
      [theme.fn.smallerThan(1023)]: {
        justifyContent: "center",
        margin: "2rem 2rem",
        paddingLeft: "1rem",
      },
    },

    imgElement: {
      ref: getRef("imgElement"),
      //backgroundImage: theme.fn.linearGradient(24, '#000', '#fff'),
      marginTop: "-2rem",
      [theme.fn.smallerThan(1023)]: {
        marginTop: "-6rem",
      },
      zIndex: 1,
    },

    overlayCircle: {
      ref: getRef("overlayCircle"),
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      zIndex: 0,
      width: "100%",
      height: "90%",
      [theme.fn.smallerThan(1023)]: {
        bottom: "20px",
        width: "100%",
        height: "95%",
      },
    },

    control: {
      marginTop: theme.spacing.xl * 1.5,
      [theme.fn.smallerThan("sm")]: {
        width: "100%",
      },
    },
  };
});

export default useStyles;
