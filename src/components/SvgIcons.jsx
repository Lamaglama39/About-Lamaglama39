import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { SvgIconSet } from "../utils/SvgIconSet";

export const SvgIcons = ({ title }) => {
  const selectedIcons = SvgIconSet[title];

  return (
    <Box>
      {selectedIcons.map((icon, index) => (
        <Box
          key={index}
          display="inline-block"
          mr={index === selectedIcons.length - 1 ? "0" : "5"}
        >
          {icon}
        </Box>
      ))}
    </Box>
  );
};

SvgIcons.propTypes = {
  title: PropTypes.string.isRequired,
};
