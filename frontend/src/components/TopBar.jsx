import { Box } from "@chakra-ui/react";
import { TopButtonList } from "./TopButtonList";
import { TopDrawer } from "./TopDrawer";

import { ModeIcon } from "./ModeIcon";
import PropTypes from "prop-types";

export const TopBar = ({ onNavigate }) => {
  return (
    <Box
      width={"100%"}
      height={"3em"}
      display={"flex"}
      justifyContent={"start"}
      position={"fixed"}
      zIndex="docked"
      className="TopBar"
    >
      <TopButtonList
        onNavigate={onNavigate}
        display={["none", "none", "flex"]}
      ></TopButtonList>
      <TopDrawer display={["flex", "flex", "none"]}></TopDrawer>

      <ModeIcon light={false}></ModeIcon>
    </Box>
  );
};

TopBar.propTypes = {
  onNavigate: PropTypes.string,
};
