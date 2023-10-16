import Marquee from "react-fast-marquee";
import { TitleText } from "../components/TitleText";
import PropTypes from "prop-types";

export const MarqueeMessage = ({ speed, message, size }) => {
  return (
    <Marquee gradient={false} speed={speed}>
      <TitleText title={message} size={size}></TitleText>
    </Marquee>
  );
};

MarqueeMessage.propTypes = {
  speed: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
