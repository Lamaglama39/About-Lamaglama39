import { Box } from "@chakra-ui/react";
import { TopButtonList } from "./TopButtonList";
import { ModeIcon } from "./ModeIcon";
import PropTypes from "prop-types";

export const TopBar = ({ onNavigate }) => {
  return (
    <div>
      <Box
        width={"100%"}
        height={"3em"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"fixed"}
        zIndex="docked"
        className="TopBar"
      >
        <TopButtonList onNavigate={onNavigate}></TopButtonList>
        <ModeIcon light={false}></ModeIcon>
      </Box>
    </div>
  );
};

TopBar.propTypes = {
  onNavigate: PropTypes.string,
};
