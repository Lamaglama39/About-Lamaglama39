import { Link } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { SiGithub, SiGmail, SiQiita, SiZenn } from "react-icons/si";
import PropTypes from "prop-types";

export const InfoIcon = ({ IconName, UrlLink }) => {
  const iconMapping = {
    SiGithub: <SiGithub />,
    SiGmail: <SiGmail />,
    SiQiita: <SiQiita />,
    SiZenn: <SiZenn />,
  };

  const IconComponent = iconMapping[IconName];

  return (
    <Link href={UrlLink} isExternal>
      <IconContext.Provider value={{ color: "black", size: "4vh" }}>
        {IconComponent}
      </IconContext.Provider>
    </Link>
  );
};

InfoIcon.propTypes = {
  IconName: PropTypes.string.isRequired,
  UrlLink: PropTypes.string.isRequired,
};
