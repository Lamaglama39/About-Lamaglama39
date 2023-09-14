import { useState } from "react";
import { Box } from "@chakra-ui/react";
import "../App.css";

import { TopBar } from "./TopBar";

function Profile() {
  return (
    <>
      <TopBar></TopBar>
      <h1>Profile!!!</h1>
    </>
  );
}

export default Profile;
