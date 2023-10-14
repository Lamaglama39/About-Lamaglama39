import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { InfoContents } from "../components/InfoContents";
import { usePageSetup } from "../utils/usePageSetup";
import { Box } from "@chakra-ui/react";

export const InfoPage = () => {
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
        <Box ref={nodeRef} className="Pages" justifyContent={"space-between"}>
          <InfoContents></InfoContents>
        </Box>
      </CSSTransition>
    </>
  );
};
