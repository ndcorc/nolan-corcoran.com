import { createStyles } from '@mantine/core';

const LINK_HEIGHT = 38;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;

export const useStyles = createStyles((theme) => ({
  blogCard: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  blogTitle: {
    //  fontWeight: "600 !important",
    //fontSize: "1.4rem !important",
  },

  card: {
    width: "100%",
    position: "relative",
    backgroundColor: theme.other.surface,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    color: theme.other.text.primary,
    lineBreak: "anywhere",
    fontWeight: "700",
    fontSize: "1.25rem",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  footer: {
    //padding: `0.5rem 1rem !important`,
    marginTop: "0rem",
    /*    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,*/
  },

  bold: {
    fontWeight: "700",
    fontSize: "110%",
  },

  italic: {
    fontStyle: "italic",
  },

  line: {
    textDecoration: "line-through",
  },

  default: {
    marginBlock: "0.5rem",
    fontSize: "1.125rem",
    textAlign: "justify-all !important",
    textJustify: "auto !important",
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "block",
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.dark[4],
    lineHeight: `${LINK_HEIGHT}px`,
    fontSize: theme.fontSizes.sm,
    height: LINK_HEIGHT,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.dark[2]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.dark[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
  },

  links: {
    position: "relative",
  },

  indicator: {
    transition: "transform 150ms ease",
    border: `2px solid ${
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    position: "absolute",
    left: -INDICATOR_SIZE / 2 + 1,
  },
}));
