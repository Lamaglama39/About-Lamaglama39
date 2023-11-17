import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = { base: "0em", sm: "30em", md: "48em" };
const customColors = {
  lightButton: "#589A8D",
  darkButton: "#146551",
  lightTop: "#B8CCD9",
  darkTop: "#888888",
  lightPage: "#93AEBF",
  darkPage: "#252525",
  lightSkill: "#7C96A6",
  darkSkill: "#3E3E3E",
  lightCardBox: "#B8CCD9",
  darkCardBox: "#2d3540",
};

const theme = extendTheme({
  fonts: {
    body: `Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`,
    heading: `Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`,
    mono: `Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  breakpoints: breakpoints,
  styles: {
    global: (props) => ({
      ".TopButton": {
        bg: mode(customColors.lightSkill, customColors.darkSkill)(props),
      },
      ".TopBar": {
        bg: mode(customColors.lightTop, customColors.darkTop)(props),
      },
      ".Pages": {
        bg: mode(customColors.lightPage, customColors.darkPage)(props),
      },
      ".SkillList": {
        bg: mode(customColors.lightSkill, customColors.darkSkill)(props),
      },
      ".cardBox": {
        bg: mode(customColors.lightCardBox, customColors.darkCardBox)(props),
      },
      ".selectButton": {
        bg: mode(customColors.lightButton, customColors.darkButton)(props),
      },
    }),
  },
});

export default theme;
