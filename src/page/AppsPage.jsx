import { useEffect, useState } from "react";
import { AppList } from "../components/AppList";
import { CSSTransition } from "react-transition-group";
import { useBreakpointValue } from "@chakra-ui/react";

export const AppsPage = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  const classNames = useBreakpointValue({
    base: "slideY",
    sm: "slideY",
    md: "slideX",
  });

  return (
    <CSSTransition
      in={inProp}
      classNames={classNames}
      timeout={1000}
      unmountOnExit
    >
      <div>
        <AppList></AppList>
      </div>
    </CSSTransition>
  );
};
