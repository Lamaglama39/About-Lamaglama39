import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

export const TitleText = ({ title, size }) => {
  return (
    <Text fontWeight={"bold"} fontSize={size} margin={"0"}>
      {title}
    </Text>
  );
};

TitleText.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};
