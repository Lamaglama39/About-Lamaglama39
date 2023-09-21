import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { Box } from "@chakra-ui/react";
import { TitleText } from "../components/TitleText";

export const NoMatch = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <CSSTransition in={inProp} classNames="slide" timeout={800} unmountOnExit>
      <div>
        <Box
          marginTop={"5vh"}
          bg={"#04BFAD"}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
        >
          <TitleText title={"No Match URL..."} size={"5vh"}></TitleText>
        </Box>
      </div>
    </CSSTransition>
  );
};
