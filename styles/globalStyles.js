import * as colors from './colors';

export const lightTheme = {
  colorScheme: "light",
  shade: 6,
  primary: colors.primaryL,
  secondary: colors.secondaryL,
  brown: colors.brown,
  background: "#eeeee9",
  surface: "#F9F8F1",
  text: {
    primary: "#22211f",
    secondary: "#36322a",
    disabled: "rgba(36,35,34,0.9)",
    hint: "#2f0000",
  },
  warning: "#c39247",
  white: "#ffffff",
  info: "#95b4ce",
  success: "#97ad88",
  divider: "#595755",
};

export const darkTheme = {
  colorScheme: "dark",
  shade: 6,
  primary: colors.primaryD,
  secondary: colors.secondaryD,
  brown: colors.brown,
  background: "#161618",
  surface: "#212123",
  text: {
    primary: "#dee4ee",
    secondary: "#969ba1",
    disabled: "rgba(121,121,121,0.66)",
    hint: "#2f0000",
  },
  warning: "#c39247",
  white: "#ffffff",
  info: "#95b4ce",
  success: "#97ad88",
  divider: "#1C2027",
};

export const fonts = [
  "Newsreader, serif",
  "Montserrat, sans-serif",
  "Merriweather, sans-serif",
  "Source Sans Pro, sans-serif",
  "Simplifia, sans-serif",
  "Blogger, sans",
  "Roboto, sans-serif",
];
