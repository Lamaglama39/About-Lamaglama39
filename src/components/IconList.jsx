import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { Icons } from "./SkillIcon";

export const IconList = () => {
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
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          marginBottom={"3vh"}
        >
          <TitleText title={type} size={"3vh"}></TitleText>
          <div>
            <Icons title={type}></Icons>
          </div>
        </Box>
      ))}
    </>
  );
};
