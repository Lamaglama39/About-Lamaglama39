import { TopBar } from "./TopBar";
import { Box } from "@chakra-ui/react";
import { TitleText } from "../components/TitleText";

export const NoMatch = () => {
  return (
    <>
      <TopBar></TopBar>
      <Box
        marginTop={"5vh"}
        bg={"#04BFAD"}
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
      >
        <TitleText title={"No Match URL..."} size={"5vh"}></TitleText>
      </Box>
    </>
  );
};
