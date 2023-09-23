import { useEffect, useContext } from "react";
import { NavigationContext } from "../components/NavigationContext";
import { CSSTransition } from "react-transition-group";
import { useBreakpointValue } from "@chakra-ui/react";

import { TopBar } from "../components/TopBar";
import { ProfileContents } from "../components/ProfileContents";

export const ProfilePage = () => {
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
    <>
      <TopBar></TopBar>
      <CSSTransition
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
      >
        <div>
          <ProfileContents></ProfileContents>
        </div>
      </CSSTransition>
    </>
  );
};
