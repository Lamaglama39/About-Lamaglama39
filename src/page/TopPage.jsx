import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { VicugnaArea } from "../components/VicugnaArea";
import { SkillList } from "../components/SkillList";
import { Box, useBreakpointValue } from "@chakra-ui/react";

export const TopPage = () => {
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
        <Box display={"flex"} flexFlow={["column", "column", "row"]}>
          <VicugnaArea></VicugnaArea>
          <SkillList></SkillList>
        </Box>
      </div>
    </CSSTransition>
  );
};
