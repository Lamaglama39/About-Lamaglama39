import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { IconList } from "./IconList";

export const SkillList = () => {
  return (
    <div>
      <Box
        width={["100vw", "100vw", "30vw"]}
        height={["50vh", "50vh", "100vh"]}
        className="SkillList"
        marginTop={["0", "0", "5vh"]}
      >
        <TitleText title={"Skill Set"} size={["4vh", "4vh", "6vh"]}></TitleText>
        <IconList></IconList>
      </Box>
    </div>
  );
};
