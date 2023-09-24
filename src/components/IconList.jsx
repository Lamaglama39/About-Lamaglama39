import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { Icons } from "./SkillIcon";
import { SvgIcons } from "./SvgIcons";

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
          // marginTop={["3vh", "3vh", "5vh"]}
          flexFlow={["row", "row", "column"]}
        >
          <TitleText title={type} size={"3vh"}></TitleText>
          <div>
            {/* <Icons title={type}></Icons> */}
            <SvgIcons title={type}></SvgIcons>
          </div>
        </Box>
      ))}
    </>
  );
};
