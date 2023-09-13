import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { IconList } from "./IconList";

export const SkillList = () => {
  return (
    <div>
      <Box width={"100vw"} height={"40vh"} bg={"green.200"} marginTop={"0"}>
        <TitleText title={"Skill Set"} size={"4vh"}></TitleText>
        <IconList></IconList>
      </Box>
    </div>
  );
};
