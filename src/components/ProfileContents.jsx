import { Box } from "@chakra-ui/react";
import { ProfileText } from "../components/ProfileText";
import { ProfileCard } from "../components/ProfileCard";

export const ProfileContents = () => {
  return (
    <>
      <Box height={"5vh"}></Box>
      <Box height={"95vh"} marginX={"5vh"} className="Pages">
        <ProfileText></ProfileText>
        <Box
          display={"flex"}
          flexFlow={["row wrap"]}
          justifyContent={["space-around", "space-around", "left"]}
        >
          <ProfileCard></ProfileCard>
        </Box>
      </Box>
    </>
  );
};
