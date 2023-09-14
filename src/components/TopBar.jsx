import { Box } from "@chakra-ui/react";
import { TopButton } from "./TopButton";
import { ModeIcon } from "./ModeIcon";

export const TopBar = () => {
  const buttonNameList = [
    ["Top", "/"],
    ["Apps", "/apps"],
    ["Profile", "/profile"],
  ];
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
        <TopButton
          buttonName={buttonNameList[0][0]}
          routeName={buttonNameList[0][1]}
        ></TopButton>
        <TopButton
          buttonName={buttonNameList[1][0]}
          routeName={buttonNameList[1][1]}
        ></TopButton>
        <TopButton
          buttonName={buttonNameList[2][0]}
          routeName={buttonNameList[2][1]}
        ></TopButton>
        <ModeIcon light={true}></ModeIcon>
      </Box>
    </div>
  );
};
