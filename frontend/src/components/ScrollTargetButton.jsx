import { Button } from "@chakra-ui/react";
import { animateScroll as scroll } from "react-scroll";
import PropTypes from "prop-types";

export const ScrollTargetButton = ({ text, target, offsets, styleProps }) => {
  const scrollToTarget = () => {
    const element = document.querySelector(target);
    if (element) {
      const offsetSpaceVh = offsets;
      const offsetSpaceInPx = (window.innerHeight * offsetSpaceVh) / 100; // vhをpxに変換

      // エレメントの位置までスクロール（余分なスペースを考慮してオフセットを減算）
      const offset = element.offsetTop - offsetSpaceInPx;
      scroll.scrollTo(offset, { duration: 1000, smooth: true });
    }
  };

  return (
    <Button
      bg={"none"}
      border={"none"}
      padding={[["1em"]]}
      fontSize={["2em", "2em", "2.5em"]}
      {...styleProps}
      onClick={scrollToTarget}
    >
      {text}
    </Button>
  );
};

ScrollTargetButton.propTypes = {
  text: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  offsets: PropTypes.string.isRequired,
  styleProps: PropTypes.object.isRequired,
};
