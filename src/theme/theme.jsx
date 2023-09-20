// theme/theme.js
import { extendTheme } from "@chakra-ui/react";

const breakpoints = { base: "0em", sm: "30em", md: "48em" };
const customColors = {
  fontColor: "#012626",
  softGreen: "#04BFAD",
  lightGreen: "#038C7F",
  mediumGreen: "#027368",
  darkGreen: "#01403A",
};

const theme = extendTheme({
  colors: customColors,
  breakpoints: breakpoints,
});

export default theme;
