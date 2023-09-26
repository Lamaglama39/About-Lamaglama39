import { Box } from "@chakra-ui/react";
import { AppList } from "../components/AppList";
import { CSSTransition } from "react-transition-group";
import { usePageSetup } from "../utils/usePageSetup";

import { TopBar } from "../components/TopBar";

export const AppsPage = () => {
  const { inProp, classNames } = usePageSetup();

  return (
    <Box className="Pages">
      <TopBar></TopBar>
      <CSSTransition
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
        className="Pages"
      >
        <div>
          <AppList></AppList>
        </div>
      </CSSTransition>
    </Box>
  );
};
