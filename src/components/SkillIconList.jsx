import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { SkillIcon } from "./SkillIcon";

export const SkillIconList = () => {
  const skillType = [
    ["Languages"],
    ["Frontend"],
    ["Backend"],
    ["Infrastructure"],
  ];
  return (
    <Box marginBottom={["5vh", "", ""]}>
      {skillType.map((type) => (
        <Box key={type} paddingBottom={["1vh", "0", "0"]}>
          <TitleText title={type} size={["18px", "24px", "32px"]}></TitleText>
          <div>
            <SkillIcon title={type}></SkillIcon>
          </div>
        </Box>
      ))}
    </Box>
  );
};
