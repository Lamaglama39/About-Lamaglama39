import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = { base: "0em", sm: "30em", md: "48em" };
const customColors = {
  lightTop: "#B3D6D6",
  darkTop: "#888888",
  lightPage: "#5E9696",
  darkPage: "#252525",
  lightSkill: "#4F8586",
  darkSkill: "#3E3E3E",
  lightCardBox: "#B3D6D6",
  darkCardBox: "#888888",
  lightCardTop: "#4F8586",
  darkCardTop: "#525252",
};

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  breakpoints: breakpoints,
  styles: {
    global: (props) => ({
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
      ".cardBoxTop": {
        bg: mode(customColors.lightCardTop, customColors.darkCardTop)(props),
      },
    }),
  },
});

export default theme;
