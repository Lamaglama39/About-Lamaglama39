import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "@chakra-ui/react";
import { InfoIcon } from "../utils/InfoIcon";

export const InfoCardList = ({ IconName, UrlLink }) => {
  const IconComponent = InfoIcon[IconName];

  return (
    <Link
      href={UrlLink}
      isExternal
      _hover={{
        textDecoration: "none",
        filter: "brightness(1.5)",
        transition: "0.3s",
      }}
    >
      <Box
        margin={"0.5em"}
        padding={"0.5em"}
        fontSize={["1em", "1.5em", "1.5em"]}
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
