import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { CSSTransition } from "react-transition-group";
import { usePageSetup } from "../utils/usePageSetup";
import { Articles } from "../utils/Articles";

export const ArticlesPage = () => {
  const { inProp, classNames } = usePageSetup();
  const nodeRef = useRef(null);

  return (
    <Box className="Pages">
      <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
        className="Pages"
      >
        <Articles ref={nodeRef}></Articles>
      </CSSTransition>
    </Box>
  );
};
