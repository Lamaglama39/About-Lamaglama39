import { useEffect, useState } from "react";
import { AppList } from "../components/AppList";
import { CSSTransition } from "react-transition-group";

export const AppsPage = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <CSSTransition in={inProp} classNames="slide" timeout={1000} unmountOnExit>
      <div>
        <AppList></AppList>
      </div>
    </CSSTransition>
  );
};
