import { CSSTransition } from "react-transition-group";

import { TopBar } from "../components/TopBar";
import { ProfileContents } from "../components/ProfileContents";
import { usePageSetup } from "../utils/usePageSetup";

export const ProfilePage = () => {
  const { inProp, classNames } = usePageSetup();

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
