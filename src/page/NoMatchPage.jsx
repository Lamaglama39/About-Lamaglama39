import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { TopBar } from "../components/TopBar";
import { Box } from "@chakra-ui/react";
import { usePageSetup } from "../utils/usePageSetup";
import { MarqueeMessage } from "../utils/MarqueeMessage";

export const NoMatch = () => {
  const { inProp, classNames } = usePageSetup();
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      let randomNumbers = [];
      for (let i = 0; i < 8; i++) {
        randomNumbers.push(Math.floor(Math.random() * 500));
      }
      return randomNumbers;
    };

    setNumbers(generateRandomNumbers());
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <CSSTransition
        in={inProp}
        classNames={classNames}
        timeout={800}
        unmountOnExit
      >
        <div>
          <Box marginTop={"5vh"} justifyContent={"center"} className="Pages">
            {numbers.map((number, index) => (
              <MarqueeMessage
                key={index}
                speed={number}
                message={"Sorry...No Match URL..."}
                size={"6vh"}
              ></MarqueeMessage>
            ))}
          </Box>
        </div>
      </CSSTransition>
    </>
  );
};
