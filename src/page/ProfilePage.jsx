import { Box } from "@chakra-ui/react";

import { ProfileText } from "../components/ProfileText";
import { ProfileCard } from "../components/ProfileCard";

export const ProfilePage = () => {
  return (
    <>
      <Box
        display={"flex"}
        flexFlow={"column"}
        alignItems={"center"}
        bg={"green.400"}
        h={"95vh"}
      >
        <ProfileText></ProfileText>
        <ProfileCard></ProfileCard>
      </Box>
    </>
  );
};
