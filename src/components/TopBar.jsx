import { Box } from "@chakra-ui/react";
import { TopButtonList } from "./TopButtonList";
import { ModeIcon } from "./ModeIcon";

export const TopBar = ({ onNavigate }) => {
  return (
    <div>
      <Box
        width={"100%"}
        height={"5vh"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"fixed"}
        top="0"
        zIndex="docked"
        className="TopBar"
      >
        <TopButtonList onNavigate={onNavigate}></TopButtonList>
        <ModeIcon light={false}></ModeIcon>
      </Box>
    </div>
  );
};
