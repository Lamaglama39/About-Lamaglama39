import { SiGithub, SiGmail, SiQiita, SiZenn } from "react-icons/si";
import { Icon } from "@chakra-ui/react";

const iconStyle = {
  w: ["2vh", "3vh", "4vh"],
  h: ["2vh", "3vh", "4vh"],
  color: "black",
};

export const ProfileIcon = {
  SiGithub: <Icon as={SiGithub} {...iconStyle} />,
  SiGmail: <Icon as={SiGmail} {...iconStyle} />,
  SiQiita: <Icon as={SiQiita} {...iconStyle} />,
  SiZenn: <Icon as={SiZenn} {...iconStyle} />,
};