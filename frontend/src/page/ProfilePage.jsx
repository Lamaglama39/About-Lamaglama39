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
          paddingX={["0", "0", "10vw"]}
          gap={["0", "0", "5vw"]}
          marginX={["2em", "2em", "0"]}
        >
          <InfoContents />
          <SkillBox />
        </Box>
      </CSSTransition>
    </>
  );
};
