import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { SkillIcon } from "./SkillIcon";

export const SkillIconList = () => {
  const skillType = ["Languages", "Frontend", "Backend", "Infrastructure"];

  return (
    <Box textAlign={"center"}>
      {skillType.map((type) => (
        <Box key={type}>
          <TitleText title={type} size={["1.5em", "2em", "2em"]}></TitleText>
          <div>
            <SkillIcon title={type}></SkillIcon>
          </div>
        </Box>
      ))}
    </Box>
  );
};
