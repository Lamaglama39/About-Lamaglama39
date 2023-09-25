import { Box } from "@chakra-ui/react";
import { ProfileText } from "../components/ProfileText";
import { ProfileCard } from "../components/ProfileCard";

export const ProfileContents = () => {
  return (
    <Box padding={"5%"} className="Pages">
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
  );
};
