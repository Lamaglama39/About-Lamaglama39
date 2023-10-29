import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { AppList } from "../components/AppList";
import { CSSTransition } from "react-transition-group";
import { usePageSetup } from "../utils/usePageSetup";

export const AppsPage = () => {
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
        <AppList ref={nodeRef}></AppList>
      </CSSTransition>
    </Box>
  );
};
