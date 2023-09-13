import { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";

import { TopBar } from "./components/TopBar";
import { VicugnaArea } from "./components/VicugnaArea";
import { SkillList } from "./components/SkillList";

function App() {
  return (
    <>
      <TopBar></TopBar>
      <VicugnaArea></VicugnaArea>
      <SkillList></SkillList>
    </>
  );
}

export default App;
