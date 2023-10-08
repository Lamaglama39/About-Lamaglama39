import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { SkillIconList } from "./SkillIconList";

export const SkillBox = () => {
  return (
    <>
      <Box
        width={["100%", "100%", "35%"]}
        textAlign={"center"}
        marginTop={["0", "0", "5vh"]}
        marginBottom={["10vh", "10vh", "0"]}
      >
        <Text
          fontSize={["32px", "40px", "48px"]}
          margin={"0"}
          fontWeight={"bold"}
        >
          Skill Set
        </Text>
        <SkillIconList></SkillIconList>
      </Box>
    </>
  );
};
