import { CSSTransition } from "react-transition-group";

import { TopBar } from "../components/TopBar";
import { VicugnaArea } from "../components/VicugnaArea";
import { SkillList } from "../components/SkillList";
import { Box } from "@chakra-ui/react";
import { usePageSetup } from "../utils/usePageSetup";

export const TopPage = () => {
  const { inProp, classNames } = usePageSetup();

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
