import { createStyles } from '@mantine/core';

const data = [
  { title: "Members in the community", num: "100000+" },
  { title: "Total rewards distributed", num: "$15000+" },
  { title: "AMAs Completed", num: "150+" },
];

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${theme.white} 0%, ${theme.colors.primary[6]} 100%)`,
    marginBlock: "1.5rem",
    paddingInline: theme.spacing.lg * 1.5,
    paddingBlock: theme.spacing.lg * 2,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      gap: "1rem",
    },
  },

  title: {
    color: theme.other.text.primary,
    fontWeight: 700,
    fontSize: theme.fontSizes.lg,
  },

  count: {
    color: theme.other.text.primary,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.lg,
    fontFamily: theme.fontFamily,
  },

  profiles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginTop: "2rem",
  },

  profileItem: {
    width: "190px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    margin: "2rem",
    [theme.fn.smallerThan(450)]: {
      marginTop: "-10px",
    },
    [theme.fn.largerThan(2000)]: {
      width: "370px",
      margin: "2rem 4rem",
    },
  },

  itemImg: {
    width: "100%",
    height: "170px",
    borderRadius: "15px",
    objectFit: "cover",
    [theme.fn.largerThan(2000)]: {
      height: "320px",
    },
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1px solid ${theme.colors.primary[3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors.primary[3]}`,
      },
    },
  },
}));

export default useStyles;
