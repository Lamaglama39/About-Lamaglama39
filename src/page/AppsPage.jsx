import { Box } from "@chakra-ui/react";
import { useEffect, useContext } from "react";
import { NavigationContext } from "../components/NavigationContext";
import { AppList } from "../components/AppList";
import { CSSTransition } from "react-transition-group";
import { useBreakpointValue } from "@chakra-ui/react";

import { TopBar } from "../components/TopBar";

export const AppsPage = () => {
  const { inProp, setInProp } = useContext(NavigationContext);

  useEffect(() => {
    setInProp(true);
  }, [setInProp]);

  const classNames = useBreakpointValue({
    base: "slideY",
    sm: "slideY",
    md: "slideX",
  });

  return (
    <Box className="Pages">
      <TopBar></TopBar>
      <CSSTransition
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
      >
        <div>
          <AppList></AppList>
        </div>
      </CSSTransition>
    </Box>
  );
};
