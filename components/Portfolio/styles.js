import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const isDark = theme.colorScheme === "dark";

  return {
    title: {
      fontWeight: 700,
    },

    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    wrapper: {
      display: "flex",
      width: "90%",
      justifyContent: "space-between",
    },

    card: {
      width: "280px",
      height: "275px",
      borderRadius: "15px",
      padding: "2rem",
      position: "relative",
      display: "flex",
      alignItems: "flex-between",
      transition: "0.4s ease-out",
      boxShadow: isDark
        ? "0px 7px 10px rgba(30, 30, 30, 0.5)"
        : "0px 7px 10px rgba(0, 0, 0, 0.5)",
      "&:hover:before": {
        opacity: 1,
      },
      [`&:hover .${getRef("info")}`]: {
        opacity: 1,
        transform: "translateY(0px) rotateY(180deg)",
      },
      "&:before": {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        display: "block",
        width: "100vw",
        height: "100%",
        borderRadius: "15px",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: "2",
        transition: "0.5s",
        opacity: "0",
      },
    },

    cardImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      borderRadius: "15px",
    },

    cardDiv: {
      width: "100%",
      height: "100%",
      oObjectFit: "cover",
      objectFit: "cover",
      position: "absolute",
      top: "0",
      left: "0",
      borderRadius: "15px",
      display: "grid",
      placeContent: "center",
      "&:hover": {
        fontSize: "3rem",
      },
    },

    svg: {
      ref: getRef("svg"),
      fontSize: "4rem",
      transition: "all 250ms",
      "&:hover": {
        fontSize: "3rem",
      },
    },
    info: {
      position: "relative",
      zIndex: "3",
      color: "white",
      opacity: "0",
      transform: "translateY(30px)",
      transition: "0.5s",
    },
    infoH1: {
      margin: "0px",
    },
    infoP: {
      letterSpacing: "1px",
      fontSize: "15px",
      marginTop: "8px",
    },
    infoButton: {
      padding: "0.6rem",
      outline: "none",
      border: "none",
      borderRadius: "3px",
      background: "white",
      color: "black",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.4s ease",
      "&:hover": {
        background: "dodgerblue",
        color: "white",
      },
    },
  };
});

export default useStyles;
/* .wrapper {
  display: flex,
  width: 90%,
  justify-content: space-around,
}

.card {
  width: 280px,
  height: 360px,
  border-radius: 15px,
  padding: 1.5rem,
  background: white,
  position: relative,
  display: flex,
  align-items: flex-end,
  transition: 0.4s ease-out,
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5),
}
.card:hover {
  transform: rotateY(180deg),
}
.card:hover:before {
  opacity: 1,
}
.card:hover .info {
  opacity: 1,
  transform: translateY(0px) rotateY(180deg),
}
.card:before {
  content: "",
  position: absolute,
  top: 0,
  left: 0,
  display: block,
  width: 100%,
  height: 100%,
  border-radius: 15px,
  background: rgba(0, 0, 0, 0.6),
  z-index: 2,
  transition: 0.5s,
  opacity: 0,
}
.card img {
  width: 100%,
  height: 100%,
  -o-object-fit: cover,
     object-fit: cover,
  position: absolute,
  top: 0,
  left: 0,
  border-radius: 15px,
}
.card .info {
  position: relative,
  z-index: 3,
  color: white,
  opacity: 0,
  transform: translateY(30px),
  transition: 0.5s,
}
.card .info h1 {
  margin: 0px,
}
.card .info p {
  letter-spacing: 1px,
  font-size: 15px,
  margin-top: 8px,
}
.card .info button {
  padding: 0.6rem,
  outline: none,
  border: none,
  border-radius: 3px,
  background: white,
  color: black,
  font-weight: bold,
  cursor: pointer,
  transition: 0.4s ease,
}
.card .info button:hover {
  background: dodgerblue,
  color: white,
} */
