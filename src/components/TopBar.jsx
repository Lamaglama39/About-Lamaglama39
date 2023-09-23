import { Box } from "@chakra-ui/react";
import { TopButtonList } from "./TopButtonList";
import { ModeIcon } from "./ModeIcon";

export const TopBar = ({ onNavigate }) => {
  return (
    <div>
      <Box
        width={"100vw"}
        height={"5vh"}
        bg={"mediumGreen"}
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        position={"fixed"}
        top="0"
        zIndex="docked"
        className="TopBar"
      >
        <TopButtonList onNavigate={onNavigate}></TopButtonList>
        <ModeIcon light={true}></ModeIcon>
      </Box>
    </div>
  );
};
