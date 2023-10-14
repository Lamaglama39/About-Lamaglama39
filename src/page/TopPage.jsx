import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { VicugnaArea } from "../components/VicugnaArea";
import { SkillBox } from "../components/SkillBox";
import { Box } from "@chakra-ui/react";
import { usePageSetup } from "../utils/usePageSetup";

export const TopPage = () => {
  const { inProp, classNames } = usePageSetup();
  const nodeRef = useRef(null);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
      >
        <Box
          ref={nodeRef}
          display={"flex"}
          flexFlow={["column"]}
          justifyContent={"space-between"}
          className="Pages"
        >
          <VicugnaArea></VicugnaArea>
          <SkillBox></SkillBox>
        </Box>
      </CSSTransition>
    </>
  );
};
