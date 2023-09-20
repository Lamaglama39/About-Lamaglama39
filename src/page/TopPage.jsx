import { TopBar } from "./TopBar";
import { VicugnaArea } from "../components/VicugnaArea";
import { SkillList } from "../components/SkillList";
import { Box } from "@chakra-ui/react";

export const TopPage = () => {
  return (
    <>
      <TopBar></TopBar>
      <Box display={"flex"} flexFlow={["column", "column", "row"]}>
        <VicugnaArea></VicugnaArea>
        <SkillList></SkillList>
      </Box>
    </>
  );
};
