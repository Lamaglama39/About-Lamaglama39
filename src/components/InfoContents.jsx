import { Box } from "@chakra-ui/react";
import { ProfileText } from "../components/ProfileText";
import { ProfileCard } from "../components/ProfileCard";

export const ProfileContents = () => {
  return (
    <Box display={"inline-block"} marginTop={"5vh"} marginX={"5vh"}>
      <Box display={"inline-block"} className="Pages">
        <ProfileText></ProfileText>
        <Box
          display={"flex"}
          flexFlow={["row wrap"]}
          justifyContent={["space-around", "space-around", "left"]}
        >
          <ProfileCard></ProfileCard>
        </Box>
      </Box>
    </Box>
  );
};
