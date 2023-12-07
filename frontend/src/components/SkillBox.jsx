import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { SkillIconList } from "./SkillIconList";

export const SkillBox = () => {
  return (
    <>
      <Box w={"100%"} marginBottom={["5vh"]}>
        <Text
          textAlign={"center"}
          fontSize={["2.5em"]}
          marginTop={["1em", "1em", "2em"]}
          marginBottom={"0"}
          fontWeight={"bold"}
          className={"skill-title"}
        >
          Skills
        </Text>
        <SkillIconList></SkillIconList>
      </Box>
    </>
  );
};
