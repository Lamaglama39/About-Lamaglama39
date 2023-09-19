import { Box } from "@chakra-ui/react";
import { ProfileInfoIcon } from "./ProfileInfoIcon";

export const ProfileCardList = ({ IconName, UrlLink }) => {
  return (
    <Box
      bg={"green.200"}
      border={"2px solid black"}
      p={4}
      color="white"
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      w="80%"
      borderRadius={"15px"}
      marginTop={"5vh"}
    >
      <ProfileInfoIcon IconName={IconName} UrlLink={UrlLink}></ProfileInfoIcon>
    </Box>
  );
};
