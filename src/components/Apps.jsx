import { useState } from "react";
import { Box } from "@chakra-ui/react";
import "../App.css";

import { TopBar } from "./TopBar";
import { AppList } from "./AppList";

export const Apps = () => {
  return (
    <>
      <TopBar></TopBar>
      <AppList></AppList>
    </>
  );
};
