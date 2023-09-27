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
    <>
      {skillType.map((type) => (
        <Box
          key={type}
          alignItems={"center"}
          flexFlow={["row", "row", "column"]}
          className="SkillList"
          paddingBottom={["3vh"]}
        >
          <TitleText title={type} size={"24px"}></TitleText>
          <div>
            <SkillIcon title={type}></SkillIcon>
          </div>
        </Box>
      ))}
    </>
  );
};
