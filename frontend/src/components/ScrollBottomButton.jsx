import { Button } from "@chakra-ui/react";
import { animateScroll as scroll } from "react-scroll";
import PropTypes from "prop-types";

export const ScrollBottomButton = ({ text }) => {
  return (
    <Button
      bg={"none"}
      border={"none"}
      fontSize={["40px"]}
      position={"absolute"}
      top={["85%"]}
      left={["50%"]}
      transform={["translate(-50%, -50%)"]}
      onClick={() => scroll.scrollToBottom({ duration: 1000, smooth: true })}
    >
      {text}
    </Button>
  );
};

ScrollBottomButton.propTypes = {
  text: PropTypes.string.isRequired,
};
