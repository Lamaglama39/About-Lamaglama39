import { CSSTransition } from "react-transition-group";

import { TopBar } from "../components/TopBar";
import { Box } from "@chakra-ui/react";
import { TitleText } from "../components/TitleText";
import { usePageSetup } from "../utils/usePageSetup";

export const NoMatch = () => {
  const { inProp, classNames } = usePageSetup();

  return (
    <>
      <TopBar></TopBar>
      <CSSTransition
        in={inProp}
        classNames={classNames}
        timeout={800}
        unmountOnExit
      >
        <div>
          <Box
            marginTop={"5vh"}
            bg={"#04BFAD"}
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
          >
            <TitleText title={"No Match URL..."} size={"5vh"}></TitleText>
          </Box>
        </div>
      </CSSTransition>
    </>
  );
};
