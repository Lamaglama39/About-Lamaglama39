import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { VicugnaArea } from "../components/VicugnaArea";
import { Box } from "@chakra-ui/react";
import { usePageSetup } from "../utils/usePageSetup";
import { LinkButton } from "../utils/LinkButton";

export const TopPage = () => {
  const { inProp, classNames } = usePageSetup();
  const nodeRef = useRef(null);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
      >
        <Box
          ref={nodeRef}
          display={"flex"}
          flexFlow={["column"]}
          justifyContent={"space-between"}
          className="Pages"
          h={"100vh"}
        >
          <VicugnaArea></VicugnaArea>
          <LinkButton
            text={"Profile"}
            target={"/profile"}
            styleProps={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 80vh)",
            }}
          ></LinkButton>
        </Box>
      </CSSTransition>
    </>
  );
};
