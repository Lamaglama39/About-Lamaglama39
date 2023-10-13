import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { SkillIconList } from "./SkillIconList";
import { ScrollTargetButton } from "./ScrollTargetButton";

export const SkillBox = () => {
  return (
    <>
      <Box width={["100%"]} textAlign={"center"} marginBottom={["5vh"]}>
        <Text
          fontSize={["2em", "2.5em", "3em"]}
          margin={"0"}
          fontWeight={"bold"}
          className={"skill-title"}
        >
          Skill Set
        </Text>
        <SkillIconList></SkillIconList>
        <ScrollTargetButton
          text={"🦙Play With Lama?🦙"}
          target={".top-title"}
          offsets={"20"}
          styleProps={{
            marginTop: "5vh",
          }}
        />
      </Box>
    </>
  );
};
