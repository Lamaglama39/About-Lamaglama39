import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Box } from "@chakra-ui/react";

import { InfoContents } from "../components/InfoContents";
import { SkillBox } from "../components/SkillBox";
import { usePageSetup } from "../utils/usePageSetup";

export const ProfilePage = () => {
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
          className="Pages"
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent={["center"]}
          alignItems="flex-start"
          marginX={["2em"]}
          gap={["0", "0", "5vw"]}
        >
          <InfoContents />
          <SkillBox />
        </Box>
      </CSSTransition>
    </>
  );
};
