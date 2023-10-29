import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "@chakra-ui/react";
import { InfoIcon } from "../utils/InfoIcon";

export const InfoCardList = ({ IconName, UrlLink }) => {
  const IconComponent = InfoIcon[IconName];

  return (
    <Link href={UrlLink} isExternal>
      <Box
        padding={"1em"}
        display={"flex"}
        textAlign={"center"}
        borderRadius={"0.5em"}
        className="cardBox"
      >
        {IconComponent}
      </Box>
    </Link>
  );
};

InfoCardList.propTypes = {
  IconName: PropTypes.string.isRequired,
  UrlLink: PropTypes.string.isRequired,
};
