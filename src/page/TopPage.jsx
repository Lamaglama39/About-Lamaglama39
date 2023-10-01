import { CSSTransition } from "react-transition-group";

import { TopBar } from "../components/TopBar";
import { VicugnaArea } from "../components/VicugnaArea";
import { SkillBox } from "../components/SkillBox";
import { Box } from "@chakra-ui/react";
import { usePageSetup } from "../utils/usePageSetup";

export const TopPage = () => {
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
          justifyContent={"space-between"}
          className="Pages"
          w={"100%"}
        >
          <VicugnaArea></VicugnaArea>
          <SkillBox></SkillBox>
        </Box>
      </CSSTransition>
    </>
  );
};
