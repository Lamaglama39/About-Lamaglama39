import { Box } from "@chakra-ui/react";
import { ProfileInfoIcon } from "./ProfileInfoIcon";

export const ProfileCardList = ({ IconName, UrlLink }) => {
  return (
    <Box
      bg={"lightGreen"}
      border={"2px solid black"}
      padding={"2%"}
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      w={["80%", "80%", "calc(50% - 7%)"]}
      h={["5vh"]}
      borderRadius={"15px"}
      marginTop={"5vh"}
    >
      <ProfileInfoIcon IconName={IconName} UrlLink={UrlLink}></ProfileInfoIcon>
    </Box>
  );
};
