import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Box } from "@chakra-ui/react";

import { usePageSetup } from "../utils/usePageSetup";
import { InfoMailForm } from "../components/InfoMailForm";

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
        <Box
          ref={nodeRef}
          className="Pages"
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent={"space-between"}
          h={"auto"}
        >
          <InfoMailForm />
        </Box>
      </CSSTransition>
    </>
  );
};
