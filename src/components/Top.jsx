import { useState } from "react";
import { Box } from "@chakra-ui/react";
import "../App.css";

import { TopBar } from "./TopBar";
import { VicugnaArea } from "./VicugnaArea";
import { SkillList } from "./SkillList";

export const Top = () => {
  return (
    <>
      <TopBar></TopBar>
      <VicugnaArea></VicugnaArea>
      <SkillList></SkillList>
    </>
  );
};
