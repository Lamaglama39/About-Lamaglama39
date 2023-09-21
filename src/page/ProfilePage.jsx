import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useBreakpointValue } from "@chakra-ui/react";

import { ProfileContents } from "../components/ProfileContents";

export const ProfilePage = () => {
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
        <ProfileContents></ProfileContents>
      </div>
    </CSSTransition>
  );
};
