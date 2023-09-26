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
          alignItems={"center"}
          flexFlow={["column", "row wrap", "row wrap"]}
          justifyContent={"space-between"}
        >
          <ProfileCard></ProfileCard>
        </Box>
      </Box>
    </>
  );
};
