import { SiGithub, SiQiita, SiZenn } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import { Icon } from "@chakra-ui/react";

const iconStyle = {
  w: ["2em"],
  h: ["2em"],
};

export const InfoIcon = {
  SiGithub: <Icon as={SiGithub} {...iconStyle} />,
  RiTwitter: <Icon as={RiTwitterXFill} {...iconStyle} />,
  SiQiita: <Icon as={SiQiita} {...iconStyle} />,
  SiZenn: <Icon as={SiZenn} {...iconStyle} />,
};
