import { Box } from "@chakra-ui/react";
import { TopBar } from "./TopBar";
import { ProfileText } from "../components/ProfileText";
import { ProfileCard } from "../components/ProfileCard";

export const ProfilePage = () => {
  return (
    <>
      <TopBar></TopBar>
      <Box bg={"softGreen"} h={"100vh"} padding={"5%"}>
        <ProfileText></ProfileText>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexFlow={["column", "column", "row wrap"]}
          justifyContent={"space-between"}
        >
          <ProfileCard></ProfileCard>
        </Box>
      </Box>
    </>
  );
};
