import { Box } from "@chakra-ui/react";
import { TopButton } from "./TopButton";
import { ModeIcon } from "./ModeIcon";

export const TopBar = () => {
  const buttonNameList = ["Top", "Apps", "Profile"];
  return (
    <div>
      <Box
        width={"100vw"}
        height={"5vh"}
        bg={"green.600"}
        borderBottom={"0.5vh solid black"}
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <TopButton buttonName={buttonNameList[0]}></TopButton>
        <TopButton buttonName={buttonNameList[1]}></TopButton>
        <TopButton buttonName={buttonNameList[2]}></TopButton>
        <ModeIcon light={true}></ModeIcon>
      </Box>
    </div>
  );
};
