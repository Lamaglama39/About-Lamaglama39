import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = { base: "0em", sm: "30em", md: "48em" };
const customColors = {
  lightButton: "#589A8D",
  darkButton: "#146551",
  lightTop: "#3CA6A6",
  darkTop: "#024959",
  lightPage: "#c8e6e6",
  darkPage: "#0a190a",
  lightSkill: "#026773",
  darkSkill: "#012E40",
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
