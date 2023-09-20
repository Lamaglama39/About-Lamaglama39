import { Box } from "@chakra-ui/react";
import { TopButtonList } from "../components/TopButtonList";
import { ModeIcon } from "../components/ModeIcon";

export const TopBar = () => {
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
      >
        <TopButtonList></TopButtonList>
        <ModeIcon light={true}></ModeIcon>
      </Box>
    </div>
  );
};
