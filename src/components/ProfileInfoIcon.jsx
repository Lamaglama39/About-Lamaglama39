import { IconContext } from "react-icons";
import { Text } from "@chakra-ui/react";
import { SiGithub, SiGmail, SiQiita, SiZenn } from "react-icons/si";

export const ProfileInfoIcon = ({ IconName, UrlLink }) => {
  const iconMapping = {
    SiGithub: <SiGithub />,
    SiGmail: <SiGmail />,
    SiQiita: <SiQiita />,
    SiZenn: <SiZenn />,
  };

  const IconComponent = iconMapping[IconName];

  return (
    <>
      <IconContext.Provider value={{ color: "black", size: "4vh" }}>
        {IconComponent}
      </IconContext.Provider>
      <Text>{UrlLink}</Text>
    </>
  );
};
