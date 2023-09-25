import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
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
          marginTop={["2vh", "2vh", "5vh"]}
          flexFlow={["row", "row", "column"]}
        >
          <TitleText title={type} size={"3vh"}></TitleText>
          <div>
            <SvgIcons title={type}></SvgIcons>
          </div>
        </Box>
      ))}
    </>
  );
};
