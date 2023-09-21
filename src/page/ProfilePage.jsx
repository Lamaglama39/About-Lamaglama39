import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { ProfileContents } from "../components/ProfileContents";

export const ProfilePage = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <CSSTransition in={inProp} classNames="slide" timeout={1000} unmountOnExit>
      <div>
        <ProfileContents></ProfileContents>
      </div>
    </CSSTransition>
  );
};
