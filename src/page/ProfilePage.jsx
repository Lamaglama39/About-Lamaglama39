import { CSSTransition } from "react-transition-group";

import { TopBar } from "../components/TopBar";
import { ProfileContents } from "../components/ProfileContents";
import { usePageSetup } from "../utils/usePageSetup";
import { Box } from "@chakra-ui/react";

export const ProfilePage = () => {
  const { inProp, classNames } = usePageSetup();

  return (
    <>
      <TopBar></TopBar>
      <CSSTransition
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
      >
        <Box
          display={"flex"}
          flexFlow={["column", "column", "row"]}
          className="Pages"
          justifyContent={"space-between"}
        >
          <ProfileContents></ProfileContents>
        </Box>
      </CSSTransition>
    </>
  );
};
