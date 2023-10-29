import { useRef } from "react";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { Box } from "@chakra-ui/react";
import { usePageSetup } from "../utils/usePageSetup";
import { MarqueeMessage } from "../utils/MarqueeMessage";

export const NoMatch = () => {
  const { inProp, classNames } = usePageSetup();
  const nodeRef = useRef(null);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      let randomNumbers = [];
      for (let i = 0; i < 10; i++) {
        randomNumbers.push(Math.floor(Math.random() * 500));
      }
      return randomNumbers;
    };

    setNumbers(generateRandomNumbers());
  }, []);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        classNames={classNames}
        timeout={900}
        unmountOnExit
      >
        <Box className="Pages" ref={nodeRef}>
          {numbers.map((number, index) => (
            <MarqueeMessage
              key={index}
              speed={number}
              message={"Sorry...No Match URL..."}
              size={"3em"}
            ></MarqueeMessage>
          ))}
        </Box>
      </CSSTransition>
    </>
  );
};
