import Marquee from "react-fast-marquee";
import { TitleText } from "../components/TitleText";

export const MarqueeMessage = ({ speed, message, size }) => {
  return (
    <Marquee gradient={false} speed={speed}>
      <TitleText title={message} size={size}></TitleText>
    </Marquee>
  );
};
