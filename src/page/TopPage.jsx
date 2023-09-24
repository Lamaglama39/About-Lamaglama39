import { CSSTransition } from "react-transition-group";
import { useEffect, useContext } from "react";
import { NavigationContext } from "../components/NavigationContext";

import { TopBar } from "../components/TopBar";
import { VicugnaArea } from "../components/VicugnaArea";
import { SkillList } from "../components/SkillList";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export const TopPage = () => {
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
    <div>
      <TopBar></TopBar>
      <CSSTransition
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
      >
        <div>
          <Box
            display={"flex"}
            flexFlow={["column", "column", "row"]}
            className="Pages"
          >
            <VicugnaArea></VicugnaArea>
            <SkillList></SkillList>
          </Box>
        </div>
      </CSSTransition>
    </div>
  );
};
