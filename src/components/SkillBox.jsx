import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { SkillIconList } from "./SkillIconList";

export const SkillBox = () => {
  return (
    <>
      <Box
        width={["100%", "100%", "30%"]}
        h={["", "", "95vh"]}
        className="SkillList"
        marginTop={["0", "0", "5vh"]}
        textAlign={"center"}
      >
        <TitleText
          title={"Skill Set"}
          size={["24px", "32px", "40px"]}
        ></TitleText>
        <SkillIconList></SkillIconList>
      </Box>
    </>
  );
};
