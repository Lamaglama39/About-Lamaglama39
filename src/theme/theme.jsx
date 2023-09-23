import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = { base: "0em", sm: "30em", md: "48em" };
// const customColors = {
//   light: {
//     fontColor: "black",
//     softGreen: "#7AB8BF",
//     lightGreen: "#3F858C",
//     mediumGreen: "#025159",
//     darkGreen: "#025159",
//   },
//   dark: {
//     fontColor: "white",
//     softGreen: "#025159",
//     lightGreen: "#0F5959",
//     mediumGreen: "#0A3A40",
//     darkGreen: "#042326",
//   },
// };

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  // colors: customColors,
  breakpoints: breakpoints,
  styles: {
    global: (props) => ({
      ".TopBar": {
        bg: mode("#589A8D", "#0A3A40")(props),
      },
      ".Pages": {
        bg: mode("#127369", "#3D5A73")(props),
      },
      ".SkillList": {
        bg: mode("#146551", "#025159")(props),
      },
      ".AppsBox": {
        bg: mode("#7AB8BF", "#025159")(props),
      },
      ".ProfileBox": {
        bg: mode("#7AB8BF", "#025159")(props),
      },
    }),
  },
});

export default theme;
